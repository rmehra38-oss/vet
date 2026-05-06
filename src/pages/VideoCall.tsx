/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Maximize2, Users, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';
import AgoraRTC, { 
  AgoraRTCProvider, 
  useJoin, 
  useLocalCameraTrack, 
  useLocalMicrophoneTrack, 
  usePublish, 
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack
} from "agora-rtc-react";

// Initialize Agora Client
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function VideoCallWrapper() {
  const appId = (import.meta as any).env.VITE_AGORA_APP_ID;

  if (!appId || appId === "YOUR_AGORA_APP_ID") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="glass-card p-10 text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold">Agora App ID Missing</h2>
          <p className="text-slate-500">
            Please configure <code className="bg-slate-100 px-2 py-1 rounded">VITE_AGORA_APP_ID</code> in your environment to enable video consultations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AgoraRTCProvider client={client}>
      <VideoCall />
    </AgoraRTCProvider>
  );
}

function VideoCall() {
  const { appointmentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState<any>(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callingState, setCallingState] = useState<'joining' | 'active' | 'ended'>('joining');

  // Agora Hooks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(videoOn);
  
  useJoin({
    appid: (import.meta as any).env.VITE_AGORA_APP_ID,
    channel: appointmentId || "test",
    token: null, 
  }, callingState === 'joining');

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    if (!appointmentId) return;
    
    const unsubscribe = onSnapshot(doc(db, 'appointments', appointmentId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setAppointment(data);
        if (data.callStatus === 'ended') {
          setCallingState('ended');
          setTimeout(() => navigate('/dashboard'), 3000);
        }
      }
    });

    return unsubscribe;
  }, [appointmentId, navigate]);

  const handleEndCall = async () => {
    if (!appointmentId) return;
    setCallingState('ended');
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        callStatus: 'ended',
        status: 'completed'
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to end call:", error);
    }
  };

  if (callingState === 'joining') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-teal" />
          <h2 className="text-xl font-bold">Establishing Secure Connection...</h2>
          <p className="text-slate-400">Connecting to encrypted peer-to-peer relay</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col pt-16">
      {/* Main Video Grid */}
      <div className="flex-grow relative overflow-hidden p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Remote User */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative border border-white/5">
             {remoteUsers.length > 0 ? (
               <RemoteUser user={remoteUsers[0]} />
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4">
                 <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
                    <Users size={40} />
                 </div>
                 <p className="text-sm font-bold uppercase tracking-widest">Waiting for Participant...</p>
               </div>
             )}
             <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest">
               {appointment?.ownerId === user?.uid ? 'Veterinarian' : 'Animal Owner'}
             </div>
          </div>

          {/* Local User */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative border border-white/5 h-64 md:h-full">
            <div className="w-full h-full">
               <LocalVideoTrack track={localCameraTrack} play={true} />
            </div>
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest">
              You (Preview)
            </div>
          </div>
        </div>

        {/* Floating Info */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green-accent rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Live: Encrypted</span>
           </div>
           <div className="h-4 w-px bg-white/10" />
           <div className="text-xs font-bold text-white uppercase tracking-widest">
              {appointment?.animalName || 'Patient Call'}
           </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-28 bg-slate-950 border-t border-white/5 px-4 flex items-center justify-center gap-4">
        <button 
          onClick={() => setMicOn(!micOn)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${micOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button 
          onClick={() => setVideoOn(!videoOn)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${videoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
        >
          {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button 
          onClick={handleEndCall}
          className="w-20 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
        >
          <PhoneOff size={24} />
        </button>

        <button className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
          <Maximize2 size={24} />
        </button>
      </div>

      <AnimatePresence>
        {callingState === 'ended' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center text-center p-8"
          >
            <div className="space-y-6">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto">
                <PhoneOff size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white">Call Ended</h2>
              <p className="text-slate-400">Consultation complete. Returning to your dashboard...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
