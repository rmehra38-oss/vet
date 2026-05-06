import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package, Filter, Search, ChevronRight, Zap, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Marketplace() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = (product: any) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/payment', {
      state: {
        amount: parseInt(product.price.replace(/[^0-9]/g, '')),
        itemName: product.name,
        type: 'product'
      }
    });
  };

  const products = [
    { 
      name: 'Premium Puppy Chow', 
      brand: 'VetChoice', 
      price: '₹1,250', 
      rating: 4.8, 
      category: 'Pet Food',
      img: 'bg-orange-100' 
    },
    { 
      name: 'Cattle Mineral Mix', 
      brand: 'DairyMax', 
      price: '₹850', 
      rating: 4.9, 
      category: 'Livestock',
      img: 'bg-green-100' 
    },
    { 
      name: 'Anti-Tick Spray', 
      brand: 'ShieldVet', 
      price: '₹450', 
      rating: 4.7, 
      category: 'Medicines',
      img: 'bg-blue-100' 
    },
    { 
      name: 'Bird Seed Blend', 
      brand: 'Wings', 
      price: '₹320', 
      rating: 4.5, 
      category: 'Others',
      img: 'bg-yellow-100' 
    },
  ];

  const categories = ['All', 'Pet Food', 'Livestock', 'Medicines', 'Supplements'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-5xl lg:text-6xl">Essential <span className="italic">Pharmacy.</span></h1>
          <p className="text-xl text-brand-teal/60">
            Vet-approved food, supplements, and healthcare products delivered to your doorstep.
          </p>
        </div>
        <div className="relative grow md:grow-0 md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal/30" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-brand-teal/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal/10 shadow-sm"
          />
        </div>
      </header>

      {/* Filter Rail */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat, idx) => (
          <button 
            key={cat}
            className={cn(
              "px-8 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap",
              idx === 0 ? "bg-brand-teal text-white border-brand-teal" : "bg-white text-brand-teal/40 border-brand-teal/5 hover:border-brand-teal/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="glass-card overflow-hidden hover:shadow-2xl transition-all border-brand-teal/5 hover:border-brand-teal/20">
              <div className={cn("aspect-square flex items-center justify-center relative", product.img)}>
                <Package size={64} className="text-brand-teal/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-brand-teal">
                   <Star size={12} fill="currentColor" className="text-yellow-400" />
                   {product.rating}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-brand-teal-light mb-1">{product.category}</div>
                   <h3 className="text-lg font-bold font-sans text-brand-teal">{product.name}</h3>
                   <p className="text-xs opacity-40">{product.brand}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                   <span className="text-xl font-bold font-sans">{product.price}</span>
                   <button 
                      onClick={() => handlePurchase(product)}
                      className="w-10 h-10 rounded-xl bg-brand-teal text-white flex items-center justify-center hover:bg-brand-teal-light transition-colors"
                    >
                      <Plus size={20} />
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Promo Banner */}
      <section className="bg-brand-green rounded-[3rem] p-12 lg:p-24 overflow-hidden relative border border-brand-teal/5">
        <div className="max-w-2xl space-y-8 relative z-10">
           <div className="flex items-center gap-2 text-brand-teal font-bold uppercase tracking-widest text-xs">
              <Zap size={16} fill="currentColor" />
              Member Exclusive
           </div>
           <h2 className="text-5xl">Save 15% on Monthly <span className="italic">Subscriptions.</span></h2>
           <p className="text-brand-teal/60 text-lg">
              Set your animal's nutrition on autopilot. Free delivery and 
              priority teleconsultation included with all subscriptions.
           </p>
           <button className="btn-primary bg-brand-teal">Explore Subscriptions</button>
        </div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-teal/5 rounded-full flex items-center justify-center">
           <ShoppingCart size={120} className="text-brand-teal/10 -rotate-12" />
        </div>
      </section>
    </div>
  );
}
