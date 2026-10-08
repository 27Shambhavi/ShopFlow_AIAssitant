import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  BotMessageSquare,
  Search,
  Package,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useOrders } from '../context/OrderContext';

export const LandingPage: React.FC = () => {
  const { getOrderStats } = useOrders();
  const stats = getOrderStats();

  const features = [
    {
      title: 'AI Product Discovery',
      description: 'Find exactly what you want using natural language and custom budget constraints without digging through menus.',
      icon: Search,
      tag: 'Semantic Search',
      color: 'from-blue-500/20 to-brand-500/20 text-brand-600 dark:text-brand-400',
    },
    {
      title: 'Smart Order Automation',
      description: 'Zero-friction checkout where the AI agent confirms your items, verifies live inventory, and generates order records instantly.',
      icon: ShoppingBag,
      tag: 'Autonomous Checkout',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Real-Time Order Tracking',
      description: 'Get verified carrier logistics and real-time transit milestones with automatic tracking ID queries.',
      icon: Package,
      tag: 'Carrier Sync',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Automated Customer Support',
      description: 'Instant ticket categorization with intelligent severity scoring (High/Medium/Low) and automatic customer linking.',
      icon: BotMessageSquare,
      tag: 'LangChain Routing',
      color: 'from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400',
    },
    {
      title: 'One-Click Cancellation',
      description: 'Cancel confirmed orders in a single conversation prompt with immediate automated inventory restoration.',
      icon: ShieldAlert,
      tag: 'Inventory Recovery',
      color: 'from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400',
    },
    {
      title: 'Returns & Refunds',
      description: 'Self-service return verification checking delivery timelines, status eligibility, and automated refund dispatch.',
      icon: RotateCcw,
      tag: 'Automated SLA',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Customer Intent',
      desc: 'You ask in natural language: search, buy, cancel, or track.',
      badge: 'Natural Prompt',
    },
    {
      step: '02',
      title: 'AI Agent Decisioning',
      desc: 'ShopFlow Agent evaluates context, parameters, and intent.',
      badge: 'LangChain Brain',
    },
    {
      step: '03',
      title: 'Specialized Tool Execution',
      desc: 'Invokes verified n8n workflow tools (Search, Order, Cancel, Return).',
      badge: 'n8n Webhook',
    },
    {
      step: '04',
      title: 'Instant Resolution',
      desc: 'Returns verified order ID, stock updates, tracking or ticket.',
      badge: 'Action Completed',
    },
  ];

  return (
    <div className="flex flex-col gap-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Hero Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse-slow" />
            <span>AI-First Commerce Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-online ml-1" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.15]">
            Your AI-powered <br />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-cyan bg-clip-text text-transparent">
              shopping companion.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Search products, place orders, track deliveries, cancel orders, request returns, and get 24/7 support — all through one intelligent assistant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Link to="/app" className="w-full sm:w-auto">
              <Button
                variant="glow"
                size="lg"
                leftIcon={<BotMessageSquare className="w-5 h-5" />}
                className="w-full sm:w-auto font-bold"
              >
                Start Shopping with AI
              </Button>
            </Link>
            <Link to="/track" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Package className="w-5 h-5" />}
                className="w-full sm:w-auto font-semibold"
              >
                Track an Order
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Inventory Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero Manual Data Entry</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual: Dynamic Interactive Chat Preview */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative group">
            {/* Ambient background glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500 to-accent-cyan rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-700 pointer-events-none" />

            <div className="relative bg-white/90 dark:bg-surface-darkCard/95 border border-slate-200/90 dark:border-surface-darkBorder rounded-3xl shadow-2xl p-5 sm:p-6 backdrop-blur-xl space-y-4">
              {/* Chat preview header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center shadow-glow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">ShopFlow AI</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-online" />
                      <span>Ready to assist</span>
                    </div>
                  </div>
                </div>
                <Badge variant="purple" size="sm">
                  Active Simulation
                </Badge>
              </div>

              {/* Chat conversation mock */}
              <div className="space-y-3.5 py-1">
                {/* User Message */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs font-medium shadow-sm">
                    Find wireless headphones under ₹3000
                  </div>
                </div>

                {/* AI Response with Product Card */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-500 flex items-center justify-center shrink-0 text-xs font-bold">
                    AI
                  </div>
                  <div className="space-y-2.5 w-full">
                    <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200">
                      I found 1 great match in our catalog for you:
                    </div>

                    {/* Featured Product Preview Card */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl flex items-center gap-3.5 shadow-sm hover:border-brand-500/50 transition-all">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80"
                        alt="Wireless Headphones"
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            Wireless Headphones
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                            P101
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          ANC wireless headphones with 40h battery
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            ₹2,499
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            In Stock (12 left)
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link to="/app" className="block">
                      <button className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-glow-sm flex items-center justify-center gap-1.5">
                        <span>Interact with Live Assistant</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Animated Typing Indicator */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <span>AI Agent listening for commands...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Live Operations Bar */}
      <section className="p-6 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-display">
              {stats.totalOrders + 24}
            </span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Automated Orders Processed
            </p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
              &lt; 1.2s
            </span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Average AI Response Time
            </p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-display">
              100%
            </span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Stock Reversals on Cancel
            </p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
              24/7
            </span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Autonomous Support Coverage
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Feature Grid */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="purple" size="sm">
            Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Everything you need, powered by AI
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            A cohesive commerce and customer automation platform engineered around conversational intelligence and real-time backend execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-brand-950/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 gap-1 group-hover:gap-2 transition-all">
                  <span>Explore workflow</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 9: How It Works Visual Flow */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-brand-950/10 via-slate-900/5 to-transparent border border-slate-200/90 dark:border-slate-800 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="info" size="sm">
            Autonomous Pipeline
          </Badge>
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            How ShopFlow AI Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            From natural customer prompts to verified tool triggers in your n8n workflow engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-5 bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-display text-brand-600/30 dark:text-brand-400/30">
                    {step.step}
                  </span>
                  <Badge variant="purple" size="sm">
                    {step.badge}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-brand-500 bg-white dark:bg-surface-darkCard rounded-full p-1 border border-slate-200 dark:border-slate-700">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 border border-brand-500/30 p-8 sm:p-12 text-center text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <Badge variant="purple" size="sm" className="bg-brand-500/20 text-brand-200 border-brand-400/30">
            Experience Next-Gen Commerce
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Ready to experience AI shopping?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Interact with our assistant right now. Search products, simulate direct checkout, track orders, or generate customer support tickets.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/app">
              <Button variant="glow" size="lg" className="w-full sm:w-auto font-bold bg-brand-500 hover:bg-brand-400">
                Launch AI Assistant
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
