import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 12390 },
  { name: 'Sun', revenue: 14490 },
];

const categoryData = [
  { name: 'Burgers', value: 45 },
  { name: 'Wraps', value: 25 },
  { name: 'Sides', value: 20 },
  { name: 'Drinks', value: 10 },
];
const COLORS = ['#f97316', '#3b82f6', '#10b981', '#ef4444'];

const mockRecentOrders = [
  { id: 'a1b2c3d4', customer_name: 'Rahul Sharma', status: 'preparing', total_amount: 549 },
  { id: 'e5f6g7h8', customer_name: 'Priya Patel', status: 'delivered', total_amount: 399 },
  { id: 'i9j0k1l2', customer_name: 'Amit Kumar', status: 'pending', total_amount: 749 },
  { id: 'm3n4o5p6', customer_name: 'Sneha Gupta', status: 'delivered', total_amount: 299 },
  { id: 'q7r8s9t0', customer_name: 'Vikram Singh', status: 'preparing', total_amount: 629 },
];

export default function OverviewPage() {
  const stats = { revenue: 42500, orders: 156, avgValue: 480, newUsers: 24 };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-neutral-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Today's Revenue</CardTitle>
            <IndianRupee className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{stats.revenue}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +14% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Total Orders</CardTitle>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.orders}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Avg. Order Value</CardTitle>
            <IndianRupee className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{stats.avgValue}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">New Users</CardTitle>
            <Users className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{stats.newUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#171717', border: 'none', color: '#fff' }} />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#171717', border: 'none', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs text-neutral-400 mt-[-20px]">
              {categoryData.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-neutral-300">
              <thead className="text-xs uppercase bg-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-6 py-3 rounded-tl-md">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 rounded-tr-md">Total</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                    <td className="px-6 py-4 font-mono text-orange-400">#{order.id.substring(0, 8)}</td>
                    <td className="px-6 py-4 font-medium text-white">{order.customer_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        'bg-neutral-500/20 text-neutral-400'}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">₹{order.total_amount}</td>
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
