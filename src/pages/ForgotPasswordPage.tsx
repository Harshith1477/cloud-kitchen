import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      
      setSent(true);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 neon-border relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Flame className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl">RESET PASSWORD</h1>
          <p className="text-sm text-muted-foreground mt-1">We'll send you a link to reset your password</p>
        </div>

        {!sent ? (
          <form className="space-y-4" onSubmit={handleReset}>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center bg-secondary/50 p-6 rounded-xl border border-white/5">
            <p className="text-foreground font-medium mb-4">Check your email!</p>
            <p className="text-sm text-muted-foreground mb-6">If an account exists for {email}, we have sent a password reset link.</p>
            <button
              onClick={() => setSent(false)}
              className="text-primary text-sm hover:underline"
            >
              Try another email?
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
