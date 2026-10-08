export interface Product {
  id: string; // e.g. "P101"
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  rating?: number;
  tags?: string[];
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type DeliveryStatus = 'Order Placed' | 'Confirmed' | 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
export type ReturnStatus = 'Not Requested' | 'Return Requested' | 'Return Approved' | 'Item Collected' | 'Return Completed';
export type RefundStatus = 'None' | 'Pending' | 'Processing' | 'Refunded';

export interface Order {
  order_id: string; // e.g. "ORD-1718290000"
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  status: OrderStatus;
  delivery_status: DeliveryStatus;
  estimated_delivery?: string;
  tracking_id?: string;
  return_status?: ReturnStatus;
  refund_status?: RefundStatus;
  created_at: string;
}

export type SupportPriority = 'Low' | 'Medium' | 'High';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface SupportTicket {
  ticket_id: string; // e.g. "TKT-1718290000"
  customer_name: string;
  customer_email: string;
  order_id?: string;
  issue: string;
  priority: SupportPriority;
  status: TicketStatus;
  created_at: string;
}

export interface ReturnRequest {
  order_id: string;
  return_status: ReturnStatus;
  refund_status: RefundStatus;
  message?: string;
  eligible: boolean;
}

export interface TrackingStep {
  title: string;
  date?: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingInfo {
  order_id: string;
  product_name: string;
  amount: number;
  order_status: OrderStatus;
  delivery_status: DeliveryStatus;
  tracking_id?: string;
  estimated_delivery?: string;
  steps: TrackingStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  products?: Product[];
  orderPreview?: Partial<Order>;
  ticketPreview?: Partial<SupportTicket>;
  isError?: boolean;
  suggestedPrompts?: string[];
}

export interface AIResponse {
  message: string;
  products?: Product[];
  orderId?: string;
  trackingId?: string;
  ticketId?: string;
  status?: string;
}
