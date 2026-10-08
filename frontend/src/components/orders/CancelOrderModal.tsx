import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface CancelOrderModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  orderId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { cancelOrder, getOrder } = useOrders();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!orderId) return null;
  const order = getOrder(orderId);

  const handleConfirmCancel = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const res = await cancelOrder(orderId);
      setResult(res);
      if (res.success) {
        showToast('Order cancelled.', 'info');
        if (onSuccess) onSuccess();
      } else {
        showToast(res.message, 'error');
      }
    } catch {
      setResult({
        success: false,
        message: 'Unable to cancel this order. Please try again or ask AI Support.',
      });
      showToast('Unable to cancel this order.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={result?.success ? 'Order Cancelled' : 'Cancel this order?'}
      description={
        result?.success
          ? `Order #${orderId}`
          : 'This action will cancel your order and restore the product stock if the order is eligible.'
      }
    >
      <div className="flex flex-col gap-4">
        {result ? (
          result.success ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-scale-in" />
              <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                Order Cancelled ✓
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                Product stock has been restored.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center flex flex-col items-center gap-2">
              <XCircle className="w-10 h-10 text-rose-500" />
              <h4 className="text-base font-bold text-rose-900 dark:text-rose-200">
                Unable to cancel this order
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300">{result.message}</p>
            </div>
          )
        ) : (
          <>
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                Orders can only be cancelled while in <strong>Confirmed</strong> status. Once shipped, a return request must be opened instead.
              </div>
            </div>

            {order && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{order.product_name}</span>
                  <p className="text-slate-500">Qty: {order.quantity} • Total: ₹{order.total_amount.toLocaleString('en-IN')}</p>
                </div>
                <span className="font-mono text-slate-500">{order.order_id}</span>
              </div>
            )}
          </>
        )}

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          {result?.success ? (
            <Button size="sm" onClick={handleClose}>
              Done
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleClose} disabled={isLoading}>
                Keep Order
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isLoading}
                onClick={handleConfirmCancel}
              >
                {isLoading ? 'Cancelling order...' : 'Cancel Order'}
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
