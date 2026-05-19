---
title: "Rust in Production: Lessons from a Year of Shipping"
date: "2026-05-03"
category: "Engineering"
readTime: "12 min read"
excerpt: "After migrating core services to Rust, here are the surprising wins, the unexpected friction, and what nobody tells you about the ecosystem."
---

# Rust in Production: Lessons from a Year of Shipping

A year ago, we made the decision to rewrite our core data pipeline in Rust. The existing Python services worked, but they were expensive to run and brittle at scale. Here's what we learned.

## The Good Parts

### Performance Without Heroics

Our Python services required careful tuning — connection pooling, async workers, memory profiling — to handle 5,000 messages per second. The Rust replacement handles 50,000 on a single thread without breaking a sweat. No tuning required.

### Fearless Refactoring Is Real

The compiler really does catch everything. We've done major architectural refactors — splitting services, changing data models — and never once worried about runtime errors. The type system and borrow checker earn their reputation.

### The Tooling Is Excellent

Cargo, rust-analyzer, clippy, rustfmt — the developer experience is cohesive in a way that few ecosystems match. Coming from Python, where you're stitching together five different tools, it's refreshing.

## The Hard Parts

### Async Rust Has a Learning Curve

Tokio is powerful, but the ecosystem fragmentation between sync and async is real. You can't just call an async function from sync code — the colors problem is alive and well.

### Compile Times Are Still Painful

CI builds take 8-12 minutes for a ~40k line codebase. Incremental compilation helps locally, but clean CI builds are a regular friction point.

### The Crate Ecosystem Is Young but Maturing

For core infrastructure — HTTP, serialization, database drivers — the ecosystem is solid. For niche needs, you'll find a crate with 12 stars and 3 commits from 2019. Choose carefully.

## Would We Do It Again?

Yes, without hesitation. The operational savings alone — 80% reduction in CPU, 90% reduction in memory — justified the investment. But the real win is confidence: we deploy on Fridays now, and nobody worries.
