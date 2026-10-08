import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Truck, RotateCcw, XCircle, Package } from 'lucide-react';
import { Order } from '../../types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Button } from '../ui/Button';
import { CancelOrderModal } from './CancelOrderModal';

interface OrderCardProps {
  order: Order;
  onSelectForReturn?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onSelectForReturn }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const canCancel = order.status === 'Confirmed';
  const canReturn = order.status === 'Delivered' && order.return_status === 'Not Requested';

  return (
    <>
      <div className="bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-100 dark:border-brand-900/50">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {order.order_id}
                </span>
                <OrderStatusBadge status={order.status} size="sm" />
              </div>
              <span className="text-xs text-slate-400">
                Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Total Amount</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              ₹{order.total_amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Product row & details */}
        <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              {order.product_name}
            </span>
            <p className="text-slate-500 mt-0.5">
              Qty: {order.quantity} • Unit Price: ₹{order.unit_price.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-slate-400">Delivery Status:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {order.delivery_status || 'Processing'}
              {order.estimated_delivery && ` • Est: ${order.estimated_delivery}`}
            </span>
            {order.tracking_id && (
              <span className="font-mono text-[11px] text-brand-600 dark:text-brand-400 mt-0.5">
                Tracking: {order.tracking_id}
              </span>
            )}
            {order.return_status && order.return_status !== 'Not Requested' && (
              <span className="text-[11px] font-semibold text-amber-500 mt-0.5">
                Return: {order.return_status} ({order.refund_status})
              </span>
            )}
          </div>
        </div>

        {/* Action buttons (only what makes sense for current status) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-2">
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCancelModalOpen(true)}
              leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
              className="text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              Cancel Order
            </Button>
          )}

          {canReturn && (
            <Link to={`/returns?orderId=${order.order_id}`}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5 text-amber-500" />}
                className="text-xs text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              >
                Request Return
              </Button>
            </Link>
          )}

          {order.status !== 'Cancelled' && (
            <Link to={`/track?orderId=${order.order_id}`}>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Truck className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Track
              </Button>
            </Link>
          )}

          <Link to={`/orders/${order.order_id}`}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>

      <CancelOrderModal
        orderId={order.order_id}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};
