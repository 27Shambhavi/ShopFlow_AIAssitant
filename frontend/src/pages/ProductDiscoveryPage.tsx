import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BotMessageSquare, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { SearchBar } from '../components/products/SearchBar';
import { Button } from '../components/ui/Button';

export const ProductDiscoveryPage: React.FC = () => {
  const { products } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      const matchesStock = !onlyInStock || product.stock > 0;

      return matchesQuery && matchesCategory && matchesPrice && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, maxPrice, onlyInStock]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(10000);
    setOnlyInStock(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Product Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Find something you'll love.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse through premium curated hardware, audio, and workspace essentials.
          </p>
        </div>

        {/* CTA to AI Assistant */}
        <Link to="/app">
          <Button
            variant="glow"
            size="md"
            leftIcon={<BotMessageSquare className="w-4 h-4" />}
            className="font-semibold shadow-glow-sm"
          >
            Ask AI to find something
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
        onClear={handleResetFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> available item{filteredProducts.length !== 1 ? 's' : ''}
        </span>
        {filteredProducts.length !== products.length && (
          <button
            onClick={handleResetFilters}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        onClearFilters={handleResetFilters}
      />
    </div>
  );
};
