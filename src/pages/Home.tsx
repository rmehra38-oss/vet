import { motion } from 'framer-motion';
import { Video, Phone, MessageSquare, ChevronRight, Dog, Cat, Bird, Calendar, ShieldCheck, Zap, Activity, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Home() {
  const categories = [
    { 
      name: 'Dogs', 
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&h=500&auto=format&fit=crop',
      count: '4.5k+ Vets'
    },
    { 
      name: 'Cats', 
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&h=500&auto=format&fit=crop',
      count: '3.2k+ Vets'
    },
    { 
      name: 'Cows', 
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=400&h=500&auto=format&fit=crop',
      count: '2.8k+ Specialists'
    },
    { 
      name: 'Buffalo', 
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=400&h=500&auto=format&fit=crop',
      count: '1.5k+ Specialists'
    },
    { 
      name: 'Poultry', 
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=400&h=500&auto=format&fit=crop',
      count: '1.2k+ Specialists'
    },
    { 
      name: 'Exotic', 
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=400&h=500&auto=format&fit=crop',
      count: '800+ Vets'
    },
  ];

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green border border-brand-green-accent/20 rounded-full text-brand-teal font-bold text-xs uppercase tracking-wider">
              <ShieldCheck size={14} />
              Verified Indian Veterinarians
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-brand-teal">
              Quality Vet Care, Anywhere in India.
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Consult with professional veterinarians via Video, Audio, or WhatsApp. 
              Tailored care for urban pets and rural livestock.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/book" className="btn-primary text-sm px-8 py-4 bg-brand-teal hover:bg-brand-teal-light shadow-lg rounded-xl font-bold">
                Consult via WhatsApp ₹199
              </Link>
              <Link to="/book" className="btn-secondary text-sm px-8 py-4 rounded-xl font-medium">
                Schedule Video Call
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
              <div>
                <div className="text-xl font-bold text-brand-teal">50k+</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Consultations</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <div className="text-xl font-bold text-brand-teal">4.8/5</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Rating</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-brand-teal rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
              <div className="relative z-10 space-y-6 max-w-md">
                <h2 className="text-3xl lg:text-4xl text-white font-bold mb-4">Professional Health Monitoring</h2>
                <p className="text-blue-50/70 text-lg leading-relaxed">
                  Managing health for 2,500+ livestock farms across India with our automated growth tracking.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-xs font-bold">Vaccination Reminders</div>
                  <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-xs font-bold">Diet Tracking</div>
                </div>
              </div>
              
              {/* Floating Dashboard Element */}
              <div className="absolute bottom-8 right-8 hidden md:block w-72 bg-white rounded-2xl p-5 shadow-2xl text-slate-800 border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Health Board</div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-green rounded-full overflow-hidden flex items-center justify-center text-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100&h=100&auto=format&fit=crop" 
                          alt="Sheru"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Sheru (Dog)</p>
                        <p className="text-[10px] text-slate-400">ID: #44210</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Healthy</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-xl">🐄</div>
                      <div>
                        <p className="text-xs font-bold">Sheru (Cow)</p>
                        <p className="text-[10px] text-slate-400">ID: #99021</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">Due Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="livestock" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={cat.name}
              to="/book"
              state={{ species: cat.name }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-green-accent transition-all group cursor-pointer shadow-sm flex flex-col h-full"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-[9px] font-bold uppercase tracking-widest">{cat.count}</p>
                  </div>
                </div>
                <div className="p-4 text-center mt-auto">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{cat.name}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="bg-white border-y border-slate-100 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-bold border-l-4 border-brand-green-accent pl-4">Services Overview</h2>
                    <p className="text-slate-500">Fully integrated healthcare platform for your animals.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-3">
                    {[
                       { 
                         title: 'Digital Prescriptions', 
                         desc: 'Downloadable via the App', 
                         image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=100&h=100&auto=format&fit=crop' 
                       },
                       { 
                         title: 'Diet & Nutrition Plans', 
                         desc: 'Tailored for specific breeds', 
                         image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=100&h=100&auto=format&fit=crop' 
                       },
                       { 
                         title: 'Vaccination Tracker', 
                         desc: 'Automated Reminders', 
                         image: 'https://images.unsplash.com/photo-1628033036243-690fc1e5824e?q=80&w=100&h=100&auto=format&fit=crop' 
                       },
                       { 
                         title: 'WhatsApp Consultation', 
                         desc: 'Quick 24/7 support channel', 
                         image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=100&h=100&auto=format&fit=crop' 
                       },
                    ].map((item, idx) => (
                       <div key={item.title} className="p-4 bg-slate-50 rounded-xl flex items-center gap-4 border border-slate-100 transition-colors hover:bg-slate-100">
                          <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shadow-sm shrink-0 border border-slate-100">
                             <img 
                               src={item.image} 
                               alt={item.title}
                               className="w-full h-full object-cover"
                               referrerPolicy="no-referrer"
                             />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                             <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                 <div className="space-y-4 pt-12">
                    <div className="bg-brand-green border border-brand-green-accent/20 p-8 rounded-2xl space-y-4">
                       <h3 className="text-lg font-bold text-brand-teal">Premium Plans</h3>
                       <div className="space-y-3">
                         <div className="p-3 bg-white border border-brand-green-accent rounded-lg flex justify-between items-center">
                           <div className="text-xs"><strong>Farm Care Plan</strong><br/><span className="text-[10px] text-slate-400">Up to 10 animals</span></div>
                           <div className="text-right"><strong>₹1499</strong><p className="text-[8px] text-slate-400">/Yearly</p></div>
                         </div>
                         <div className="p-3 bg-white/50 border border-slate-200 rounded-lg flex justify-between items-center">
                           <div className="text-xs"><strong>Monthly Pet</strong><br/><span className="text-[10px] text-slate-400">Unlimited Chat</span></div>
                           <div className="text-right"><strong>₹499</strong><p className="text-[8px] text-slate-400">/Monthly</p></div>
                         </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-3 group overflow-hidden">
                       <div className="w-12 h-12 bg-white rounded-full overflow-hidden shadow-sm flex items-center justify-center text-lg transition-transform group-hover:scale-110">
                          <img 
                            src="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=100&h=100&auto=format&fit=crop" 
                            alt="Clock"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                       </div>
                       <h3 className="text-lg font-bold">15 Min Response</h3>
                       <p className="text-xs text-slate-500">Emergency callback for critical livestock cases.</p>
                    </div>
                    <div className="bg-brand-teal p-8 rounded-2xl text-white space-y-3 group overflow-hidden">
                       <div className="w-12 h-12 bg-white/10 rounded-full overflow-hidden shadow-sm flex items-center justify-center text-lg transition-transform group-hover:scale-110">
                          <img 
                            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=100&h=100&auto=format&fit=crop" 
                            alt="India"
                            className="w-full h-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                       </div>
                       <h3 className="text-lg font-bold text-white">PAN India</h3>
                       <p className="text-xs text-white/70">Rural support available even in remote regions.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl">Simple, Transparent <span className="italic">Pricing.</span></h2>
          <p className="text-brand-teal/60">Expert care shouldn't be expensive. Choose a plan that fits your needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: 'Basic Consultation', 
              price: '₹299', 
              period: 'per session', 
              features: ['15 Min Video/Audio Call', 'Digital Prescription', '2 Days Follow-up Chat', 'Valid for 1 Pet'],
              cta: 'Book Session',
              popular: false 
            },
            { 
              name: 'Monthly Care Plan', 
              price: '₹999', 
              period: 'per month', 
              features: ['Unlimited Chat Support', '2 Video Consultations', 'Personalized Diet Plan', 'Vaccination Reminders'],
              cta: 'Start Free Trial',
              popular: true 
            },
            { 
              name: 'Farm Care Plan', 
              price: '₹4,999', 
              period: 'per month', 
              features: ['Up to 50 Livestock', 'Priority Emergency Support', 'Monthly Farm Audit', 'Custom Feed Schedules'],
              cta: 'Contact Sales',
              popular: false 
            }
          ].map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "glass-card p-10 flex flex-col justify-between relative",
                plan.popular ? "border-brand-teal-light border-2 shadow-2xl scale-105 z-10" : "border-brand-teal/5"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-teal-light text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-serif">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-bold font-sans text-brand-teal">{plan.price}</span>
                    <span className="text-brand-teal/40 text-sm whitespace-nowrap">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-brand-teal/70">
                      <CheckCircle className="text-brand-teal-light shrink-0" size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                to="/payment"
                state={{ 
                  amount: parseInt(plan.price.replace(/[^0-9]/g, '')), 
                  itemName: plan.name, 
                  type: 'subscription' 
                }}
                className={cn(
                  "w-full mt-12 py-4 rounded-xl font-bold transition-all text-center",
                  plan.popular ? "btn-primary" : "btn-secondary"
                )}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Promotion */}
      <section className="bg-brand-teal pt-20 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10 pb-20">
                  <h2 className="text-5xl text-white">Your Vet, Always in <span className="italic">Your Pocket.</span></h2>
                  <p className="text-brand-green/70 text-xl max-w-xl">
                     Get the Vetconnect Online app for faster connectivity, offline care access, 
                     and real-time alerts. Optimized for 4G/5G in rural India.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button className="bg-white px-8 py-4 rounded-xl flex items-center gap-4 text-brand-teal hover:bg-brand-green transition-all">
                        <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-white">
                           <Zap size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-[10px] font-bold opacity-60">GET IT ON</div>
                           <div className="font-bold text-lg leading-tight uppercase">Google Play</div>
                        </div>
                     </button>
                     <button className="bg-white/10 px-8 py-4 rounded-xl flex items-center gap-4 text-white hover:bg-white/20 transition-all border border-white/10">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                           <Zap size={20} />
                        </div>
                        <div className="text-left">
                           <div className="text-[10px] font-bold opacity-60">DOWNLOAD ON THE</div>
                           <div className="font-bold text-lg leading-tight uppercase">App Store</div>
                        </div>
                     </button>
                  </div>
               </div>
               
               <div className="relative h-[600px] flex justify-center">
                  <div className="w-72 h-full bg-white/10 rounded-t-[3rem] border-x border-t border-white/20 p-4 pb-0">
                     <div className="w-full h-full bg-brand-neutral rounded-t-[2.5rem] p-6 space-y-6 overflow-hidden">
                        <div className="w-12 h-1 bg-brand-teal/10 mx-auto rounded-full" />
                        <div className="space-y-4">
                           <div className="h-4 bg-brand-teal/5 rounded-full w-2/3" />
                           <div className="aspect-square bg-brand-teal/5 rounded-3xl" />
                           <div className="space-y-2">
                              <div className="h-4 bg-brand-green rounded-full w-full" />
                              <div className="h-4 bg-brand-green rounded-full w-5/6" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
