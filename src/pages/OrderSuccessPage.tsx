import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="container mx-auto px-4 py-32 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-center relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-500/10 blur-[50px] pointer-events-none" />
        
        <CardContent className="pt-12 pb-8 px-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">Order Confirmed!</h1>
          <p className="text-neutral-400 mb-6">
            Your delicious meal is being prepared. It should arrive in about 18 minutes.
          </p>
          
          {orderId && (
            <div className="bg-neutral-800 rounded-md p-4 w-full mb-8">
              <p className="text-sm text-neutral-400 mb-1">Order ID</p>
              <p className="font-mono text-lg text-orange-400 font-bold">#{orderId.split('-')[0].toUpperCase()}</p>
            </div>
          )}

          <div className="w-full space-y-3">
            <Button 
              onClick={() => navigate('/track')} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-transform hover:scale-[1.03]"
            >
              Track Your Order
            </Button>
            <Button 
              onClick={() => navigate('/menu')} 
              variant="outline" 
              className="w-full border-neutral-700 hover:bg-neutral-800 transition-transform hover:scale-[1.03]"
            >
              Back to Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
