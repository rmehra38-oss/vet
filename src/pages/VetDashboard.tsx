import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { Users, Calendar, DollarSign, FileText, CheckCircle, XCircle, Clock, ChevronRight, Activity, Search, Plus } from 'lucide-react';
import { cn, formatDate } from '../lib/utils';

export default function VetDashboard() {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // In a real app, we'd query by vetId. For demo, we might show all pending or vetId matched
    const q = query(collection(db, 'appointments'), where('status', '==', 'pending'));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const appts = await Promise.all(snapshot.docs.map(async (d) => {
        const data = d.id ? { id: d.id, ...d.data() } : d.data();
        // Fetch animal name and image if possible (this is slow in O(n), ideally denormalize)
        let animalName = 'Unknown Animal';
        let animalImage = '';
        if (data.animalId) {
          const aDoc = await getDoc(doc(db, 'animals', data.animalId));
          if (aDoc.exists()) {
            animalName = aDoc.data().name;
            animalImage = aDoc.data().image || '';
          }
        }
        return { ...data, animalName, animalImage };
      }));
      setAppointments(appts);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    });

    return unsubscribe;
  }, [user]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `appointments/${id}`);
    }
  };

  const navigate = useNavigate();

  const handleStartCall = async (appointment: any) => {
    try {
      await updateDoc(doc(db, 'appointments', appointment.id), {
        callStatus: 'ringing',
        callChannelId: appointment.id,
        status: 'active'
      });
      navigate(`/call/${appointment.id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `appointments/${appointment.id}`);
    }
  };

  const stats = [
    { label: 'Today Appointments', value: '12', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Patients', value: '458', icon: Users, color: 'text-brand-teal-light bg-brand-green' },
    { label: 'Monthly Earnings', value: '₹48,250', icon: DollarSign, color: 'text-brand-green-accent bg-green-100/50' },
    { label: 'Avg Rating', value: '4.9', icon: Activity, color: 'text-orange-600 bg-orange-50' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl italic">Welcome, Dr. {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-brand-teal/60">You have 4 new consultation requests for today.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal/30" size={18} />
              <input 
                type="text" 
                placeholder="Search patient/animal..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-brand-teal/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              />
           </div>
           <button className="btn-primary">
              <Plus className="hidden sm:block" size={20} />
              Go Online
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-8 flex items-center gap-6">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.color)}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold font-sans text-brand-teal">{stat.value}</div>
              <div className="text-xs text-brand-teal/40 uppercase font-bold tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Queue */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
             <div className="flex justify-between items-end border-b border-brand-teal/10 pb-4">
                <h3 className="text-2xl">Consultation Queue</h3>
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-brand-teal/40">
                   <span className="text-brand-teal-light border-b-2 border-brand-teal-light pb-4 -mb-4.5 cursor-pointer">Pending (4)</span>
                   <span className="cursor-pointer">Upcoming (8)</span>
                   <span className="cursor-pointer">Completed (12)</span>
                </div>
             </div>

             <div className="space-y-4">
                 {appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <motion.div key={appt.id} className="glass-card p-6 flex flex-col sm:flex-row justify-between gap-6 hover:shadow-lg transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-brand-green overflow-hidden flex items-center justify-center text-brand-teal shrink-0">
                             {appt.animalImage ? (
                               <img 
                                 src={appt.animalImage} 
                                 alt={appt.animalName} 
                                 className="w-full h-full object-cover"
                                 referrerPolicy="no-referrer"
                               />
                             ) : (
                               <Activity size={32} />
                             )}
                          </div>
                          <div>
                             <h4 className="font-bold text-lg font-sans">{appt.animalName}</h4>
                             <p className="text-xs opacity-50 uppercase tracking-widest">{appt.type} Consultation • {appt.symptoms?.slice(0, 30)}...</p>
                             <div className="flex items-center gap-2 mt-2">
                                <Clock size={14} className="text-brand-teal/40" />
                                <span className="text-xs font-bold text-brand-teal-light">{appt.scheduledAt ? formatDate(appt.scheduledAt) : 'Ready'}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button onClick={() => handleStatusChange(appt.id, 'cancelled')} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                             <XCircle size={20} />
                          </button>
                          <button onClick={() => (appt.callStatus === 'ringing' || appt.callStatus === 'active') ? navigate(`/call/${appt.id}`) : handleStartCall(appt)} className="btn-primary py-3 px-6">
                             {(appt.callStatus === 'ringing' || appt.callStatus === 'active') ? 'Join Call' : 'Start Call'}
                          </button>
                       </div>
                    </motion.div>
                  ))
                ) : (
                  // Mock entries for UI visualization
                  [1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-6 flex flex-col sm:flex-row justify-between gap-6 group border-brand-teal/5 opacity-80">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-brand-teal/5 flex items-center justify-center text-brand-teal/20">
                             <Users size={32} />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg font-sans">Patient #{i}04</h4>
                             <p className="text-xs opacity-40 uppercase tracking-widest">Awaiting Confirmation</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button className="p-3 bg-brand-teal/5 text-brand-teal/20 rounded-xl">
                             <Clock size={20} />
                          </button>
                          <button className="btn-secondary py-3 px-6 border-brand-teal/5 opacity-50">
                             Wait for Patient
                          </button>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </section>
        </div>

        {/* Sidebar: Case Notes & Quick Actions */}
        <div className="space-y-8">
           <section className="glass-card p-8 space-y-6">
              <h3 className="text-xl">Prescription Generator</h3>
              <div className="space-y-4">
                 <div className="p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/5 space-y-3">
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-40">QUICK TEMPLATES</div>
                    <div className="flex flex-wrap gap-2">
                       {['Deworming', 'Indigestion', 'Fever', 'Nutrition'].map(t => (
                          <span key={t} className="px-3 py-1 bg-white rounded-lg text-xs font-medium border border-brand-teal/5 cursor-pointer hover:border-brand-teal-light transition-all">
                             {t}
                          </span>
                       ))}
                    </div>
                 </div>
                 <textarea 
                    placeholder="Enter diagnosis & case notes..." 
                    className="w-full h-32 p-4 bg-brand-teal/5 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-teal/10 resize-none"
                 />
                 <button className="btn-primary w-full">Generate Digital Rx</button>
              </div>
           </section>

           <section className="glass-card p-8 space-y-6 bg-brand-green-accent text-white border-none">
              <div className="flex items-center gap-3">
                 <Activity />
                 <h3 className="text-xl text-white italic">Livestock Tracker</h3>
              </div>
              <p className="text-xs opacity-70">Monitor large-scale farm cases and epidemic trends in your region.</p>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="opacity-70">Region Risk Level</span>
                    <span className="font-bold text-orange-400">MODERATE</span>
                 </div>
                 <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-orange-400" />
                 </div>
              </div>
              <button className="btn-primary w-full bg-white text-brand-green-accent hover:bg-brand-green">
                 Regional Report
              </button>
           </section>
        </div>
      </div>
    </div>
  );
}
