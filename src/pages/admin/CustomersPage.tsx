import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

export default function CustomersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      // We will try fetching users and aggregate their orders if applicable
      try {
        const { data: userData } = await supabase.from('users').select('*');
        if (userData) {
          // If orders exists, we can fetch all and manually group them.
          const { data: orderData } = await (supabase.from('orders') as any).select('user_id, total_amount');
          
          const richUsers = userData.map((user: any) => {
            const userOrders = orderData?.filter((o: any) => o.user_id === user.id) || [];
            const totalSpent = userOrders.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);
            return {
              ...user,
              orderCount: userOrders.length,
              totalSpent
            };
          });
          
          setUsers(richUsers);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Customers</h2>

      <Card className="bg-neutral-900 border-neutral-800 text-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-6 py-4">ID / Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Total Orders</th>
                  <th className="px-6 py-4 font-semibold text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-neutral-400">Loading customers...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-neutral-400">No customers found in database.</td></tr>
                ) : users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{user.email}</div>
                      <div className="text-xs text-neutral-500 font-mono mt-1">{user.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-orange-500/20 text-orange-400' : 'bg-neutral-800 text-neutral-300'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-neutral-300">
                      {user.orderCount}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-500 font-semibold font-mono text-lg">
                      ₹{user.totalSpent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
