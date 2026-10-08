import React, { useState } from 'react';
import { Bot, User, Copy, Check, RotateCcw, AlertCircle, ExternalLink } from 'lucide-react';
import { ChatMessage as ChatMessageType, Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: () => void;
  onPromptClick?: (prompt: string) => void;
  onBuyProduct?: (product: Product) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onRetry,
  onPromptClick,
  onBuyProduct,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    showToast('Copied to clipboard', 'info', 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format message text with line breaks and links
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Check if line mentions an order ID
      const orderMatch = line.match(/(ORD-[A-Za-z0-9_-]+)/g);

      return (
        <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
          {orderMatch ? (
            line.split(/(ORD-[A-Za-z0-9_-]+)/g).map((part, pIdx) => {
              if (part.startsWith('ORD-')) {
                return (
                  <Link
                    key={pIdx}
                    to={`/orders/${part}`}
                    className="inline-flex items-center gap-1 font-mono font-bold text-brand-600 dark:text-brand-400 hover:underline mx-1 px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800"
                  >
                    {part}
                    <ExternalLink className="w-3 h-3 inline" />
                  </Link>
                );
              }
              return part;
            })
          ) : (
            line
          )}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-3 w-full animate-slide-up group ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
          isUser
            ? 'bg-slate-800 dark:bg-slate-700 text-white'
            : message.isError
            ? 'bg-rose-600 text-white'
            : 'bg-gradient-to-tr from-brand-600 to-accent-cyan text-white shadow-glow-sm'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : message.isError ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Bubble Container */}
      <div
        className={`flex flex-col gap-2 max-w-[88%] sm:max-w-[78%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? 'bg-brand-600 text-white rounded-tr-sm selection:bg-white selection:text-brand-700'
              : message.isError
              ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 rounded-tl-sm'
              : 'bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder text-slate-800 dark:text-slate-100 rounded-tl-sm'
          }`}
        >
          {renderFormattedText(message.text)}

          {/* Copy and Actions toolbar on hover */}
          {isAssistant && !message.isError && (
            <div className="absolute right-2 -bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-lg p-0.5">
              <button
                onClick={handleCopy}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Copy message"
                aria-label="Copy message"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Retry button on error */}
        {message.isError && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retry request
          </button>
        )}

        {/* Structured Product Cards rendered inside chat */}
        {message.products && message.products.length > 0 && (
          <div className="w-full mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {message.products.map((prod) => (
              <ProductCard key={prod.id} product={prod} compact onBuy={onBuyProduct} />
            ))}
          </div>
        )}

        {/* Suggested Prompts / Follow-up chips */}
        {message.suggestedPrompts && message.suggestedPrompts.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {message.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onPromptClick && onPromptClick(prompt)}
                className="text-xs px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-400 px-1">{message.timestamp}</span>
      </div>
    </div>
  );
};
