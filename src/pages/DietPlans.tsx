import { motion } from 'framer-motion';
import { Apple, Leaf, Beef, Scale, Baby, History, Plus, ChevronRight, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DietPlans() {
  const categories = [
    { name: 'Puppy & Kitten', icon: Baby, color: 'bg-blue-50 text-blue-600', desc: 'Growth optimization for young ones.' },
    { name: 'Weight Loss', icon: Scale, color: 'bg-orange-50 text-orange-600', desc: 'Managed calorie plans for obesity.' },
    { name: 'Senior Care', icon: History, color: 'bg-purple-50 text-purple-600', desc: 'Joint & digestion-friendly nutrition.' },
    { name: 'Livestock Feed', icon: Leaf, color: 'bg-green-50 text-green-600', desc: 'Dairy yield & growth optimization.' },
  ];

  const plans = [
    { 
      title: 'Performance Lean', 
      animal: 'Dogs', 
      focus: 'Muscle Build', 
      price: '₹599', 
      ingredients: ['High Protein', 'Glucosamine', 'Omega-3'],
      tags: ['Premium', 'Vet Approved']
    },
    { 
      title: 'Dairy Boost+', 
      animal: 'Cows/Buffalo', 
      focus: 'Milk Production', 
      price: '₹899', 
      ingredients: ['Mineral Mix', 'Bypass Fat', 'Probiotics'],
      tags: ['Livestock', 'Farm Grade']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl lg:text-6xl">Personalized <span className="italic">Nutrition.</span></h1>
        <p className="text-xl text-brand-teal/60">
          Scientifically formulated diet plans tailored to your animal's breed, age, and activity level.
        </p>
      </header>

      {/* Category Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-10 space-y-6 hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", cat.color)}>
              <cat.icon size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-sans text-brand-teal">{cat.name}</h3>
              <p className="text-sm text-brand-teal/60 leading-relaxed">{cat.desc}</p>
            </div>
            <div className="pt-4 flex items-center text-brand-teal-light font-bold text-sm">
              Explore Plans <ChevronRight size={16} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recommended Plans */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-brand-teal/10 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl">Expert Formulated Plans</h2>
            <p className="text-brand-teal/60">Most popular nutrition schedules used by Indian farmers and owners.</p>
          </div>
          <button className="btn-primary">Request Custom Plan</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {plans.map((plan) => (
            <div key={plan.title} className="glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-1/3 bg-brand-teal p-10 text-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl w-fit">
                    <Beef size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white italic">{plan.title}</h3>
                    <p className="text-xs opacity-60 uppercase tracking-widest">{plan.animal} • {plan.focus}</p>
                  </div>
                </div>
                <div className="text-3xl font-serif mt-12">{plan.price} <span className="text-sm opacity-60 font-sans">/plan</span></div>
              </div>
              <div className="flex-grow p-10 space-y-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    {plan.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-brand-green text-brand-teal-light px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {plan.ingredients.map(ing => (
                      <div key={ing} className="flex items-center gap-2 text-sm text-brand-teal/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal-light" />
                        {ing}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn-secondary w-full">Apply to Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature module: Feeding Charts */}
      <section className="bg-brand-teal/5 rounded-[3rem] p-12 lg:p-20 grid lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-8">
            <h2 className="text-4xl">Smart Feeding Charts</h2>
            <p className="text-brand-teal/60 leading-relaxed text-lg">
               Our system automatically generates age-appropriate feeding schedules. 
               Get insights into protein-to-carb ratios and caloric requirements based 
               on your pet's current weight.
            </p>
            <ul className="space-y-4">
               {[
                  'Age-based nutrient profiling',
                  'Pregnancy nutrition tracking',
                  'Recovery diets for post-surgery',
                  'Water intake monitoring'
               ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-brand-teal font-medium">
                     <div className="w-6 h-6 rounded-full bg-brand-green-accent flex items-center justify-center text-white">
                        <ChevronRight size={14} />
                     </div>
                     {item}
                  </li>
               ))}
            </ul>
         </div>
         <div className="glass-card p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center bg-brand-teal p-6 rounded-2xl text-white">
               <div>
                  <div className="text-xs opacity-60">TODAY'S SCHEDULE</div>
                  <div className="font-bold flex items-center gap-2">
                     <Activity size={16} /> 
                     Golden Retriever Plan
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-serif">1450 kcal</div>
                  <div className="text-[10px] opacity-60">TOTAL DAILY LIMIT</div>
               </div>
            </div>
            <div className="space-y-4">
               {[
                  { time: '07:30 AM', meal: 'Breakfast', content: '250g Kibble + 1 Egg', status: 'completed' },
                  { time: '01:00 PM', meal: 'Lunch', content: 'Snack: 1 Carrot', status: 'pending' },
                  { time: '08:00 PM', meal: 'Dinner', content: '250g Kibble + Fish Oil', status: 'pending' }
               ].map((meal, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border-b border-brand-teal/5 last:border-0">
                     <div>
                        <div className="text-xs text-brand-teal/40">{meal.time}</div>
                        <div className="font-bold text-brand-teal">{meal.meal}</div>
                        <div className="text-sm opacity-60">{meal.content}</div>
                     </div>
                     <div className={cn("px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", 
                        meal.status === 'completed' ? 'bg-brand-green text-brand-teal-light' : 'bg-brand-teal/5 text-brand-teal/40')}>
                        {meal.status}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
