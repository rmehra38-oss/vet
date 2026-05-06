import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';

interface PaymentState {
  amount: number;
  itemName: string;
  type: 'appointment' | 'subscription' | 'product';
  details?: any;
}

export default function Payment() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as PaymentState;

  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // If no state, redirect back (safety)
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  const handlePayment = async () => {
    setPaymentStep('processing');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      if (state.type === 'appointment' && user) {
        // Log the appointment after successful payment
        await addDoc(collection(db, 'appointments'), {
          ...state.details,
          ownerId: user.uid,
          status: 'confirmed',
          paymentStatus: 'paid',
          amount: state.amount,
          createdAt: serverTimestamp(),
        });
      }
      
      setPaymentStep('success');
      
      // Navigate away after showing success for a bit
      setTimeout(() => {
        if (state.type === 'appointment') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }, 3000);
    } catch (error) {
      console.error('Finalization failed:', error);
      alert('Payment succeeded but record creation failed. Please contact support.');
      setPaymentStep('method');
    }
  };

  if (!state) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {paymentStep === 'method' && (
            <motion.div 
              key="method"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-10 space-y-8"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold font-sans">Payment Gateway</h1>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Transaction ID: #VC-{Math.floor(Math.random() * 1000000)}</p>
                </div>
                <div className="flex items-center gap-2 text-brand-teal px-3 py-1 bg-brand-green rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-green-accent/20">
                  <ShieldCheck size={14} />
                  Secure
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-800">{state.itemName}</div>
                  <div className="text-xs text-slate-400">Merchant: VetConnect Online</div>
                </div>
                <div className="text-2xl font-bold text-brand-teal">₹{state.amount}</div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Select Payment Method</p>
                <div className="grid gap-3">
                  {[
                    { id: 'upi', name: 'UPI (PhonePe, GPay, Paytm)', icon: '📱' },
                    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                    { id: 'netbanking', name: 'Net Banking', icon: '🏛️' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={cn(
                        "w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all",
                        selectedMethod === m.id ? "border-brand-teal bg-brand-teal/5" : "border-slate-100 bg-white hover:border-slate-200"
                      )}
                    >
                      <div className="text-2xl">{m.icon}</div>
                      <div className="text-sm font-bold text-slate-700">{m.name}</div>
                      {selectedMethod === m.id && <CheckCircle className="ml-auto text-brand-teal" size={20} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={handlePayment}
                  className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg"
                >
                  <Lock size={20} />
                  Pay ₹{state.amount} Now
                </button>
                <div className="flex items-center justify-center gap-6 opacity-40 grayscale pointer-events-none scale-75">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                </div>
                <p className="text-[10px] text-center text-slate-400">
                  By clicking "Pay Now", you agree to our Terms of Service & Privacy Policy. 
                  All transactions are 256-bit SSL encrypted.
                </p>
              </div>
            </motion.div>
          )}

          {paymentStep === 'processing' && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="relative inline-block">
                <Loader2 className="w-20 h-20 text-brand-teal animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={24} className="text-brand-teal/30" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Processing Transaction</h2>
                <p className="text-slate-500">Please do not refresh the page or click back...</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 max-w-xs mx-auto shadow-sm">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-brand-green-accent rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connecting to Bank Host</span>
                </div>
              </div>
            </motion.div>
          )}

          {paymentStep === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center space-y-8"
            >
              <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mx-auto text-brand-teal shadow-xl shadow-brand-green/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle size={48} strokeWidth={3} />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-800">Payment Successful!</h2>
                <p className="text-slate-500 leading-relaxed">
                  Your transaction has been processed successfully. <br />
                  A confirmation receipt has been sent to your email.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left space-y-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Receipt No:</span>
                    <span className="font-bold">#VC-REC-88421</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-bold">{new Date().toLocaleDateString('en-IN')}</span>
                 </div>
                 <div className="h-px bg-slate-200" />
                 <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount Paid:</span>
                    <span className="text-brand-teal">₹{state.amount}</span>
                 </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-teal px-6 py-3 bg-brand-green rounded-xl">
                 <ShieldCheck size={16} />
                 Redirecting back to your dashboard...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
