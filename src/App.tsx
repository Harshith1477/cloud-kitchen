import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthCallback from "./pages/AuthCallback";
import ReservationsPage from "./pages/ReservationsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import AdminLayout from "./pages/admin/AdminLayout";
import OverviewPage from "./pages/admin/OverviewPage";
import OrdersPage from "./pages/admin/OrdersPage";
import MenuManagerPage from "./pages/admin/MenuManagerPage";
import CustomersPage from "./pages/admin/CustomersPage";
import AdminReservationsPage from "./pages/admin/ReservationsPage";

import { useAuthStore } from "./store/authStore";

const queryClient = new QueryClient();

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(0 0% 8%)',
            border: '1px solid hsl(0 0% 18%)',
            color: 'hsl(0 0% 100%)',
          },
        }}
      />
      <BrowserRouter>
        <AuthInitializer>
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="menu" element={<MenuManagerPage />} />
              <Route path="reservations" element={<AdminReservationsPage />} />
              <Route path="customers" element={<CustomersPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthInitializer>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
