import { motion } from 'framer-motion';
import { Package, CheckCircle2, ChefHat, Truck, PartyPopper } from 'lucide-react';

const steps = [
  { label: 'Order Placed', icon: Package, done: true },
  { label: 'Confirmed', icon: CheckCircle2, done: true },
  { label: 'Preparing', icon: ChefHat, done: true, active: true },
  { label: 'Ready', icon: Truck, done: false },
  { label: 'Delivered', icon: PartyPopper, done: false },
];

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl mb-2">TRACK <span className="text-gradient">ORDER</span></h1>
          <p className="text-muted-foreground mb-10">Follow your order in real-time.</p>

          <div className="glass-card rounded-3xl p-8 neon-border mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Order #FB-1042</p>
                <p className="font-display text-2xl mt-1">Estimated: 12 min</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                Preparing
              </span>
            </div>

            {/* Progress steps */}
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.active
                        ? 'bg-primary text-primary-foreground glow-primary animate-pulse-glow'
                        : step.done
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-10 ${step.done ? 'bg-primary/40' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className={`font-medium text-sm ${step.active ? 'text-primary' : step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    {step.active && (
                      <p className="text-xs text-muted-foreground mt-0.5">Your food is being prepared...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            This page will update in real-time once connected to the backend.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
