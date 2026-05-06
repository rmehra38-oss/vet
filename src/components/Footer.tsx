import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin, Instagram, Youtube, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 bg-brand-teal rounded flex items-center justify-center text-white text-[10px] font-bold">V</div>
            <span className="text-sm font-bold tracking-tight text-brand-teal">Vetconnect <span className="text-brand-green-accent">Online</span></span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium max-w-xs leading-relaxed">
            © {currentYear} Vetconnect Online. ISO 9001:2015 Certified Telehealth Platform. All medical data is secured with AES-256 encryption.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-brand-teal transition-colors">Terms</Link>
          <Link to="/refunds" className="hover:text-brand-teal transition-colors">Refunds</Link>
          <span className="text-brand-teal">Farmer Support: 1800-VET-CARE</span>
        </div>
      </div>
    </footer>
  );
}
