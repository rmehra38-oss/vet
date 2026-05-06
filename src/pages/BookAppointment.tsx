import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Video, Phone, MessageSquare, ChevronRight, CheckCircle, Calendar, Plus, ShieldCheck, Dog } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [animals, setAnimals] = useState<any[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [type, setType] = useState<'video' | 'audio' | 'chat'>('video');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'animals'), where('ownerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnimals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'animals');
    });

    return unsubscribe;
  }, [user]);

  const handleBooking = async () => {
    if (!user || !selectedAnimal) return;
    
    // Instead of booking directly, we navigate to the payment gateway
    navigate('/payment', {
      state: {
        amount: 353, // Total with GST
        itemName: `${type.charAt(0).toUpperCase() + type.slice(1)} Consultation`,
        type: 'appointment',
        details: {
          animalId: selectedAnimal,
          vetId: 'MOCKED_VET_ID',
          type,
          symptoms,
          scheduledAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
        }
      }
    });
  };

  const steps = ['Select Animal', 'Consultation Type', 'Symptoms', 'Payment & Confirm'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl">Book Consultation</h1>
        <div className="flex justify-between items-center max-w-md mx-auto relative pt-8">
          <div className="absolute top-[3.25rem] left-0 right-0 h-0.5 bg-brand-teal/10 -z-10" />
          {steps.map((s, idx) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                step > idx + 1 ? "bg-brand-teal border-brand-teal text-white" :
                step === idx + 1 ? "border-brand-teal text-brand-teal bg-white" : "border-brand-teal/10 bg-brand-neutral text-brand-teal/20"
              )}>
                {step > idx + 1 ? <CheckCircle size={18} /> : idx + 1}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", step === idx + 1 ? "text-brand-teal" : "text-brand-teal/20")}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </header>

      <div className="glass-card p-10 min-h-[400px] flex flex-col">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow">
            <h3 className="text-2xl">Which animal needs care?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => setSelectedAnimal(animal.id)}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4",
                    selectedAnimal === animal.id ? "border-brand-teal bg-brand-teal/5" : "border-brand-teal/5 bg-transparent hover:border-brand-teal/20"
                  )}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-brand-teal/10 overflow-hidden shrink-0">
                    {animal.image ? (
                      <img 
                        src={animal.image} 
                        alt={animal.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Dog size={24} className="text-brand-teal-light" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{animal.name}</div>
                    <div className="text-xs opacity-50 uppercase tracking-widest">{animal.species} • {animal.breed}</div>
                  </div>
                </button>
              ))}
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-6 rounded-2xl border-2 border-dashed border-brand-teal/20 text-brand-teal/40 flex flex-col items-center justify-center gap-2 hover:border-brand-teal/40 transition-all font-bold"
              >
                <Plus size={24} />
                Add New Animal
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow">
            <h3 className="text-2xl">How would you like to connect?</h3>
            <div className="grid gap-4">
              {[
                { id: 'video', name: 'Video Call', icon: Video, desc: 'Highest quality, best for physical exams.' },
                { id: 'audio', name: 'Audio Call', icon: Phone, desc: 'Great for remote areas with low bandwidth.' },
                { id: 'chat', name: 'Instant Chat', icon: MessageSquare, desc: 'Quick queries and report follow-ups.' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setType(m.id as any)}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-6",
                    type === m.id ? "border-brand-teal bg-brand-teal/5" : "border-brand-teal/5 bg-transparent hover:border-brand-teal/20"
                  )}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-brand-teal/10 text-brand-teal">
                    <m.icon size={24} />
                  </div>
                  <div>
                    <div className="font-bold">{m.name}</div>
                    <div className="text-xs opacity-50">{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow">
            <h3 className="text-2xl">Describe symptoms & concerns</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Please provide as much detail as possible to help the veterinarian prepare for the consultation.</p>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ex: My cow has stopped eating since yesterday and seems to have a fever. Also noticing weight loss..."
                className="w-full min-h-[200px] p-6 rounded-2xl border-2 border-slate-200 focus:border-brand-teal focus:ring-0 transition-all resize-none text-slate-700"
              />
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                <ShieldCheck size={14} />
                Information provided is kept strictly confidential between you and the vet.
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center text-brand-teal-light mb-6">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl">Ready to Confirm</h3>
            <p className="text-brand-teal/60 max-w-sm mx-auto">
              Your consultation for {animals.find(a => a.id === selectedAnimal)?.name} is being scheduled. 
              Payment will be processed via Razorpay secure gateway.
            </p>
            <div className="p-6 bg-brand-teal/5 rounded-2xl w-full mt-6 space-y-2">
               <div className="flex justify-between text-sm">
                  <span>Consultation Fee ({type.charAt(0).toUpperCase() + type.slice(1)})</span>
                  <span className="font-bold">₹299</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span className="font-bold">₹54</span>
               </div>
               <div className="h-px bg-brand-teal/10 my-2" />
               <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹353</span>
               </div>
            </div>
          </motion.div>
        )}

        <div className="pt-10 flex gap-4 mt-auto">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="btn-secondary px-8">Back</button>
          )}
          <button 
            onClick={() => step < 4 ? setStep(step + 1) : handleBooking()}
            disabled={(step === 1 && !selectedAnimal) || (step === 3 && symptoms.length < 10)}
            className="btn-primary flex-grow text-lg py-4"
          >
            {loading ? 'Booking...' : step === 4 ? 'Pay & Confirm' : 'Continue'}
            {step < 4 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
