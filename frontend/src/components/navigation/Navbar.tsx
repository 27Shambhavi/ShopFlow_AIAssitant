import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  ShoppingBag,
  Package,
  Compass,
  LifeBuoy,
  RotateCcw,
  BotMessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'AI Assistant', path: '/app', icon: BotMessageSquare, highlight: true },
    { label: 'Discover', path: '/products', icon: Compass },
    { label: 'My Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Track', path: '/track', icon: Package },
    { label: 'Support', path: '/support', icon: LifeBuoy },
    { label: 'Returns', path: '/returns', icon: RotateCcw },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-300 dark:to-cyan-400 bg-clip-text text-transparent">
                ShopFlow<span className="text-brand-500 dark:text-brand-400 ml-0.5">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1 hidden sm:block">
                Commerce Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-500 dark:text-brand-400' : ''}`} />
                  {item.label}
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-online ml-0.5" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Launch AI CTA */}
            <Link to="/app" className="hidden sm:inline-flex">
              <Button
                variant="glow"
                size="sm"
                leftIcon={<BotMessageSquare className="w-4 h-4" />}
                className="font-semibold"
              >
                AI Assistant
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-surface-darkCard/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 animate-slide-down">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-brand-500" />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                    Live
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link to="/app" onClick={() => setMobileMenuOpen(false)} className="w-full block">
              <Button variant="glow" size="md" className="w-full">
                Launch AI Shopping Assistant
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
