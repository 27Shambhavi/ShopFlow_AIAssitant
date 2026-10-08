import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  onBuy?: (product: Product) => void;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
  onBuy,
  onSelect,
}) => {
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('Shambhavi Sharma');
  const [customerEmail, setCustomerEmail] = useState('shambhavi@example.com');
  const [isOrdering, setIsOrdering] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) {
      onBuy(product);
      return;
    }
    setIsBuyModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setIsOrdering(true);
      const newOrder = await placeOrder({
        productId: product.id,
        quantity,
        customerName,
        customerEmail,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      showToast(`Order #${newOrder.order_id} placed successfully!`, 'success');
      setIsBuyModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to place order';
      showToast(msg, 'error');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <>
      <div
        className={`group bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-brand-950/40 flex flex-col justify-between ${
          compact ? 'p-3.5 max-w-sm' : 'p-4'
        }`}
      >
        <div>
          {/* Product Image & Badges */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 mb-3.5">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
              </div>
            )}

            {/* Product ID Pill */}
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-slate-900/80 text-white backdrop-blur-md">
                {product.id}
              </span>
            </div>

            {/* Stock indicator badge */}
            <div className="absolute top-2.5 right-2.5">
              {isOutOfStock ? (
                <Badge variant="danger" size="sm">
                  Out of Stock
                </Badge>
              ) : product.stock < 5 ? (
                <Badge variant="warning" size="sm">
                  Only {product.stock} left
                </Badge>
              ) : (
                <Badge variant="success" size="sm">
                  {product.stock} in stock
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium text-brand-600 dark:text-brand-400">{product.category}</span>
            {product.rating && (
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                ★ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Price</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsDetailsOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="View Specifications"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <Button
              variant="glow"
              size="sm"
              disabled={isOutOfStock}
              onClick={handleQuickBuy}
              leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={product.name}
        description={`Catalog item [${product.id}] • ${product.category}`}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full h-56 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 ml-2">(Inclusive of all taxes)</span>
            </div>
            <Badge variant={isOutOfStock ? 'danger' : 'success'}>
              {isOutOfStock ? 'Sold Out' : `${product.stock} units available`}
            </Badge>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button
              variant="glow"
              size="sm"
              disabled={isOutOfStock}
              onClick={() => {
                setIsDetailsOpen(false);
                setIsBuyModalOpen(true);
              }}
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              Proceed to Purchase
            </Button>
          </div>
        </div>
      </Modal>

      {/* Direct Order Confirmation Modal */}
      <Modal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        title="Place Order"
        description="Verify order details. This will communicate with the ShopFlow Order Automation."
      >
        <div className="flex flex-col gap-4">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-slate-400">ITEM: {product.id}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{product.name}</p>
              <p className="text-xs text-slate-500">₹{product.price.toLocaleString('en-IN')} each</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total</span>
              <p className="text-base font-extrabold text-brand-600 dark:text-brand-400">
                ₹{(product.price * quantity).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Quantity"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <Input
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <Input
            label="Customer Email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="name@example.com"
            helperText="Order confirmation & tracking ID will be dispatched to this address."
          />

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBuyModalOpen(false)}
              disabled={isOrdering}
            >
              Cancel
            </Button>
            <Button
              variant="glow"
              size="sm"
              isLoading={isOrdering}
              onClick={handleConfirmOrder}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Confirm & Place Order
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
