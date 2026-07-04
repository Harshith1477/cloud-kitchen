import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, MapPin, Clock, Star, ChevronDown, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { menuItems as allMenuItems } from '@/data/menuData';
import { toast } from 'sonner';

export default function Index() {
  // Use first 3 items from local menu data as "Most Popular"
  const popularItems = allMenuItems.slice(0, 3);
  const { addItem } = useCartStore();

  const categories = [
    { name: 'Burgers', count: 3, path: 'M18 13H6c-1.1 0-2 .9-2 2s.9 2 2 2h12c1.1 0 2-.9 2-2s-.9-2-2-2zM18 5H6C3.79 5 2 6.79 2 9c0 1.54 1.13 2.91 2.67 3.3A2.99 2.99 0 016.94 13h10.12a2.99 2.99 0 012.27-1.7C20.87 11.91 22 10.54 22 9c0-2.21-1.79-4-4-4z' },
    { name: 'Wraps', count: 2, path: 'M18 4H6C4.9 4 4 4.9 4 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM12 15a3 3 0 110-6 3 3 0 010 6z' },
    { name: 'Sides', count: 2, path: 'M4 6h16v2H4zm2 4h12v10a2 2 0 01-2 2H8a2 2 0 01-2-2V10zm3 2v6h2v-6H9zm4 0v6h2v-6h-2z' },
    { name: 'Drinks', count: 2, path: 'M5 3h14l-1.5 6h-11L5 3zM6.5 11l1 10h9l1-10h-11zm5-6V1a1 1 0 10-2 0v4h2z' },
    { name: 'Combos', count: 3, path: 'M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z' }
  ];

  return (
    <div className="min-h-screen relative bg-background">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#1a0800_0%,_#0d0d0d_100%)] opacity-90" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        {/* 3 Floating Ingredient Pill Tags */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 z-20 pointer-events-none hidden md:block"
        >
          <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-sm font-medium text-white shadow-xl">
            🧀 Double Cheese
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 left-1/4 z-20 pointer-events-none hidden md:block"
        >
          <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-sm font-medium text-white shadow-xl">
            🥩 Smash Patty
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-1/4 z-20 pointer-events-none hidden xl:block"
        >
          <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-sm font-medium text-white shadow-xl">
            🔥 House Sauce
          </span>
        </motion.div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              {/* Floating Pill Badge */}
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-sm font-medium text-white shadow-lg shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                Free Delivery on First Order
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wide">
                FUEL YOUR
                <br />
                <span className="text-gradient">CRAVINGS</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 font-medium text-[18px] text-muted-foreground max-w-lg"
            >
              Premium burgers & wraps. Hot, fast, every time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary transition-transform hover:scale-[1.03]"
              >
                Order Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              {/* Frosted Glass Button */}
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/30 bg-white/5 backdrop-blur-md text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(255,77,0,0.6)]"
              >
                Book a Table
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { icon: Clock, label: 'Avg Delivery', value: '18 MIN' },
                { icon: Star, label: 'Rating', value: '4.8 ★' },
                { icon: MapPin, label: 'Locations', value: '12+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-black/40 backdrop-blur-md border border-white/5 border-t-primary p-4 rounded-2xl shadow-xl shadow-black/20">
                  <stat.icon className="h-5 w-5 mx-auto text-primary mb-2" />
                  <p className="font-display text-2xl font-bold tracking-wide">{stat.value}</p>
                  <p className="text-sm tracking-widest text-muted-foreground mt-1 uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating food image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 w-[550px] z-10"
        >
          <div className="relative">
            {/* Orange Radial Glow Behind */}
            <div className="absolute inset-0 bg-primary opacity-40 blur-[120px] rounded-full scale-110 pointer-events-none" />
            
            {/* Burger Image */}
            <motion.img
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
              alt="Premium Burger"
              className="w-full rounded-full object-cover relative z-10 mix-blend-lighten pointer-events-none"
              style={{ clipPath: 'circle(48% at 50% 50%)' }}
            />
            
            {/* Drop Shadow Beneath */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-black/60 blur-[20px] rounded-[100%] pointer-events-none" />
          </div>
        </motion.div>

        {/* Animated Scroll Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-muted-foreground z-20 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">Scroll</span>
          <ChevronDown className="h-5 w-5 text-primary" />
        </div>
      </section>

      {/* Featured categories */}
      <section className="pt-20 pb-10">
        <div className="container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-display text-4xl text-white font-bold tracking-wide">
              WHAT ARE YOU CRAVING?
            </h2>
            <div className="h-1 w-24 bg-primary mt-4 rounded-full shadow-[0_0_10px_#FF4D00]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => {
              const isBurger = cat.name === 'Burgers';
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {isBurger && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md shadow-primary/30 z-10">
                      🔥 Popular
                    </span>
                  )}
                  <Link
                    to="/menu"
                    className={`block rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-t-primary hover:bg-[#1f1f1f] border-t-2 ${isBurger ? 'border-t-primary bg-[#1f1f1f] glass-card' : 'border-t-transparent glass-card'}`}
                  >
                    <div className="h-16 w-16 mx-auto rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF4D00">
                        <path d={cat.path} />
                      </svg>
                    </div>
                    <p className="font-display text-xl text-white font-semibold">{cat.name}</p>
                    <p className="text-sm text-primary font-medium mt-2 flex items-center justify-center gap-1 group">
                      {cat.count} items <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Most Popular Horizontal Scroll */}
      {popularItems.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl text-white tracking-wide">
                MOST ORDERED TODAY 🔥
              </h2>
              <Link to="/menu" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
              {popularItems.map((item) => (
                <div 
                  key={item.id} 
                  className="min-w-[280px] sm:min-w-[320px] rounded-2xl glass-card overflow-hidden snap-start flex flex-col"
                >
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display tracking-wide font-semibold text-xl mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-lg">₹{item.price}</span>
                      <button 
                        onClick={() => {
                          addItem(item);
                          toast.success(`Added ${item.name} to cart`);
                        }}
                        className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white glow-primary hover:scale-105 transition-transform"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pt-10 pb-20">
        <div className="container">
          <div className="rounded-3xl p-12 text-center neon-border relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
            {/* Background image & Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&h=800&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-[#0d0d0d] opacity-85" />
            
            <div className="relative z-10 w-full">
              <h2 className="font-display text-4xl sm:text-5xl mb-6 text-white tracking-tight">
                READY TO <span className="text-gradient">FUEL UP</span>?
              </h2>
              <p className="text-gray-300 mb-10 max-w-md mx-auto text-lg">
                Order now and get your food delivered hot in under 20 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary hover:scale-[1.03] transition-all"
                >
                  Order Now
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all hover:scale-[1.03]"
                >
                  View Full Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-black/50">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 pl-6">
            <img src="/fuelbox-icon.png" className="h-6 w-auto mix-blend-lighten" alt="FuelBox" />
          </div>
          <p className="text-sm text-muted-foreground pr-6">
            © 2026 FuelBox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
