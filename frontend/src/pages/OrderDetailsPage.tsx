import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Truck,
  RotateCcw,
  XCircle,
  User,
  Mail,
  Calendar,
  DollarSign,
  ShieldCheck,
  BotMessageSquare,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge';
import { OrderTimeline } from '../components/orders/OrderTimeline';
import { Button } from '../components/ui/Button';
import { CancelOrderModal } from '../components/orders/CancelOrderModal';
import { EmptyState } from '../components/ui/EmptyState';

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder } = useOrders();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className="py-12">
        <EmptyState
          title={`Order #${orderId || ''} not found`}
          description="We couldn't locate this order record in the ShopFlow database. Verify your order ID or search through your order history."
          actionText="Back to Orders"
          onAction={() => navigate('/orders')}
        />
      </div>
    );
  }

  const canCancel = order.status === 'Confirmed';
  const canReturn = order.status === 'Delivered' && order.return_status === 'Not Requested';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-8">
      {/* Back button */}
      <div>
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all orders
        </Link>
      </div>

      {/* Top Header Card */}
      <div className="p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
              {order.order_id}
            </h1>
            <OrderStatusBadge status={order.status} size="md" />
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Placed on {new Date(order.created_at).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCancelModalOpen(true)}
              leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
              className="text-xs text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-900/60"
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
                className="text-xs text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-900/60"
              >
                Return Item
              </Button>
            </Link>
          )}

          <Link to={`/app`}>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<BotMessageSquare className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              Ask AI about Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Visual Order Fulfillment Timeline */}
      <div className="p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
          Fulfillment Timeline
        </h3>
        <OrderTimeline status={order.status} />
      </div>

      {/* Grid: Order Items & Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Item Details (2 cols) */}
        <div className="md:col-span-2 p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Purchased Item
          </h3>

          <div className="flex items-start justify-between py-2">
            <div>
              <span className="font-mono text-xs text-brand-600 dark:text-brand-400 font-bold block">
                [{order.product_id}]
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {order.product_name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Quantity: {order.quantity} × ₹{order.unit_price.toLocaleString('en-IN')}
              </p>
            </div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{order.total_amount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-bold">
            <span className="text-slate-600 dark:text-slate-400">Total Billed</span>
            <span className="text-xl font-black text-brand-600 dark:text-brand-400">
              ₹{order.total_amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Customer & Delivery Info (1 col) */}
        <div className="p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Logistics &amp; Customer
          </h3>

          {/* Customer Record */}
          <div className="space-y-1.5 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Customer Details
            </span>
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {order.customer_name || 'Information unavailable'}
            </p>
            <p className="text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {order.customer_email || 'Information unavailable'}
            </p>
          </div>

          {/* Delivery & Tracking */}
          <div className="space-y-1.5 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Shipment Information
            </span>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tracking ID:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {order.tracking_id || 'Information unavailable'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {order.estimated_delivery || 'Information unavailable'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Delivery Status:</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">
                {order.delivery_status || 'Information unavailable'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CancelOrderModal
        orderId={order.order_id}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
};
