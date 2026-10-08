import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-surface-darkCard/60 backdrop-blur-md transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shadow-glow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                ShopFlow<span className="text-brand-500">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your AI-powered shopping companion. Search, shop, track, and resolve — all through one intelligent assistant.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 status-online" />
              n8n Automation Engine Connected
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/app" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  AI Customer Assistant
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Order Management
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Logistics Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Operations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Automations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/support" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Automated Support Center
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Returns &amp; Refund Management
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">
                  Instant Stock Restoration
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">
                  Zero-Latency LangChain Agents
                </span>
              </li>
            </ul>
          </div>

          {/* Tech Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Architecture
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Built on React, TypeScript, Tailwind, and integrated with LangChain n8n AI workflows.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                n8n LangChain
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                React 19 / TS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ShopFlow AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-500" />
              Sub-second AI Response
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              End-to-End Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
