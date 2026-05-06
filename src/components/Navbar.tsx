import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, HeartPulse, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Livestock', href: '/#livestock' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Diet Plans', href: '/diet' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-teal">
              Vetconnect <span className="text-brand-green-accent">Online</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-slate-200" />
            <Link to="/emergency" className="btn-emergency">
              Emergency Vet
            </Link>
            {user ? (
              <Link to="/dashboard" className="btn-primary py-2 px-4 text-xs">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6 text-xs">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-teal p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        <div className="px-4 pt-2 pb-6 space-y-4 bg-white border-t border-brand-teal/5">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="block text-lg font-medium text-brand-teal px-2">
              {link.name}
            </Link>
          ))}
          <Link to="/emergency" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-red-600 font-bold text-lg px-2">
            <Phone size={20} />
            Emergency
          </Link>
          <div className="pt-2">
            <Link to={user ? "/dashboard" : "/login"} onClick={() => setIsOpen(false)} className="btn-primary w-full">
              {user ? "Dashboard" : "Login / Register"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
