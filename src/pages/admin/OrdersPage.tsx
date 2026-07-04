import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    let query = (supabase.from('orders') as any).select('*').order('created_at', { ascending: false });
    
    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    
    if (dateFilter) {
      // Basic date filtering
      query = query.gte('created_at', `${dateFilter}T00:00:00`).lte('created_at', `${dateFilter}T23:59:59`);
    }

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to fetch orders');
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, dateFilter]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await (supabase.from('orders') as any).update({ status: newStatus }).eq('id', orderId);
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-orange-500/20 text-orange-400';
      case 'preparing': return 'bg-blue-500/20 text-blue-400';
      case 'ready': return 'bg-yellow-500/20 text-yellow-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        
        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-auto bg-neutral-900 border-neutral-800 focus-visible:ring-orange-500"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-neutral-900 border-neutral-800">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 text-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-neutral-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-neutral-800 text-neutral-400">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Items</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {orders.map((order) => {
                    const parsedItems = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                    return (
                      <tr key={order.id} className="hover:bg-neutral-800/50 group">
                        <td className="px-6 py-4 font-mono text-orange-400">#{order.id.split('-')[0]}</td>
                        <td className="px-6 py-4 text-neutral-400">
                          {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{order.customer_name}</div>
                          <div className="text-xs text-neutral-500">{order.customer_phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-[200px] truncate text-neutral-300">
                            {parsedItems?.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">₹{order.total_amount}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <Select 
                            defaultValue={order.status} 
                            onValueChange={(val) => updateOrderStatus(order.id, val)}
                          >
                            <SelectTrigger className={`w-[130px] border-0 ring-0 focus:ring-0 ${getStatusColor(order.status)} font-semibold text-xs`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="preparing">Preparing</SelectItem>
                              <SelectItem value="ready">Ready</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
