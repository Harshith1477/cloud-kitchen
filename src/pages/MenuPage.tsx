import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { categories, menuItems } from '@/data/menuData';
import MenuItemCard from '@/components/MenuItemCard';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      return matchesCat && matchesSearch && matchesVeg;
    });
  }, [activeCategory, search, vegOnly]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <h1 className="font-display text-5xl mb-2">OUR <span className="text-gradient">MENU</span></h1>
        <p className="text-muted-foreground mb-8">Crafted for speed, built for taste.</p>

        {/* Sticky Filters Container */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md pt-4 pb-2 mb-6 border-b border-white/5">
          {/* Search + Veg filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                vegOnly
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              🟢 Veg Only
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <p className="text-lg">No items found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
