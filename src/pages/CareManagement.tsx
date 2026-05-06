import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Clock, Plus, ChevronRight, Calendar, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CareManagement() {
  const schedules = [
    { 
      animal: 'Moti (Sahiwal Cow)', 
      type: 'Livestock',
      tasks: [
        { name: 'Deworming', due: '12 May 2026', priority: 'high', icon: Zap },
        { name: 'FMD Vaccination', due: '24 Jun 2026', priority: 'medium', icon: ShieldCheck },
        { name: 'Heat Cycle Check', due: 'Weekly', priority: 'low', icon: Activity },
      ]
    },
    { 
      animal: 'Bruno (Golden Retriever)', 
      type: 'Pet',
      tasks: [
        { name: 'Rabies Booster', due: 'Today', priority: 'urgent', icon: ShieldCheck },
        { name: 'Tick & Flea Treatment', due: '01 Jun 2026', priority: 'low', icon: Zap },
        { name: 'Dental Checkup', due: '15 Jul 2026', priority: 'low', icon: Heart },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-5xl lg:text-6xl italic">Care <span className="not-italic">Management.</span></h1>
          <p className="text-xl text-brand-teal/60">
            Never miss a vaccination or checkup. Automated tracking for pets and professional livestock farms.
          </p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
           <button className="btn-primary grow lg:grow-0">
              <Plus size={20} />
              Add Reminder
           </button>
           <button className="btn-secondary grow lg:grow-0">
              <Calendar size={20} />
              Schedule Visit
           </button>
        </div>
      </header>

      {/* Active Schedules */}
      <section className="grid lg:grid-cols-2 gap-12">
        {schedules.map((profile, idx) => (
          <motion.div 
            key={profile.animal}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center border-b border-brand-teal/10 pb-4">
               <div>
                  <h3 className="text-2xl">{profile.animal}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal/40">{profile.type} CARE PLAN</span>
               </div>
               <button className="text-brand-teal-light font-bold text-sm">View History</button>
            </div>

            <div className="space-y-4">
              {profile.tasks.map((task, tidx) => (
                <div key={tidx} className="glass-card p-6 flex justify-between items-center group hover:bg-brand-teal/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-colors", 
                       task.priority === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-brand-green text-brand-teal-light')}>
                       <task.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold font-sans text-brand-teal">{task.name}</h4>
                      <p className="text-sm text-brand-teal/60">Due: {task.due}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={cn("text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                        task.priority === 'urgent' ? 'bg-red-100 text-red-700' : 
                        task.priority === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-brand-teal/10 text-brand-teal/40'
                     )}>
                        {task.priority}
                     </span>
                     <ChevronRight size={18} className="text-brand-teal/20 group-hover:text-brand-teal" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recovery & Post-Op Module */}
      <section className="bg-brand-teal p-12 lg:p-24 rounded-[3rem] text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
         
         <div className="max-w-3xl relative z-10 space-y-12">
            <div className="space-y-4">
               <h2 className="text-4xl text-white">Post-Treatment Recovery</h2>
               <p className="text-brand-green/70 text-lg">
                  Specialized recovery plans for animals post-surgery or during long-term medication. 
                  Includes daily vitals tracking and direct vet chat access.
               </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8">
               {[
                  { label: 'Vitals Log', icon: Activity },
                  { label: 'Medication', icon: Clock },
                  { label: 'Vet Support', icon: ShieldCheck }
               ].map(item => (
                  <div key={item.label} className="p-8 bg-white/10 rounded-3xl border border-white/10 text-center space-y-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl mx-auto flex items-center justify-center">
                        <item.icon size={24} />
                     </div>
                     <div className="font-bold text-sm tracking-wide">{item.label}</div>
                  </div>
               ))}
            </div>
            
            <button className="btn-primary bg-white text-brand-teal hover:bg-brand-green">
               Request Post-Op Plan
            </button>
         </div>
      </section>
    </div>
  );
}
