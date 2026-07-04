import { Plus, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import type { MenuItem } from '@/data/menuData';
import { toast } from 'sonner';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast.success(`${item.name} added to cart`);
  };

  const isPopular = item.name.includes('Smash Burger') || item.name.includes('Truffle Burger');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(249,115,22,0.2)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {isPopular && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              🔥 Popular
            </span>
          )}
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            item.isVeg ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {item.prepTime} min
        </div>
      </div>
      <div className="p-4 flex flex-col h-[150px]">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 mb-auto">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-2xl font-bold text-primary">₹{item.price}</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-transform hover:scale-[1.03] glow-primary"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
