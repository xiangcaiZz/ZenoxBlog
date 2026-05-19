---
title: "Beyond REST: Event-Driven APIs for Modern Applications"
date: "2026-04-12"
category: "Engineering"
readTime: "9 min read"
excerpt: "WebSockets, SSE, and message queues are changing the API landscape. When should you move beyond request-response patterns?"
---

# Beyond REST: Event-Driven APIs for Modern Applications

REST has been the lingua franca of web APIs for two decades. But as applications grow more interactive and real-time, the request-response model shows its limits.

## When REST Falls Short

REST works beautifully for CRUD. You have a resource, you want to read or modify it — `GET /users/42` or `PATCH /orders/17` makes perfect sense.

But modern applications have needs that don't fit this mold:

- **Real-time updates** — a dashboard that refreshes live, not on a 30-second poll interval.
- **Long-running operations** — a report generation that takes minutes, not milliseconds.
- **Multi-client sync** — a document being edited by five people simultaneously.

In these scenarios, forcing everything through request-response creates brittle, chatty, inefficient systems.

## The Alternatives

### Server-Sent Events (SSE)

The simplest option. The server pushes events over a long-lived HTTP connection. Great for unidirectional data flow — dashboards, notifications, live feeds.

**Pros:** Simple, auto-reconnects, works through most proxies.
**Cons:** One-way only, connection limits per domain.

### WebSockets

Full-duplex communication over a single TCP connection. The right choice when both sides need to speak.

**Pros:** Bidirectional, low overhead per message.
**Cons:** More complex infrastructure, need to handle reconnection logic.

### Message Queues (NATS, Kafka, Redis Streams)

For backend-to-backend communication, message queues decouple producers from consumers entirely.

**Pros:** Extreme scalability, persistence, replay capabilities.
**Cons:** Operational complexity, eventual consistency.

## A Hybrid Approach

The best systems use the right tool for each job:

- **REST** for CRUD and actions that fit resource semantics.
- **SSE** for pushing state changes to clients.
- **WebSockets** for collaborative or bidirectional features.
- **Message queues** for async backend processing.

The key insight is that these aren't competitors — they're complementary primitives. A mature API design uses all of them where appropriate, not one exclusively.
