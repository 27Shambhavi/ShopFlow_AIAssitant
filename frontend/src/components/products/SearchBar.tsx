import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  onlyInStock: boolean;
  onOnlyInStockChange: (inStock: boolean) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  categories,
  maxPrice,
  onMaxPriceChange,
  onlyInStock,
  onOnlyInStockChange,
  onClear,
}) => {
  return (
    <div className="bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      {/* Search Bar Input */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products, categories or describe what you need..."
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by:
          </span>

          {/* Category Chips */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === 'All'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right side controls: In Stock & Price Slider */}
        <div className="flex items-center gap-4 ml-auto">
          {/* In stock toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => onOnlyInStockChange(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
            />
            In Stock Only
          </label>

          {/* Max Price indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Max:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              ₹{maxPrice.toLocaleString('en-IN')}
            </span>
            <input
              type="range"
              min={1000}
              max={10000}
              step={500}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-24 accent-brand-600 cursor-pointer"
            />
          </div>

          {(query || selectedCategory !== 'All' || onlyInStock || maxPrice < 10000) && (
            <button
              onClick={onClear}
              className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
