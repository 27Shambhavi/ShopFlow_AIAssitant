import React from 'react';
import { LifeBuoy, Clock, AlertCircle } from 'lucide-react';
import { SupportTicket } from '../../types';
import { Badge } from '../ui/Badge';

interface SupportTicketCardProps {
  ticket: SupportTicket;
}

export const SupportTicketCard: React.FC<SupportTicketCardProps> = ({ ticket }) => {
  const priorityVariant =
    ticket.priority === 'High' ? 'danger' : ticket.priority === 'Medium' ? 'warning' : 'info';

  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl flex flex-col gap-3 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
              {ticket.ticket_id}
            </span>
            {ticket.order_id && (
              <p className="text-[10px] text-slate-400 font-mono">Ref: {ticket.order_id}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge variant={priorityVariant} size="sm">
            {ticket.priority} Priority
          </Badge>
          <Badge variant="purple" size="sm" dot>
            {ticket.status}
          </Badge>
        </div>
      </div>

      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
        "{ticket.issue}"
      </p>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <span>Requester: {ticket.customer_name}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(ticket.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
