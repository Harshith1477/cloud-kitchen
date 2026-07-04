import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically handles the hash in the URL and establishes the session.
    // We just need to check if we have a session, fetch their role, and redirect.
    const processCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        navigate('/login');
        return;
      }

      // Check if user exists in public.users, if not (e.g. first time Google OAuth), insert it
      const { data: existingUser } = await supabase.from('users').select('role').eq('id', session.user.id).single();
      
      let role = 'customer';
      if (!existingUser) {
        // Insert new user
        await (supabase.from('users') as any).insert([
          {
            id: session.user.id,
            email: session.user.email,
            role: 'customer'
          }
        ]);
      } else {
        role = (existingUser as any).role || 'customer';
      }

      // Redirect based on role
      if (role === 'admin') navigate('/admin');
      else if (role === 'staff') navigate('/kitchen');
      else navigate('/menu');
    };

    processCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame className="h-16 w-16 text-primary" />
      </motion.div>
      <p className="mt-6 text-muted-foreground animate-pulse font-display tracking-widest">AUTHENTICATING SECURELY...</p>
    </div>
  );
}
