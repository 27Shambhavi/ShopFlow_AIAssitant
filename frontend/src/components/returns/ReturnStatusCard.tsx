import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, DollarSign, Clock } from 'lucide-react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ReturnStatusCardProps {
  order: Order;
  onRequestReturn: (orderId: string) => void;
  isLoading?: boolean;
}

export const ReturnStatusCard: React.FC<ReturnStatusCardProps> = ({
  order,
  onRequestReturn,
  isLoading = false,
}) => {
  const isDelivered = order.status === 'Delivered';
  const hasRequestedReturn = order.return_status === 'Return Requested';
  const isRefunded = order.refund_status === 'Refunded';

  return (
    <div className="p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono font-bold text-brand-600 dark:text-brand-400">
            Order Return Inspection
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Order #{order.order_id}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {order.product_name} • Total: ₹{order.total_amount.toLocaleString('en-IN')}
          </p>
        </div>

        <div>
          {hasRequestedReturn ? (
            <Badge variant="warning" size="md">
              Return Requested
            </Badge>
          ) : isDelivered ? (
            <Badge variant="success" size="md">
              Return Eligible ✓
            </Badge>
          ) : (
            <Badge variant="danger" size="md">
              Not Return Eligible
            </Badge>
          )}
        </div>
      </div>

      {/* Return & Refund Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-slate-400 block font-medium">Return Status</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {order.return_status || 'Not Requested'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {hasRequestedReturn
                ? 'Item pickup will be scheduled by courier within 48h.'
                : 'Eligible for reverse pickup upon submitting request.'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-slate-400 block font-medium">Refund Status</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {order.refund_status || 'None'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {isRefunded
                ? 'Refund completed to original payment method.'
                : hasRequestedReturn
                ? 'Pending quality check upon fulfillment arrival.'
                : 'Will process automatically once return verified.'}
            </p>
          </div>
        </div>
      </div>

      {/* Warning if ineligible */}
      {!isDelivered && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Order is currently {order.status}.</strong> Returns can only be initiated for orders that have been successfully delivered to the customer.
          </div>
        </div>
      )}

      {/* Action CTA */}
      {isDelivered && !hasRequestedReturn && (
        <div className="pt-2 flex justify-end">
          <Button
            variant="glow"
            size="sm"
            isLoading={isLoading}
            onClick={() => onRequestReturn(order.order_id)}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Submit Return Request
          </Button>
        </div>
      )}
    </div>
  );
};
