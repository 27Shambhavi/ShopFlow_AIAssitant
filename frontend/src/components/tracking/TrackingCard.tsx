import React from 'react';
import { Truck, Package, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { Order } from '../../types';
import { OrderStatusBadge } from '../orders/OrderStatusBadge';
import { Badge } from '../ui/Badge';

interface TrackingCardProps {
  order: Order;
}

export const TrackingCard: React.FC<TrackingCardProps> = ({ order }) => {
  const steps = [
    {
      title: 'Order Confirmed',
      description: 'Order placed & inventory assigned',
      done: true,
      active: order.status === 'Confirmed',
      date: new Date(order.created_at).toLocaleDateString(),
    },
    {
      title: 'Processing in Fulfillment Center',
      description: 'Item inspected, packed, and packaged',
      done: ['Processing', 'Shipped', 'Delivered'].includes(order.status),
      active: order.status === 'Processing',
      date: order.status !== 'Confirmed' ? 'Oct 08, 2026' : undefined,
    },
    {
      title: 'Dispatched & In Transit',
      description: 'Handed over to carrier network',
      done: ['Shipped', 'Delivered'].includes(order.status),
      active: order.status === 'Shipped',
      date: order.status === 'Shipped' || order.status === 'Delivered' ? 'Oct 09, 2026' : undefined,
    },
    {
      title: 'Delivered',
      description: 'Package delivered to recipient address',
      done: order.status === 'Delivered',
      active: order.status === 'Delivered',
      date: order.status === 'Delivered' ? order.estimated_delivery : undefined,
    },
  ];

  return (
    <div className="bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono font-bold text-brand-600 dark:text-brand-400">
            Logistics Verification
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Order #{order.order_id}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Product: <strong className="text-slate-800 dark:text-slate-200">{order.product_name}</strong> (Qty: {order.quantity})
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          <OrderStatusBadge status={order.status} />
          {order.tracking_id && (
            <div className="flex items-center gap-1.5 mt-1 font-mono text-xs text-slate-500">
              <Truck className="w-3.5 h-3.5 text-brand-500" />
              <span>Tracking ID: <strong>{order.tracking_id}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-400 block">Total Amount</span>
          <span className="font-bold text-slate-900 dark:text-white text-sm">
            ₹{order.total_amount.toLocaleString('en-IN')}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Delivery Status</span>
          <span className="font-semibold text-brand-600 dark:text-brand-400 text-sm">
            {order.delivery_status || 'In Transit'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Estimated Arrival</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            {order.estimated_delivery || 'Information unavailable'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Carrier</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-500" /> ShopFlow Express
          </span>
        </div>
      </div>

      {/* Detailed Vertical Tracking Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3.5 sm:before:left-4.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Step node icon */}
            <div
              className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                step.done
                  ? 'bg-brand-600 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-surface-darkCard border-2 border-slate-300 dark:border-slate-700 text-slate-400'
              } ${step.active ? 'ring-4 ring-brand-500/20' : ''}`}
            >
              {step.done ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-sm font-bold ${
                    step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.title}
                </h4>
                {step.date && (
                  <span className="text-xs font-mono text-slate-400">{step.date}</span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
