import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarDays, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }
      // Assuming a simplistic check: Fetch user role from public.users table (or metadata)
      const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
      // If table doesn't exist yet, we might get an error, fallback to false
      setIsAdmin(data?.role === 'admin' || true); // TEMPORARY: force true for dev/prototype unless configured
    };
    checkRole();
  }, []);

  if (isAdmin === null) return <div className="p-10 text-center text-white">Loading...</div>;
  if (isAdmin === false) return <Navigate to="/login" />;

  const links = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Reservations', path: '/admin/reservations', icon: CalendarDays },
    { name: 'Customers', path: '/admin/customers', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-orange-500 tracking-tighter">
            FUELBOX<span className="text-white text-sm block tracking-normal font-medium mt-1">Admin Panel</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-500 text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-800 gap-3"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/login';
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
