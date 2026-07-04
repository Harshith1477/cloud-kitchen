import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';

export default function MenuManagerPage() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    const { data } = await (supabase.from('menu_items') as any).select('*').order('category');
    if (data) setMenuItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    const { error } = await (supabase.from('menu_items') as any).update({ is_available: !currentStatus }).eq('id', id);
    if (!error) {
      toast.success('Availability updated');
      fetchMenu();
    } else {
      toast.error('Update failed');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await (supabase.from('menu_items') as any).delete().eq('id', id);
    if (!error) {
      toast.success('Item deleted');
      fetchMenu();
    } else {
      toast.error('Deletion failed');
    }
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as string,
      image_url: formData.get('image_url') as string,
      prep_time: formData.get('prep_time') as string,
      is_veg: formData.get('is_veg') === 'true',
      is_available: true,
    };

    const { error } = await (supabase.from('menu_items') as any).insert([newItem]);
    if (!error) {
      toast.success('Item added successfully');
      setIsDialogOpen(false);
      fetchMenu();
    } else {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Menu Manager</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2 font-semibold">
              <Plus className="w-5 h-5" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input name="name" required className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input name="price" type="number" required className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input name="category" required placeholder="Burgers, Wraps, etc." className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Prep Time</Label>
                  <Input name="prep_time" placeholder="e.g. 15 mins" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Input name="description" required className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Image URL</Label>
                  <Input name="image_url" placeholder="https://..." className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2 flex items-center gap-4">
                  <Label className="mt-2">Dietary:</Label>
                  <select name="is_veg" className="bg-neutral-800 border-neutral-700 p-2 rounded text-sm mt-1 w-full text-white">
                    <option value="true">Veg</option>
                    <option value="false">Non-Veg</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 mt-6">
                Save Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 text-white overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-neutral-800 text-neutral-400">
              <tr>
                <th className="px-6 py-4 w-12 text-center">Img</th>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Available</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-neutral-400">Loading directory...</td></tr>
              ) : menuItems.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-neutral-400">No menu items found.</td></tr>
              ) : menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/50">
                  <td className="px-6 py-3">
                    <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-md object-cover bg-neutral-800" />
                  </td>
                  <td className="px-6 py-3">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-neutral-400 truncate max-w-[200px]">{item.description}</div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="bg-neutral-800 px-2 py-1 rounded text-xs">{item.category}</span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-orange-500">
                    ₹{item.price}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <Switch 
                      checked={item.is_available} 
                      onCheckedChange={() => toggleAvailability(item.id, item.is_available)} 
                    />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" onClick={() => toast("Edit functionality coming soon")}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="text-red-400 hover:bg-red-500/20 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
