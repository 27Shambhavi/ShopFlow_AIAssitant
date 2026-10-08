import { Product } from '../types';

/**
 * DEMO DATA NOTE:
 * These product records represent initial catalog data matching the ShopFlow Google Sheets schema.
 * In production with active n8n workflows, products are fetched directly via n8n's Product Search Tool.
 */
export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'P101',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 2499,
    stock: 12,
    description: 'Active Noise Cancelling (ANC) over-ear wireless headphones with 40h battery life and ultra-low latency audio.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    tags: ['ANC', 'Bluetooth 5.3', '40h Battery'],
  },
  {
    id: 'P102',
    name: 'Smart Watch',
    category: 'Wearables',
    price: 4999,
    stock: 8,
    description: 'AMOLED always-on display with SpO2 blood oxygen tracking, heart rate monitor, and 14-day battery reserve.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    tags: ['AMOLED', 'SpO2', 'Water Resistant'],
  },
  {
    id: 'P103',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 1299,
    stock: 25,
    description: 'Ergonomic precision-machined aluminum stand with 6 adjustable angle settings and heat dissipation vents.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    tags: ['Aluminum', 'Ergonomic', 'Portable'],
  },
  {
    id: 'P104',
    name: 'Mechanical Keyboard',
    category: 'Peripherals',
    price: 3899,
    stock: 15,
    description: 'Compact 75% hot-swappable mechanical keyboard with custom pre-lubed switches, RGB backlight, and sound dampening foam.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    tags: ['Hot-swap', 'RGB', 'Gasket Mount'],
  },
  {
    id: 'P105',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 1799,
    stock: 18,
    description: '7-in-1 multi-port adapter featuring 4K HDMI @ 60Hz, 100W Power Delivery pass-through, SD card reader, and 3x USB 3.0.',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    tags: ['4K HDMI', '100W PD', '7-in-1'],
  },
  {
    id: 'P106',
    name: 'Studio Condenser Mic',
    category: 'Audio',
    price: 3499,
    stock: 9,
    description: 'High-fidelity cardioid condenser microphone with built-in pop filter, zero-latency monitoring, and desktop stand.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    tags: ['Cardioid', 'USB Plug & Play', 'Zero-latency'],
  },
];
