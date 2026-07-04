import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, total, itemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-card border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display text-2xl">YOUR CART</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <ShoppingBag className="h-16 w-16 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-primary"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="glass-card rounded-xl p-4 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-primary font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md bg-secondary hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md bg-secondary hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal ({itemCount()} items)</span>
                    <span className="font-display text-2xl">₹{total()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="block w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center glow-primary hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
