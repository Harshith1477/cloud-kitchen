import { ShoppingCart, Menu, X, Flame, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Track Order', path: '/track' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'glass-card border-border/50 backdrop-blur-xl bg-background/60 shadow-lg' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 pl-6">
          {/* Replace text logo with the referenced image logo */}
          <img 
            src="/fuelbox-icon.png" 
            alt="FuelBox Logo" 
            className="h-10 w-auto object-contain mix-blend-lighten"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary tracking-[0.05em] ${
                location.pathname === l.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {count > 0 && (
              <>
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center z-10">
                  {count}
                </span>
                <span className="absolute -top-1 -right-1 bg-primary rounded-full h-5 w-5 animate-ping opacity-75"></span>
              </>
            )}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-3 bg-secondary/50 rounded-full px-4 py-1.5 border border-white/5">
              <span className="text-sm font-medium flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={() => signOut()} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4 text-muted-foreground hover:text-red-400" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-primary"
            >
              Sign In
            </Link>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === l.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-semibold text-center border border-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center glow-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
