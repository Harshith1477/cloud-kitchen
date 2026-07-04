import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Users, User, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const hour = Math.floor(i / 2) + 11;
  const min = i % 2 === 0 ? '00' : '30';
  const h = hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${h}:${min} ${ampm}`;
}).filter((_, i) => i < 25);

export default function ReservationsPage() {
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Reservation request submitted! We\'ll confirm shortly.');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl mb-2">BOOK A <span className="text-gradient">TABLE</span></h1>
          <p className="text-muted-foreground mb-10">Reserve your spot for a dine-in experience.</p>

          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 neon-border space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="h-4 w-4" /> Name
                </label>
                <input required type="text" placeholder="Your name" className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Phone className="h-4 w-4" /> Phone
                </label>
                <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <CalendarDays className="h-4 w-4" /> Date
              </label>
              <input required type="date" className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="h-4 w-4" /> Time Slot
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {timeSlots.slice(0, 15).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedTime === t
                        ? 'bg-primary text-primary-foreground glow-primary'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Users className="h-4 w-4" /> Guests: {guests}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span><span>10</span>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MessageSquare className="h-4 w-4" /> Special Requests
              </label>
              <textarea
                rows={3}
                placeholder="Any dietary restrictions or preferences..."
                className="w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary hover:opacity-90 transition-opacity text-lg font-display tracking-wide"
            >
              RESERVE NOW
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
