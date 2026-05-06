import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Dog, Calendar, FileText, Activity, Clock, ChevronRight, AlertCircle, HeartPulse, X, Camera, Upload, Phone, Video } from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [animals, setAnimals] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ name: '', species: 'Dog', breed: '', age: '', image: '' });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAnimal(prev => ({ ...prev, image: reader.result as string }));
        setIsUploading(false);
      };
      reader.onerror = () => {
        console.error('FileReader error');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!user) return;

    const animalsQuery = query(collection(db, 'animals'), where('ownerId', '==', user.uid));
    const unsubscribeAnimals = onSnapshot(animalsQuery, (snapshot) => {
      setAnimals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'animals');
    });

    const appointmentsQuery = query(collection(db, 'appointments'), where('ownerId', '==', user.uid));
    const unsubscribeAppointments = onSnapshot(appointmentsQuery, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    });

    return () => {
      unsubscribeAnimals();
      unsubscribeAppointments();
    };
  }, [user]);

  const handleAddAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'animals'), {
        ...newAnimal,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });
      setShowAddModal(false);
      setNewAnimal({ name: '', species: 'Dog', breed: '', age: '', image: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'animals');
    }
  };

  const [incomingCall, setIncomingCall] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    
    // In a real app, query by ownerId and ringing status
    const q = query(collection(db, 'appointments'), where('ownerId', '==', user.uid), where('callStatus', '==', 'ringing'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setIncomingCall({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      } else {
        setIncomingCall(null);
      }
    });

    return unsubscribe;
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl">Hello, {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-brand-teal/60">Your pet care summary for today.</p>
        </div>
        <div className="flex gap-4">
           <Link to="/book" className="btn-primary">
              <Plus size={20} />
              New Consultation
           </Link>
           <button onClick={() => setShowAddModal(true)} className="btn-secondary">
              <Plus size={20} />
              Register Animal
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Animals & Appointments */}
        <div className="lg:col-span-2 space-y-12">
          {/* Animal Slider/Grid */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-2xl">My Animals</h3>
              <Link to="/animals" className="text-brand-teal-light font-bold text-sm">View All</Link>
            </div>
            
            {animals.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {animals.map((animal) => (
                  <motion.div key={animal.id} className="glass-card p-6 flex items-center gap-6 group hover:border-brand-teal/30 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-brand-green overflow-hidden flex items-center justify-center text-brand-teal shrink-0">
                      {animal.image ? (
                        <img 
                          src={animal.image} 
                          alt={animal.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Dog size={32} />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg font-sans">{animal.name}</h4>
                      <p className="text-xs opacity-50 uppercase tracking-widest">{animal.species} • {animal.breed}</p>
                    </div>
                    <ChevronRight size={20} className="text-brand-teal/20 group-hover:text-brand-teal transition-colors" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center border-dashed border-2 border-brand-teal/10 space-y-4">
                <div className="w-16 h-16 bg-brand-teal/5 rounded-full mx-auto flex items-center justify-center text-brand-teal/40">
                  <Activity size={32} />
                </div>
                <div>
                  <h4 className="font-bold">No animals registered yet</h4>
                  <p className="text-sm opacity-60">Add your pets or livestock to get started with care management.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary btn-sm mx-auto">Register Now</button>
              </div>
            )}
          </section>

          {/* Recent Appointments */}
          <section className="space-y-6">
            <h3 className="text-2xl px-2">Recent Appointments</h3>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt.id} className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-brand-teal-light">
                        <Clock size={24} />
                      </div>
                      <div>
                        <div className="font-bold font-sans">{formatDate(appt.scheduledAt)}</div>
                        <div className="text-sm opacity-50">{appt.type} consultation</div>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-brand-green text-brand-teal-light text-xs font-bold uppercase tracking-wider">
                      {appt.status}
                    </div>
                    <button className="btn-secondary py-2 text-xs">View Rails</button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-brand-teal/40 bg-brand-teal/5 rounded-3xl">
                  No appointments scheduled.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Summaries & Reminders */}
        <div className="space-y-8">
          {/* Quick Reminders */}
          <section className="glass-card p-8 bg-brand-teal text-white border-none space-y-6">
             <div className="flex items-center gap-3">
                <AlertCircle />
                <h3 className="text-xl text-white">Action Required</h3>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                   <div className="text-xs opacity-60 uppercase font-bold tracking-widest mb-1">Vaccination Overdue</div>
                   <div className="font-bold">Sahiwal Cow (Moti)</div>
                   <div className="text-xs opacity-60 mt-2">DUE: 12 May 2026</div>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                   <div className="text-xs opacity-60 uppercase font-bold tracking-widest mb-1">Diet Follow-up</div>
                   <div className="font-bold">Golden Retriever (Bruno)</div>
                   <div className="text-xs opacity-60 mt-2">Check-in needed for weight loss plan.</div>
                </div>
             </div>
             <button className="btn-primary w-full bg-white text-brand-teal hover:bg-brand-green">
                Manage All Reminders
             </button>
          </section>

          {/* Records & Support */}
          <div className="space-y-4">
             <button className="glass-card p-6 w-full flex items-center justify-between hover:bg-brand-teal/5 transition-all text-left group">
                <div className="flex items-center gap-4">
                   <FileText className="text-brand-teal-light" />
                   <div>
                      <div className="font-bold font-sans">Medical Records</div>
                      <p className="text-xs opacity-50">View all past prescriptions</p>
                   </div>
                </div>
                <ChevronRight size={18} className="opacity-20 group-hover:opacity-100" />
             </button>
             <button className="glass-card p-6 w-full flex items-center justify-between hover:bg-brand-teal/5 transition-all text-left group">
                <div className="flex items-center gap-4">
                   <HeartPulse className="text-red-500" />
                   <div>
                      <div className="font-bold font-sans">Health Tracking</div>
                      <p className="text-xs opacity-50">Growth & weight history</p>
                   </div>
                </div>
                <ChevronRight size={18} className="opacity-20 group-hover:opacity-100" />
             </button>
          </div>
        </div>
      </div>

      {/* Add Animal Modal */}
      <AnimatePresence>
        {incomingCall && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl text-center space-y-8"
            >
              <div className="relative mx-auto w-24 h-24">
                 <div className="absolute inset-0 bg-brand-teal rounded-full animate-ping opacity-20" />
                 <div className="relative w-24 h-24 bg-brand-teal rounded-full flex items-center justify-center text-white shadow-xl">
                    <Phone size={40} className="animate-bounce" />
                 </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800">Incoming Call</h3>
                <p className="text-slate-500">Dr. {incomingCall.vetId.slice(0, 5)} is ready for your consultation.</p>
              </div>

              <div className="flex gap-4">
                 <button 
                  onClick={() => setIncomingCall(null)}
                  className="flex-grow py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                 >
                    <X size={20} />
                    Decline
                 </button>
                 <button 
                  onClick={() => navigate(`/call/${incomingCall.id}`)}
                  className="flex-grow py-4 bg-brand-teal text-white rounded-2xl font-bold hover:bg-brand-teal-light transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2"
                 >
                    <Video size={20} />
                    Join Call
                 </button>
              </div>
            </motion.div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center text-brand-teal">
                <h3 className="text-2xl font-bold">Register New Animal</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddAnimal} className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-colors group-hover:border-brand-teal">
                      {newAnimal.image ? (
                        <img src={newAnimal.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={24} className="text-slate-300 group-hover:text-brand-teal" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-brand-teal text-white rounded-xl shadow-lg cursor-pointer hover:bg-brand-teal-light transition-colors">
                      <Upload size={14} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Animal Name</label>
                  <input 
                    required
                    value={newAnimal.name}
                    onChange={e => setNewAnimal({...newAnimal, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-teal focus:ring-0"
                    placeholder="Ex: Sheru"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Species</label>
                    <select 
                      value={newAnimal.species}
                      onChange={e => setNewAnimal({...newAnimal, species: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-teal focus:ring-0"
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Cow</option>
                      <option>Buffalo</option>
                      <option>Poultry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Age (Years)</label>
                    <input 
                      type="number"
                      value={newAnimal.age}
                      onChange={e => setNewAnimal({...newAnimal, age: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-teal focus:ring-0"
                      placeholder="3"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Breed</label>
                  <input 
                    value={newAnimal.breed}
                    onChange={e => setNewAnimal({...newAnimal, breed: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-teal focus:ring-0"
                    placeholder="Ex: Sahiwal"
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 mt-4">
                  Confirm Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
