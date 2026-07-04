import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const mockCustomers = [
  { id: 'usr-001', email: 'rahul.sharma@email.com', role: 'customer', orderCount: 12, totalSpent: 5480 },
  { id: 'usr-002', email: 'priya.patel@email.com', role: 'customer', orderCount: 8, totalSpent: 3290 },
  { id: 'usr-003', email: 'amit.kumar@email.com', role: 'customer', orderCount: 23, totalSpent: 11200 },
  { id: 'usr-004', email: 'sneha.gupta@email.com', role: 'admin', orderCount: 5, totalSpent: 2150 },
  { id: 'usr-005', email: 'vikram.singh@email.com', role: 'customer', orderCount: 15, totalSpent: 7600 },
  { id: 'usr-006', email: 'ananya.reddy@email.com', role: 'customer', orderCount: 3, totalSpent: 990 },
];

export default function CustomersPage() {
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
                {mockCustomers.map((user) => (
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
