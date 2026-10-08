import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BotMessageSquare, Compass, ShoppingBag, Package, LifeBuoy } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: 'Assistant', path: '/app', icon: BotMessageSquare, highlight: true },
    { label: 'Discover', path: '/products', icon: Compass },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Track', path: '/track', icon: Package },
    { label: 'Support', path: '/support', icon: LifeBuoy },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-surface-darkCard/90 backdrop-blur-xl border-t border-slate-200 dark:border-surface-darkBorder py-1.5 px-3">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {tab.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-500 status-online" />
                )}
              </div>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
