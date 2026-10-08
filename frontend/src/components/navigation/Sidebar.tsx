import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BotMessageSquare,
  Compass,
  ShoppingBag,
  Package,
  LifeBuoy,
  RotateCcw,
  PlusCircle,
  Sun,
  Moon,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

interface SidebarProps {
  onNewChat?: () => void;
  recentChats?: string[];
  onSelectRecentChat?: (chatPrompt: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  recentChats = [
    'Find wireless headphones under ₹3000',
    'Track Order #ORD-984210',
    'Mechanical keyboard compatibility',
  ],
  onSelectRecentChat,
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { label: 'AI Assistant', path: '/app', icon: BotMessageSquare },
    { label: 'Products', path: '/products', icon: Compass },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Track Order', path: '/track', icon: Package },
    { label: 'Support', path: '/support', icon: LifeBuoy },
    { label: 'Returns', path: '/returns', icon: RotateCcw },
  ];

  return (
    <aside className="w-64 h-full bg-white dark:bg-surface-darkCard border-r border-slate-200/90 dark:border-surface-darkBorder flex flex-col justify-between p-4 shrink-0 transition-colors">
      <div className="flex flex-col gap-5">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-accent-cyan flex items-center justify-center text-white shadow-glow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              ShopFlow<span className="text-brand-500">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Assistant Workspace</p>
          </div>
        </Link>

        {/* New Chat Button */}
        {onNewChat && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNewChat}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="w-full justify-start font-semibold shadow-brand-500/20"
          >
            New Conversation
          </Button>
        )}

        {/* Navigation links */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 py-1">
            Navigation
          </span>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500 dark:text-brand-400' : ''}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Recent Chats */}
        {recentChats && recentChats.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 py-1">
              Recent Inquiries
            </span>
            <div className="space-y-1">
              {recentChats.map((chat, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectRecentChat && onSelectRecentChat(chat)}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group truncate"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-brand-500 transition-colors" />
                  <span className="truncate">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile & Theme toggle */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
        {/* Assistant Status */}
        <div className="flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 status-online" />
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
              n8n Assistant Online
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold text-xs flex items-center justify-center shrink-0 border border-brand-500/30">
            SS
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              Shambhavi Sharma
            </span>
            <span className="text-[10px] text-slate-400 truncate">Verified Customer</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
