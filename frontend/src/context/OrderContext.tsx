import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, SupportTicket, ReturnRequest, Product } from '../types';
import { DEMO_ORDERS } from '../data/mockOrders';
import { DEMO_PRODUCTS } from '../data/mockProducts';

interface PlaceOrderParams {
  productId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
}

interface OrderContextType {
  orders: Order[];
  products: Product[];
  tickets: SupportTicket[];
  getOrder: (orderId: string) => Order | undefined;
  placeOrder: (params: PlaceOrderParams) => Promise<Order>;
  cancelOrder: (orderId: string) => Promise<{ success: boolean; message: string }>;
  requestReturn: (orderId: string, reason?: string) => Promise<ReturnRequest>;
  createTicket: (ticket: Omit<SupportTicket, 'ticket_id' | 'created_at' | 'status'>) => Promise<SupportTicket>;
  getOrderStats: () => {
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    pendingReturns: number;
    openTickets: number;
  };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopflow_orders');
    return saved ? JSON.parse(saved) : DEMO_ORDERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopflow_products');
    return saved ? JSON.parse(saved) : DEMO_PRODUCTS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('shopflow_tickets');
    return saved
      ? JSON.parse(saved)
      : [
          {
            ticket_id: 'TKT-171829001',
            customer_name: 'Alex Johnson',
            customer_email: 'alex.j@example.com',
            order_id: 'ORD-983104',
            issue: 'Tracking page update frequency inquiry',
            priority: 'Low',
            status: 'Open',
            created_at: '2026-10-07T08:30:00Z',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('shopflow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopflow_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopflow_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const getOrder = (orderId: string): Order | undefined => {
    const normalized = orderId.trim().toUpperCase();
    return orders.find(
      (o) => o.order_id.toUpperCase() === normalized || o.order_id.replace('-', '').toUpperCase() === normalized.replace('-', '')
    );
  };

  const placeOrder = async ({
    productId,
    quantity,
    customerName,
    customerEmail,
  }: PlaceOrderParams): Promise<Order> => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }
    if (product.stock < quantity) {
      throw new Error(`Insufficient stock. Only ${product.stock} units available.`);
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingId = `SF-TRK-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalAmount = product.price * quantity;

    // Delivery date ~5 days ahead
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      order_id: orderId,
      product_id: product.id,
      product_name: product.name,
      quantity,
      unit_price: product.price,
      total_amount: totalAmount,
      customer_name: customerName || 'Valued Customer',
      customer_email: customerEmail || 'customer@example.com',
      status: 'Confirmed',
      delivery_status: 'Order Placed',
      estimated_delivery: estimatedDelivery,
      tracking_id: trackingId,
      return_status: 'Not Requested',
      refund_status: 'None',
      created_at: new Date().toISOString(),
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - quantity } : p))
    );

    // Prepend order
    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  const cancelOrder = async (orderId: string): Promise<{ success: boolean; message: string }> => {
    const target = getOrder(orderId);
    if (!target) {
      return { success: false, message: `Order #${orderId} was not found.` };
    }

    if (target.status !== 'Confirmed') {
      return {
        success: false,
        message: `Order #${orderId} cannot be cancelled because it has already reached the ${target.status} stage.`,
      };
    }

    // Cancel order
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === target.order_id
          ? { ...o, status: 'Cancelled', delivery_status: 'Cancelled' }
          : o
      )
    );

    // Restore stock
    setProducts((prev) =>
      prev.map((p) =>
        p.id === target.product_id ? { ...p, stock: p.stock + target.quantity } : p
      )
    );

    return {
      success: true,
      message: `Order #${target.order_id} has been cancelled and product stock has been restored.`,
    };
  };

  const requestReturn = async (orderId: string, reason?: string): Promise<ReturnRequest> => {
    const target = getOrder(orderId);
    if (!target) {
      return {
        order_id: orderId,
        return_status: 'Not Requested',
        refund_status: 'None',
        message: 'Order not found.',
        eligible: false,
      };
    }

    if (target.status !== 'Delivered') {
      return {
        order_id: target.order_id,
        return_status: 'Not Requested',
        refund_status: 'None',
        message: `This order is currently in ${target.status} status. Only delivered orders are eligible for return.`,
        eligible: false,
      };
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === target.order_id
          ? { ...o, return_status: 'Return Requested', refund_status: 'Pending' }
          : o
      )
    );

    return {
      order_id: target.order_id,
      return_status: 'Return Requested',
      refund_status: 'Pending',
      message: reason || 'Return request registered successfully.',
      eligible: true,
    };
  };

  const createTicket = async (
    ticketData: Omit<SupportTicket, 'ticket_id' | 'created_at' | 'status'>
  ): Promise<SupportTicket> => {
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;
    const newTicket: SupportTicket = {
      ...ticketData,
      ticket_id: ticketId,
      status: 'Open',
      created_at: new Date().toISOString(),
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const activeOrders = orders.filter((o) => ['Confirmed', 'Processing', 'Shipped'].includes(o.status)).length;
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
    const pendingReturns = orders.filter((o) => o.return_status === 'Return Requested').length;
    const openTickets = tickets.filter((t) => t.status === 'Open').length;

    return {
      totalOrders,
      activeOrders,
      deliveredOrders,
      pendingReturns,
      openTickets,
    };
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        products,
        tickets,
        getOrder,
        placeOrder,
        cancelOrder,
        requestReturn,
        createTicket,
        getOrderStats,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
