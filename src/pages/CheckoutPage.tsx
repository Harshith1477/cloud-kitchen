import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  if (items.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/menu')} className="bg-orange-500 hover:bg-orange-600">
          Return to Menu
        </Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
        throw new Error("Please fill in all delivery details");
      }

      // We'll also try to get the current user, or allow anonymous if no user exists.
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id || null;

      const orderPayload = {
        user_id: userId,
        customer_name: formData.name,
        customer_phone: formData.phone,
        delivery_address: `${formData.address}, ${formData.pincode}`,
        payment_method: formData.paymentMethod,
        total_amount: total(),
        status: 'pending',
        items: items, // Save items as JSON
      };

      const { data, error } = await (supabase.from('orders') as any).insert([orderPayload]).select();
      
      if (error) throw error;
      
      const orderId = data[0].id;
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-success?id=${orderId}`);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-neutral-100">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-neutral-100">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={placeOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" name="name" 
                    value={formData.name} onChange={handleInputChange} 
                    className="bg-neutral-800 border-neutral-700" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" name="phone" 
                    value={formData.phone} onChange={handleInputChange} 
                    className="bg-neutral-800 border-neutral-700" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" name="address" 
                    value={formData.address} onChange={handleInputChange} 
                    className="bg-neutral-800 border-neutral-700" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input 
                    id="pincode" name="pincode" 
                    value={formData.pincode} onChange={handleInputChange} 
                    className="bg-neutral-800 border-neutral-700" 
                    required 
                  />
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium text-neutral-200 mb-4">Payment Method</h3>
                  <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentChange} className="space-y-3">
                    <div className="flex items-center space-x-3 bg-neutral-800 p-3 rounded-md border border-neutral-700">
                      <RadioGroupItem value="cod" id="cod" className="border-orange-500 text-orange-500" />
                      <Label htmlFor="cod" className="cursor-pointer flex-1">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-neutral-800 p-3 rounded-md border border-neutral-700 opacity-50">
                      <RadioGroupItem value="online" id="online" disabled className="border-orange-500" />
                      <Label htmlFor="online" className="cursor-not-allowed">Online Payment (Coming Soon)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-lg transition-transform hover:scale-[1.03]"
                >
                  {loading ? 'Processing...' : `Place Order • ₹${total()}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-neutral-100">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-neutral-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-200">{item.name}</p>
                        <p className="text-sm text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-neutral-200">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 text-xl font-bold text-neutral-100">
                  <span>Total</span>
                  <span className="text-orange-500">₹{total()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
