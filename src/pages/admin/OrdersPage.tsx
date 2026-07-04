import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const initialOrders = [
  { id: 'a1b2c3d4-5678', created_at: '2026-07-04T10:30:00', customer_name: 'Rahul Sharma', customer_phone: '+91 98765 43210', items: [{ name: 'Smash Burger', quantity: 2 }, { name: 'Loaded Fries', quantity: 1 }], total_amount: 647, status: 'preparing' },
  { id: 'e5f6g7h8-9012', created_at: '2026-07-04T11:15:00', customer_name: 'Priya Patel', customer_phone: '+91 87654 32109', items: [{ name: 'Veggie Supreme', quantity: 1 }, { name: 'Berry Blast Shake', quantity: 1 }], total_amount: 358, status: 'delivered' },
  { id: 'i9j0k1l2-3456', created_at: '2026-07-04T12:00:00', customer_name: 'Amit Kumar', customer_phone: '+91 76543 21098', items: [{ name: 'Burger + Fries Combo', quantity: 1 }, { name: 'Truffle Burger', quantity: 1 }], total_amount: 748, status: 'pending' },
  { id: 'm3n4o5p6-7890', created_at: '2026-07-04T13:45:00', customer_name: 'Sneha Gupta', customer_phone: '+91 65432 10987', items: [{ name: 'Chicken Shawarma', quantity: 2 }], total_amount: 358, status: 'ready' },
  { id: 'q7r8s9t0-1234', created_at: '2026-07-04T14:20:00', customer_name: 'Vikram Singh', customer_phone: '+91 54321 09876', items: [{ name: 'Wrap Meal Deal', quantity: 1 }, { name: 'Cold Brew Coffee', quantity: 2 }], total_amount: 607, status: 'pending' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (dateFilter && !order.created_at.startsWith(dateFilter)) return false;
    return true;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order status updated to ${newStatus}`);
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
          {filtered.length === 0 ? (
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
                  {filtered.map((order) => (
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
                          {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
