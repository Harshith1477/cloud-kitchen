import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const initialReservations = [
  { id: 'res-001', name: 'Rahul Sharma', phone: '+91 98765 43210', date: '2026-07-05', time: '7:00 PM', guests: 4, status: 'pending' },
  { id: 'res-002', name: 'Priya Patel', phone: '+91 87654 32109', date: '2026-07-05', time: '8:30 PM', guests: 2, status: 'confirmed' },
  { id: 'res-003', name: 'Amit Kumar', phone: '+91 76543 21098', date: '2026-07-06', time: '12:00 PM', guests: 6, status: 'pending' },
  { id: 'res-004', name: 'Sneha Gupta', phone: '+91 65432 10987', date: '2026-07-06', time: '1:30 PM', guests: 3, status: 'cancelled' },
  { id: 'res-005', name: 'Vikram Singh', phone: '+91 54321 09876', date: '2026-07-07', time: '7:30 PM', guests: 8, status: 'pending' },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [dateFilter, setDateFilter] = useState('');

  const filtered = reservations.filter((res) => {
    if (dateFilter && res.date !== dateFilter) return false;
    return true;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success(`Reservation ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col flex-wrap gap-4 md:flex-row justify-between items-start md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reservations</h2>
        
        <div className="flex items-center gap-4">
          <Input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-auto bg-neutral-900 border-neutral-800 focus-visible:ring-orange-500"
          />
          {dateFilter && (
            <Button variant="ghost" onClick={() => setDateFilter('')} className="text-neutral-400 hover:text-white">
              Clear
            </Button>
          )}
        </div>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 text-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-6 py-4">Name / Phone</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4 text-center">Guests</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-neutral-400">No reservations found.</td></tr>
                ) : filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{res.name}</div>
                      <div className="text-xs text-neutral-400">{res.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{res.date}</div>
                      <div className="text-xs text-neutral-400">{res.time}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-lg">
                      {res.guests}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        res.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-orange-500/20 text-orange-400'}`}>
                        {res.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {res.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" onClick={() => updateStatus(res.id, 'confirmed')} className="bg-green-600 hover:bg-green-700 h-8">
                            Confirm
                          </Button>
                          <Button size="sm" onClick={() => updateStatus(res.id, 'cancelled')} variant="destructive" className="h-8">
                            Cancel
                          </Button>
                        </div>
                      )}
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
