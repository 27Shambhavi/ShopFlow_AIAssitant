import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { RotateCcw, Search, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { ReturnStatusCard } from '../components/returns/ReturnStatusCard';
import { Order } from '../types';

export const ReturnsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder, requestReturn, orders } = useOrders();
  const { showToast } = useToast();

  const [inputOrderId, setInputOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingReturn, setIsProcessingReturn] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const paramId = searchParams.get('orderId');
    if (paramId) {
      setInputOrderId(paramId);
      handleCheckOrder(paramId);
    }
  }, [searchParams]);

  const handleCheckOrder = (id: string) => {
    if (!id.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const order = getOrder(id.trim());
      setCurrentOrder(order || null);
      setIsLoading(false);
    }, 500);
  };

  const handleSubmitCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    setSearchParams({ orderId: inputOrderId.trim() });
    handleCheckOrder(inputOrderId.trim());
  };

  const handleExecuteReturn = async (orderId: string) => {
    try {
      setIsProcessingReturn(true);
      const res = await requestReturn(orderId);
      if (res.eligible) {
        showToast('Return request created successfully.', 'success');
        // Refresh local order display
        const updated = getOrder(orderId);
        if (updated) setCurrentOrder(updated);
      } else {
        showToast(res.message || 'Order ineligible for return.', 'warning');
      }
    } catch {
      showToast('Unable to process return. Please try again.', 'error');
    } finally {
      setIsProcessingReturn(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-glow-sm">
          <RotateCcw className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Returns &amp; Refunds
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Manage your return requests and track refund status. All items delivered within the last 7 days are eligible for hassle-free reverse pickup.
        </p>
      </div>

      {/* Order Check Form */}
      <form
        onSubmit={handleSubmitCheck}
        className="p-3 sm:p-4 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-lg dark:shadow-brand-950/20 flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            placeholder="Enter Order ID to inspect (e.g. ORD-981055)"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono uppercase text-slate-900 dark:text-slate-100 placeholder:text-slate-400 placeholder:font-sans placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
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
          Check Order
        </Button>
      </form>

      {/* Suggested Delivered Orders if none searched */}
      {orders.length > 0 && !hasSearched && (
        <div className="text-center space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Sample orders from your history:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {orders.map((o) => (
              <button
                key={o.order_id}
                onClick={() => {
                  setInputOrderId(o.order_id);
                  handleCheckOrder(o.order_id);
                }}
                className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {o.order_id} ({o.status})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results view */}
      {isLoading ? (
        <div className="p-8 bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-500/20 border-t-amber-600 rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Checking order return eligibility...</p>
        </div>
      ) : hasSearched && currentOrder ? (
        <ReturnStatusCard
          order={currentOrder}
          onRequestReturn={handleExecuteReturn}
          isLoading={isProcessingReturn}
        />
      ) : hasSearched && !currentOrder ? (
        <div className="p-8 bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-2xl text-center flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Order Not Found</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            We could not find an order with ID #{inputOrderId}. Please verify the order ID.
          </p>
        </div>
      ) : null}

      {/* Return Policy Clarifications */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> ShopFlow Return Policy Guidelines
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 list-disc pl-4 leading-relaxed">
          <li>Orders must be in <strong>Delivered</strong> status to initiate a return request.</li>
          <li>For orders in <strong>Confirmed</strong> status that haven't shipped, use one-click cancellation instead.</li>
          <li>Refunds are credited to the original payment source within 3-5 business days following courier pickup and inspection.</li>
        </ul>
      </div>
    </div>
  );
};
