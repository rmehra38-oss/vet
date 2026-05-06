import { motion } from 'framer-motion';
import { Phone, AlertCircle, MapPin, Zap, ChevronRight, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Emergency() {
  const emergencies = [
    { 
      title: 'Active Choking', 
      desc: 'If the animal is struggling to breathe, clear the airway if safe.',
      action: 'Call Emergency No'
    },
    { 
      title: 'Heavy Bleeding', 
      desc: 'Apply direct pressure with a clean cloth.',
      action: 'Call Emergency No'
    },
    { 
      title: 'Heat Stroke', 
      desc: 'Move to a cool area and apply room temperature water.',
      action: 'Call Emergency No'
    },
    { 
      title: 'Poisoning', 
      desc: 'Do not induce vomiting unless told by a vet.',
      action: 'Call Emergency No'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest">
            <AlertCircle size={16} />
            Emergency Care
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Critical Support. <span className="text-red-600">Right Now.</span></h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our emergency response team is available 24/7 for critical cases. If your pet or livestock needs immediate attention, use the contacts below.
          </p>
        </motion.div>

        <div className="grid gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-600 text-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Call Emergency Vet</h2>
              <p className="text-red-100 italic">Immediate response for critical health crises.</p>
              <div className="text-4xl font-bold tracking-tighter">+91 1800 200 1234</div>
            </div>
            <a href="tel:+9118002001234" className="bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
              <Phone size={24} />
              Call Now
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-4 text-brand-teal">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold">WhatsApp SOS</h3>
              </div>
              <p className="text-slate-500 text-sm">Send a photo or video of the emergency for instant triage.</p>
              <button className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                Launch WhatsApp SOS
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-4 text-brand-teal">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold">Find Nearest Clinic</h3>
              </div>
              <p className="text-slate-500 text-sm">Locate 24/7 veterinary hospitals within 10km of your location.</p>
              <button className="w-full btn-secondary py-4 flex items-center justify-center gap-2">
                Open Maps
              </button>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 px-4">
              <HeartPulse className="text-red-500" />
              First Aid Guide
            </h3>
            <div className="grid gap-4">
              {emergencies.map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-red-200 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-red-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm mb-6 uppercase font-bold tracking-widest">Not an emergency?</p>
          <Link to="/book" className="text-brand-teal font-bold hover:underline">
            Schedule a regular consultation instead
          </Link>
        </div>
      </div>
    </div>
  );
}
