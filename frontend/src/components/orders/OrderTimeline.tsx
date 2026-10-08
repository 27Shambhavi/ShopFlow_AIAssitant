import React from 'react';
import { Check, Clock, XCircle, Truck, Package, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '../../types';

interface OrderTimelineProps {
  status: OrderStatus;
  cancelled?: boolean;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status, cancelled = false }) => {
  if (status === 'Cancelled' || cancelled) {
    return (
      <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3">
        <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">Order Cancelled</h4>
          <p className="text-xs text-rose-700/80 dark:text-rose-300/80 mt-0.5">
            This order was cancelled prior to shipment. Reserved inventory stock has been restored.
          </p>
        </div>
      </div>
    );
  }

  const stages: { label: string; statusMatch: OrderStatus[]; icon: React.ElementType }[] = [
    { label: 'Order Placed', statusMatch: ['Confirmed', 'Processing', 'Shipped', 'Delivered'], icon: Clock },
    { label: 'Confirmed', statusMatch: ['Confirmed', 'Processing', 'Shipped', 'Delivered'], icon: CheckCircle2 },
    { label: 'Processing', statusMatch: ['Processing', 'Shipped', 'Delivered'], icon: Package },
    { label: 'Shipped', statusMatch: ['Shipped', 'Delivered'], icon: Truck },
    { label: 'Delivered', statusMatch: ['Delivered'], icon: Check },
  ];

  const getStageState = (stageMatch: OrderStatus[], index: number) => {
    // Current active index
    const statusPriority: Record<OrderStatus, number> = {
      Confirmed: 1,
      Processing: 2,
      Shipped: 3,
      Delivered: 4,
      Cancelled: -1,
    };

    const currentPriority = statusPriority[status] ?? 0;
    const isCompleted = index <= currentPriority;
    const isCurrent = index === currentPriority;

    return { isCompleted, isCurrent };
  };

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting progress track line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
        
        {stages.map((stage, idx) => {
          const { isCompleted, isCurrent } = getStageState(stage.statusMatch, idx);
          const Icon = stage.icon;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-brand-600 text-white shadow-glow-sm'
                    : 'bg-white dark:bg-surface-darkCard border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                } ${isCurrent ? 'ring-4 ring-brand-500/20 ring-offset-2 dark:ring-offset-slate-900 scale-110' : ''}`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 text-center transition-colors ${
                  isCompleted
                    ? 'text-slate-900 dark:text-slate-100 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
