import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Search, Truck, ArrowRight, BotMessageSquare, AlertCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { TrackingCard } from '../components/tracking/TrackingCard';
import { Button } from '../components/ui/Button';
import { Order } from '../types';

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder, orders } = useOrders();

  const [inputOrderId, setInputOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Check URL query param on mount or update
  useEffect(() => {
    const paramId = searchParams.get('orderId');
    if (paramId) {
      setInputOrderId(paramId);
      performTrack(paramId);
    }
  }, [searchParams]);

  const performTrack = (id: string) => {
    if (!id.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const found = getOrder(id.trim());
      setCurrentOrder(found || null);
      setIsLoading(false);
    }, 600);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    setSearchParams({ orderId: inputOrderId.trim() });
    performTrack(inputOrderId.trim());
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Hero */}
      <div className="text-center space-y-3 pt-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto shadow-glow-sm">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Track your order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Enter your order ID (e.g. <code>ORD-984210</code>) to verify real-time transit status and estimated delivery dates.
        </p>
      </div>

      {/* Tracking Input Card */}
      <form
        onSubmit={handleTrackSubmit}
        className="p-3 sm:p-4 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-lg dark:shadow-brand-950/20 flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative w-full">
          <Package className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            placeholder="Enter your Order ID (e.g. ORD-984210)"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono uppercase text-slate-900 dark:text-slate-100 placeholder:text-slate-400 placeholder:font-sans placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>

        <Button
          type="submit"
          variant="glow"
          size="md"
          isLoading={isLoading}
          disabled={!inputOrderId.trim()}
          className="w-full sm:w-auto shrink-0 font-bold px-6 py-3"
        >
          Track Order
        </Button>
      </form>

      {/* Suggested Quick Order IDs */}
      {orders.length > 0 && !hasSearched && (
        <div className="text-center space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick click from your recent orders:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.order_id}
                onClick={() => {
                  setInputOrderId(o.order_id);
                  performTrack(o.order_id);
                }}
                className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {o.order_id} ({o.status})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {isLoading ? (
        <div className="p-8 bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-500/20 border-t-brand-600 rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium animate-pulse">
            Connecting to logistics carrier network...
          </p>
        </div>
      ) : hasSearched && currentOrder ? (
        <div className="space-y-4">
          <TrackingCard order={currentOrder} />
          <div className="text-center pt-2">
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <BotMessageSquare className="w-3.5 h-3.5" />
              Need to change delivery address or reschedule? Ask ShopFlow AI
            </Link>
          </div>
        </div>
      ) : hasSearched && !currentOrder ? (
        <div className="p-8 bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-2xl text-center flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Order Not Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            We couldn't locate Order #{inputOrderId}. Please verify the spelling or check your orders dashboard.
          </p>
          <Link to="/orders">
            <Button variant="outline" size="sm" className="mt-2">
              View All Orders
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
