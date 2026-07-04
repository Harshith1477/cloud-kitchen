import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // No Supabase — just redirect to menu
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame className="h-16 w-16 text-primary" />
      </motion.div>
      <p className="mt-6 text-muted-foreground animate-pulse font-display tracking-widest">REDIRECTING...</p>
    </div>
  );
}
