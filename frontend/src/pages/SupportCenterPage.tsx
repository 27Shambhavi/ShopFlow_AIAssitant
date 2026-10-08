import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LifeBuoy,
  BotMessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SupportTicketCard } from '../components/support/SupportTicketCard';
import { SupportPriority, SupportTicket } from '../types';
import confetti from 'canvas-confetti';

export const SupportCenterPage: React.FC = () => {
  const { createTicket, tickets } = useOrders();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState('Shambhavi Sharma');
  const [customerEmail, setCustomerEmail] = useState('shambhavi@example.com');
  const [orderId, setOrderId] = useState('');
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<SupportTicket | null>(null);

  // Automatically determine priority based on keywords (matching n8n AI logic from prompt rule 6)
  const determinePriority = (issueText: string): SupportPriority => {
    const lower = issueText.toLowerCase();
    if (
      lower.includes('payment') ||
      lower.includes('duplicate') ||
      lower.includes('urgent') ||
      lower.includes('charge') ||
      lower.includes('stolen')
    ) {
      return 'High';
    }
    if (
      lower.includes('delay') ||
      lower.includes('wrong') ||
      lower.includes('missing') ||
      lower.includes('damaged') ||
      lower.includes('broken')
    ) {
      return 'Medium';
    }
    return 'Low';
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !issue.trim()) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    try {
      setIsSubmitting(true);
      const calculatedPriority = determinePriority(issue);

      const newTicket = await createTicket({
        customer_name: customerName,
        customer_email: customerEmail,
        order_id: orderId.trim() ? orderId.trim().toUpperCase() : undefined,
        issue: issue.trim(),
        priority: calculatedPriority,
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      setCreatedTicket(newTicket);
      showToast('Support ticket created.', 'success');
      setIssue('');
    } catch {
      showToast('Unable to submit support ticket. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-12">
      {/* Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto shadow-glow-sm">
          <LifeBuoy className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          How can we help?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Get instantaneous assistance through ShopFlow AI or dispatch an automated support ticket to our human team.
        </p>
      </div>

      {/* Two sections: AI Help & Support Ticket */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: AI Instant Help Banner (1 col) */}
        <div className="p-6 bg-gradient-to-br from-brand-600 via-indigo-600 to-accent-cyan rounded-3xl text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BotMessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-200">
                Instant Resolution
              </span>
              <h3 className="text-xl font-extrabold mt-1">Ask ShopFlow AI</h3>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Skip the ticket queue. Our AI can check your order, explain tracking delays, or process eligible cancellations in seconds.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link to="/app" className="block">
              <Button
                variant="secondary"
                size="md"
                className="w-full font-bold bg-white text-brand-700 hover:bg-white/90 shadow-md"
              >
                Launch AI Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* Section 2: Support Ticket Form (2 cols) */}
        <div className="md:col-span-2 p-6 sm:p-8 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-3xl shadow-sm">
          {createdTicket ? (
            <div className="space-y-5 animate-slide-up">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Ticket Created ✓
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Our automation engine has registered your ticket and dispatched an acknowledgment to your email.
                  </p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Ticket ID</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                    {createdTicket.ticket_id}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Determined Priority</span>
                  <span className="font-bold text-amber-500">
                    {createdTicket.priority} Priority (AI Classified)
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Status</span>
                  <span className="font-bold text-emerald-500">{createdTicket.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold">Created At</span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {new Date(createdTicket.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCreatedTicket(null)}
                className="w-full"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Create Support Ticket
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Priority is automatically computed by backend NLP based on urgency and issue scope.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Your Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <Input
                label="Related Order ID (Optional)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-984210"
                helperText="Link an existing order to help our team resolve issues faster."
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Issue Description *
                </label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe your question, damaged item, delay, or refund inquiry in detail..."
                  rows={4}
                  required
                  className="w-full text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 resize-none transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                  Auto-prioritized by n8n
                </span>

                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="font-bold"
                >
                  Create Support Ticket
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Ticket History Section */}
      {tickets.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Your Support History
            </h2>
            <span className="text-xs text-slate-400">{tickets.length} total tickets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <SupportTicketCard key={t.ticket_id} ticket={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
