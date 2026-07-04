import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    let query = (supabase.from('reservations') as any).select('*').order('date', { ascending: true });
    
    if (dateFilter) {
      query = query.eq('date', dateFilter);
    }

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to fetch reservations');
    } else {
      setReservations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, [dateFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await (supabase.from('reservations') as any).update({ status: newStatus }).eq('id', id);
    if (!error) {
      toast.success(`Reservation ${newStatus}`);
      fetchReservations();
    } else {
      toast.error('Failed to update status');
    }
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
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-neutral-400">Loading...</td></tr>
                ) : reservations.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-neutral-400">No reservations found.</td></tr>
                ) : reservations.map((res) => (
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
