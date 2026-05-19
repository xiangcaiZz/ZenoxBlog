---
title: "Designing for the Unknown: A Systems Approach to UI"
date: "2026-05-10"
category: "Design"
readTime: "6 min read"
excerpt: "When building interfaces for complex systems, traditional design patterns fall short. A systems-thinking approach changes everything."
---

# Designing for the Unknown: A Systems Approach to UI

Most design methodologies assume you know what you're building. You have a spec, user stories, Figma mocks — the path from problem to solution is linear. But what about when you don't know what you're building?

## The Problem with Linear Design

Complex systems — developer tools, data platforms, infrastructure consoles — don't fit into neat wireframes. Their users are domain experts doing things the designer has never done. The traditional design process breaks down:

- You can't interview every type of user.
- You can't predict every workflow.
- You can't mock every state.

## Systems Thinking as a Design Tool

Instead of designing pages, design primitives. Instead of prescribing workflows, compose them from reusable parts. This is systems thinking applied to UI:

1. **Identify the atomic units** of the domain — what are the fundamental objects users manipulate?
2. **Define the verbs** — what operations make sense on those objects?
3. **Build composable views** that let users arrange primitives however they need.

## Concrete Techniques

### Property-Based, Not Prescription-Based

Don't design "the dashboard page." Design a flexible grid that can display any metric from any source. Users will build their own dashboards that are better than anything you'd design for them.

### Observable State

Every object in the system should expose its state. Not through a REST endpoint, but through a stream. When state changes, the UI reacts — no polling, no refresh buttons.

### Command Palettes Over Menus

Power users don't navigate menus. They type. A good command palette with fuzzy matching handles the long tail of operations far better than a nested navigation hierarchy.

## The Takeaway

Designing for the unknown means accepting that you are not the expert — your users are. Your job is to give them primitives sharp enough to build their own solutions.
