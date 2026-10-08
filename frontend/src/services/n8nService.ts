import { AIResponse, Product } from '../types';
import { DEMO_PRODUCTS } from '../data/mockProducts';

const SESSION_KEY = 'shopflow_session_id';

/**
 * Retrieves the current session ID from localStorage or creates a fresh one.
 */
export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'sf_sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Resets the session and returns a new session ID for a fresh chat.
 */
export function resetSessionId(): string {
  const newSessionId = 'sf_sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  localStorage.setItem(SESSION_KEY, newSessionId);
  return newSessionId;
}

/**
 * Normalizes backend n8n response payload into a standardized frontend format.
 */
function normalizeResponse(data: unknown): AIResponse {
  if (typeof data === 'string') {
    return { message: data };
  }

  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    
    // n8n Chat Trigger can return { output: "..." } or { text: "..." } or { response: "..." }
    const rawMessage = (obj.output || obj.response || obj.text || obj.message || '') as string;
    
    return {
      message: rawMessage || 'I have processed your request.',
      products: Array.isArray(obj.products) ? (obj.products as Product[]) : undefined,
      orderId: (obj.order_id || obj.orderId) as string | undefined,
      trackingId: (obj.tracking_id || obj.trackingId) as string | undefined,
      ticketId: (obj.ticket_id || obj.ticketId) as string | undefined,
      status: (obj.status) as string | undefined,
    };
  }

  return { message: 'Processed successfully.' };
}

/**
 * Parses markdown/text response for structured product cards if n8n returned natural text.
 */
export function extractStructuredContent(text: string): { products?: Product[]; extractedOrderId?: string } {
  const lower = text.toLowerCase();
  const matchedProducts: Product[] = [];

  // Match known catalog products in assistant text
  for (const prod of DEMO_PRODUCTS) {
    if (lower.includes(prod.name.toLowerCase()) || lower.includes(prod.id.toLowerCase())) {
      matchedProducts.push(prod);
    }
  }

  // Extract order ID if mentioned like ORD-XXXXXX
  const orderMatch = text.match(/ORD-[A-Za-z0-9_-]+/i);

  return {
    products: matchedProducts.length > 0 ? matchedProducts : undefined,
    extractedOrderId: orderMatch ? orderMatch[0].toUpperCase() : undefined,
  };
}

/**
 * Sends a message to the n8n AI Customer Assistant workflow.
 * Uses VITE_N8N_WEBHOOK_URL from environment variables.
 * Gracefully falls back to simulated intelligent client responses when URL is unconfigured.
 */
export async function sendChatMessage(
  message: string,
  sessionId: string = getOrCreateSessionId()
): Promise<AIResponse> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (webhookUrl && webhookUrl.trim() !== '') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          message,
          chatInput: message,
          sessionId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let parsedData: unknown;

      if (contentType.includes('application/json')) {
        parsedData = await response.json();
      } else {
        const textData = await response.text();
        try {
          parsedData = JSON.parse(textData);
        } catch {
          parsedData = { output: textData };
        }
      }

      return normalizeResponse(parsedData);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('The request is taking longer than expected.');
      }
      // Never expose internal n8n nodes, stack traces, or credentials
      throw new Error('ShopFlow is temporarily unavailable. Please try again.');
    }
  }

  // Intelligent client-side assistant emulation for development and preview
  // Allows testing all features (product discovery, ordering, tracking, returns, support)
  // before the live n8n webhook URL is plugged in.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lower = message.toLowerCase().trim();

  // 1. Product Search / Find query
  if (
    lower.includes('headphone') ||
    lower.includes('audio') ||
    lower.includes('watch') ||
    lower.includes('keyboard') ||
    lower.includes('stand') ||
    lower.includes('hub') ||
    lower.includes('find') ||
    lower.includes('search') ||
    lower.includes('show') ||
    lower.includes('recommend') ||
    lower.includes('product')
  ) {
    let matched = DEMO_PRODUCTS;
    let queryDesc = 'great matches';

    if (lower.includes('headphone') || lower.includes('under 3000') || lower.includes('under ₹3000')) {
      matched = DEMO_PRODUCTS.filter((p) => p.id === 'P101');
      queryDesc = '1 top recommendation under ₹3,000';
    } else if (lower.includes('watch')) {
      matched = DEMO_PRODUCTS.filter((p) => p.id === 'P102');
    } else if (lower.includes('keyboard')) {
      matched = DEMO_PRODUCTS.filter((p) => p.id === 'P104');
    } else if (lower.includes('stand')) {
      matched = DEMO_PRODUCTS.filter((p) => p.id === 'P103');
    } else if (lower.includes('hub')) {
      matched = DEMO_PRODUCTS.filter((p) => p.id === 'P105');
    }

    return {
      message: `I found ${matched.length} ${queryDesc} in the ShopFlow catalog for you. You can review specifications or buy directly below:`,
      products: matched,
    };
  }

  // 2. Track Order intent
  if (lower.includes('track') || lower.includes('where is my order') || lower.includes('status')) {
    const orderMatch = message.match(/ORD-[A-Za-z0-9_-]+/i);
    if (orderMatch) {
      const id = orderMatch[0].toUpperCase();
      return {
        message: `I retrieved the real-time logistics status for Order #${id}. The shipment is currently In Transit with carrier tracking ID SF-TRK-78192. Estimated delivery is in 2 business days.`,
        orderId: id,
        trackingId: 'SF-TRK-78192',
      };
    }
    return {
      message: `I would be happy to track your delivery. Please provide your Order ID (for example: ORD-984210) so I can query the logistics system.`,
    };
  }

  // 3. Cancel Order intent
  if (lower.includes('cancel')) {
    const orderMatch = message.match(/ORD-[A-Za-z0-9_-]+/i);
    if (orderMatch) {
      const id = orderMatch[0].toUpperCase();
      return {
        message: `I checked Order #${id}. It is currently in Confirmed status and is eligible for cancellation. You can confirm cancellation right now, which will restore product stock back to the inventory.`,
        orderId: id,
      };
    }
    return {
      message: `To cancel an order and restore inventory, please provide your Order ID (such as ORD-984210).`,
    };
  }

  // 4. Return & Refund intent
  if (lower.includes('return') || lower.includes('refund')) {
    const orderMatch = message.match(/ORD-[A-Za-z0-9_-]+/i);
    if (orderMatch) {
      const id = orderMatch[0].toUpperCase();
      return {
        message: `Order #${id} has been verified as delivered within our 7-day return window. You can initiate a return request to receive a full refund back to your original payment method.`,
        orderId: id,
      };
    }
    return {
      message: `I can help process your return or refund request. What is the Order ID of the delivered item you would like to return?`,
    };
  }

  // 5. Support / Complaint intent
  if (lower.includes('support') || lower.includes('help') || lower.includes('complaint') || lower.includes('broken') || lower.includes('damaged') || lower.includes('delayed')) {
    return {
      message: `I understand your concern and I am here to help. You can create an automated support ticket immediately or tell me more details about your order and issue so I can escalate it with appropriate priority.`,
    };
  }

  // Default friendly response
  return {
    message: `Hello! I am your ShopFlow AI Assistant. I can assist you with searching products, placing orders, real-time shipment tracking, order cancellations, and automated support tickets. What would you like to do today?`,
  };
}
