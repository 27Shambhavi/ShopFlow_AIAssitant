# n8n AI Assistant Integration Guide

This guide walks you through connecting the **ShopFlow AI** frontend to your active n8n instance and workflows.

---

## 1. Webhook Setup in n8n

1. Open your n8n workspace.
2. Locate the workflow **ShopFlow - AI Customer Assistant** (`ShopFlow - AI Customer Assistant.json`).
3. Click the first node: **When chat message received** (`@n8n/n8n-nodes-langchain.chatTrigger`).
4. Copy the **Production Webhook URL** (or Test Webhook URL during local testing).
   - Format: `https://<YOUR_N8N_INSTANCE>/webhook/<WEBHOOK_ID>/chat`

---

## 2. Configuring the Frontend Environment Variable

In `Frontend/.env`, set:

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/0447fa02-1b4c-4f7f-bded-383a2171dd90/chat
```

If you leave `VITE_N8N_WEBHOOK_URL` empty, the frontend runs in **Client Emulation Mode**, allowing complete testing and demonstration of the UI, product search, order placement, tracking, cancellations, and support ticketing without an active n8n instance.

---

## 3. Communication Protocol

### Outgoing Request (Frontend -> n8n)

The `n8nService.ts` module sends an HTTP `POST` with the following JSON body:

```json
{
  "message": "Find wireless headphones under ₹3000",
  "chatInput": "Find wireless headphones under ₹3000",
  "sessionId": "sf_sess_k9z2a8b1_1718290000"
}
```

- **`sessionId`**: Stored in `localStorage` under `shopflow_session_id`. This preserves conversation memory across user prompts using n8n's `Simple Memory` buffer window.
- Clicking **"New Chat"** in the sidebar resets `sessionId`, starting a clean session buffer.

### Incoming Response (n8n -> Frontend)

The n8n LangChain agent returns responses in standard n8n chat trigger formats:

```json
{
  "output": "I found 1 great match in our catalog for you:\n\nWireless Headphones (P101) - ₹2,499 [In Stock]\nANC wireless headphones with 40h battery life."
}
```

The frontend parser automatically detects catalog products, prices, and `ORD-XXXXXX` references, rendering rich interactive cards directly inside the conversation stream.

---

## 4. Error Handling and Reliability

- **Timeout Protection**: If an n8n workflow takes longer than 25 seconds, an abort controller displays: *"The request is taking longer than expected."*
- **Fail-Safe Sanitization**: Internal n8n node names, credentials, Google Sheets URLs, and stack traces are never exposed to the customer UI.
