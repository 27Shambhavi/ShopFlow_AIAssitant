import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  BotMessageSquare,
  Search,
  Package,
  RotateCcw,
  LifeBuoy,
  XCircle,
  PlusCircle,
  RotateCw,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { Sidebar } from '../components/navigation/Sidebar';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatMessage as ChatMessageType, Product } from '../types';
import {
  sendChatMessage,
  getOrCreateSessionId,
  resetSessionId,
  extractStructuredContent,
} from '../services/n8nService';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const AssistantPage: React.FC = () => {
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>(() => {
    return [
      {
        id: 'msg_welcome',
        sender: 'assistant',
        text: "Hi! I'm your ShopFlow AI assistant.\nWhat would you like to do today?",
        timestamp: 'Just now',
        suggestedPrompts: [
          'Find wireless headphones under ₹3000',
          'Track order ORD-984210',
          'Cancel an order',
          'Request a return or refund',
          'Connect with support team',
        ],
      },
    ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => getOrCreateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessageType = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text, sessionId);
      const structured = extractStructuredContent(response.message);

      const assistantMsg: ChatMessageType = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'assistant',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: response.products || structured.products,
        suggestedPrompts: getSuggestedFollowUps(text),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'ShopFlow is temporarily unavailable. Please try again.';

      const errorMsg: ChatMessageType = {
        id: 'msg_' + (Date.now() + 1),
        sender: 'assistant',
        text: errorMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMsg]);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestedFollowUps = (input: string): string[] => {
    const lower = input.toLowerCase();
    if (lower.includes('headphone') || lower.includes('product') || lower.includes('find')) {
      return ['Show smart watches', 'Filter products under ₹2000', 'Check stock of P101'];
    }
    if (lower.includes('track') || lower.includes('order')) {
      return ['When will it arrive?', 'View tracking milestones', 'Cancel this order'];
    }
    if (lower.includes('cancel')) {
      return ['Confirm order cancellation', 'Will stock be restored?', 'Show my other orders'];
    }
    if (lower.includes('return') || lower.includes('refund')) {
      return ['Check refund timeline', 'What is the return policy?', 'Talk to an agent'];
    }
    return ['Find products', 'Track order ORD-984210', 'Help with returns'];
  };

  const handleNewChat = () => {
    const newSession = resetSessionId();
    setSessionId(newSession);
    setMessages([
      {
        id: 'msg_' + Date.now(),
        sender: 'assistant',
        text: "Hi! I'm your ShopFlow AI assistant.\nWhat would you like to do today?",
        timestamp: 'Just now',
        suggestedPrompts: [
          'Find wireless headphones under ₹3000',
          'Track order ORD-984210',
          'Cancel an order',
          'Request a return or refund',
          'Connect with support team',
        ],
      },
    ]);
    showToast('New conversation initialized.', 'info', 2000);
  };

  const handleRetryLast = () => {
    // Find last user message
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUser) {
      handleSendMessage(lastUser.text);
    }
  };

  const handleQuickAction = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const quickActions = [
    { label: 'Find Products', prompt: 'Show recommended products with prices and stock', icon: Search },
    { label: 'Track My Order', prompt: 'Track order ORD-984210', icon: Package },
    { label: 'Cancel an Order', prompt: 'I want to cancel order ORD-984210', icon: XCircle },
    { label: 'Request a Return', prompt: 'I would like to return order ORD-981055', icon: RotateCcw },
    { label: 'Get Support', prompt: 'I need human support for an issue with my recent delivery', icon: LifeBuoy },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Desktop Left Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar
          onNewChat={handleNewChat}
          onSelectRecentChat={(prompt) => handleSendMessage(prompt)}
        />
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-surface-dark overflow-hidden transition-colors">
        {/* Chat Top Header */}
        <header className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border-b border-slate-200/90 dark:border-surface-darkBorder flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-cyan flex items-center justify-center text-white shadow-glow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">ShopFlow AI</h2>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 status-online" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Your intelligent shopping &amp; automation assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Reset conversation session"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Chat</span>
            </button>
          </div>
        </header>

        {/* Chat Messages Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Welcome Card if only welcome message exists */}
          {messages.length === 1 && (
            <div className="max-w-2xl mx-auto py-6 space-y-6 animate-fade-in text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan text-white flex items-center justify-center mx-auto shadow-glow-md">
                <BotMessageSquare className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Welcome to ShopFlow AI
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Ask me to search our catalog, buy items, track shipments in real time, or manage returns without filling endless forms.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-500" />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversation history */}
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onRetry={handleRetryLast}
              onPromptClick={(p) => handleSendMessage(p)}
            />
          ))}

          {/* Typing Indicator */}
          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Dock Area */}
        <div className="p-4 sm:p-6 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border-t border-slate-200/90 dark:border-surface-darkBorder shrink-0">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
