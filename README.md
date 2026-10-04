# Bungee Deliveries

A real-time, multi-role food delivery platform built solo, end to end from database design through a GraphQL API to a real-time frontend.

**Live demo:** _coming soon deploying now_
**Backend / API repo:** [Repo](https://github.com/Mikey1-nuel/bungee-deliveries-backend)

---

## Overview

Bungee Deliveries lets a customer order food from a restaurant, pay, and have the order automatically picked up by a rider for doorstep delivery with every participant (customer, restaurant, rider, logistics company, admin) seeing live status updates as the order moves through its lifecycle.

It's a solo project built to go deep on problems that don't show up in tutorial-sized apps: role-based access across five distinct user types, real-time presence and dispatch, and a session/auth system that has to stay consistent across a web client, a GraphQL API, and a Redis-backed session store.

## Who it's for

| Role           | What they do in the app                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Customer**   | Browses restaurants and menus, orders, pays, tracks delivery status in real time                                    |
| **Restaurant** | Manages its menu, accepts/rejects incoming orders, tracks order stats                                               |
| **Rider**      | Goes online/offline, receives dispatch batches, accepts or rejects them, delivers                                   |
| **Logistics**  | Oversees a pool of riders, sees who's online/available, monitors deliveries                                         |
| **Admin**      | Manages users and restaurants, approves new restaurants/riders, creates dispatch batches, views platform-wide stats |

## Features

- **Authentication & sessions** - JWT access/refresh tokens, bcrypt password hashing, Redis-backed sessions with per-device session tracking and revocation
- **Role-based access control** - every API operation checked against an allowed-roles list; five distinct, permissioned dashboards
- **Real-time rider presence** - Socket.io connection tracking with a per-user connection counter (so closing one tab doesn't wrongly mark a rider offline) plus a periodic heartbeat
- **Dispatch system** - admin assigns orders to riders by time slot; a transaction-guarded check prevents the same order being placed in two active batches at once; riders can accept or reject a batch
- **Order lifecycle tracking** - full status history from placed → accepted → preparing → ready → picked up → delivered, with timestamps at each stage
- **Push notifications** - Firebase Cloud Messaging for order and dispatch updates
- **Admin tooling** - user management, restaurant approval, platform-wide order and rider oversight with search and pagination

## Tech stack

**Frontend**
Next.js, TypeScript, Tailwind CSS, Material UI

**Backend**
Node.js, GraphQL, TypeScript

**Data**
PostgreSQL (18-table relational schema), Redis (sessions)

**Real-time**
Socket.io

**Other**
JWT authentication, bcrypt, Firebase Cloud Messaging (push notifications)

## Architecture

```
┌─────────────┐      GraphQL      ┌──────────────┐      ┌────────────┐
│   Next.js    │ ───────────────▶ │  Node.js API  │ ───▶ │ PostgreSQL │
│  (frontend)  │ ◀─────────────── │   (GraphQL)   │      │ 18 tables  │
└─────────────┘    Socket.io      └──────┬───────┘      └────────────┘
       ▲         (live updates)          │
       │                                 ▼
       │                           ┌───────────┐
       └───────────────────────────│   Redis    │
         session cookie / token    │ (sessions) │
                                    └───────────┘
```

- **API surface:** ~49 GraphQL object types, 5 enums, 1 union, 8 input types, across roughly 30 queries and 23 mutations
- **Database:** 18 tables covering users, restaurants, menus, orders, order items, payments, notifications, dispatch batches, and audit logs
- **Auth flow:** login issues a short-lived access token plus a Redis-backed refresh session; every protected request is validated against the live session, not just the token's signature, so a revoked session is rejected immediately rather than only after the access token expires

## Getting started (frontend)

```bash
git clone https://github.com/Mikey1-nuel/[repo-name].git
cd [repo-name]
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. The frontend expects a running instance of the [backend API](#backend--api-repo) to talk to.

### Environment variables (frontend)

| Variable                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_GRAPHQL_API_URL` | URL of the GraphQL API (e.g. `http://localhost:4000/graphql` locally) |
| `NEXT_PUBLIC_SOCKET_URL`      | URL of the Socket.io server for real-time updates                     |
| `NEXT_PUBLIC_FIREBASE_CONFIG` | Firebase client config, for push notification registration            |

### Backend setup (summary - see the [backend repo](#) for full details)

| Variable                    | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| `DATABASE_URL`              | PostgreSQL connection string                                                    |
| `REDIS_HOST` / `REDIS_PORT` | Redis connection (or `REDIS_URL` if using a hosted provider)                    |
| `JWT_SECRET`                | Signing secret for access tokens                                                |
| `REFRESH_SECRET`            | Signing secret for refresh tokens                                               |
| `FIREBASE_SERVICE_ACCOUNT`  | Firebase Admin SDK service account, as a JSON string — **not** a committed file |

> Firebase credentials are loaded from an environment variable, not from a committed service-account file, this keeps admin-level credentials out of the repo, which matters since this repo is public.

## Demo accounts

Once seed data is in place, demo logins for each role will be listed here so anyone can explore the live app without creating an account:

| Role       | Email     | Password  |
| ---------- | --------- | --------- |
| Customer   | _pending_ | _pending_ |
| Restaurant | _pending_ | _pending_ |
| Rider      | _pending_ | _pending_ |
| Logistics  | _pending_ | _pending_ |
| Admin      | _pending_ | _pending_ |

## Project structure

```
app/            Next.js app router pages
components/     Reusable UI components (cards, modals, forms)
contexts/       Cart, auth and other global state providers
hooks/          Custom React hooks
lib/            GraphQL client, API helpers
types/          Shared TypeScript interfaces
```

## Roadmap / known limitations

This is an active solo project, built alongside a full-time internship. It's honest about where it stands:

- [ ] Live demo and seed data (in progress)
- [ ] Automated tests covering auth, checkout and dispatch flows
- [ ] CI pipeline (lint + tests on push)
- [ ] Rider location tracking / live map view
- [ ] Payment provider integration (Paystack/Flutterwave)

## A hard problem worth mentioning

One of the trickier bugs on this project was an authentication redirect loop: when a session expired or was invalidated server-side, the client didn't always find out, so it kept treating the user as logged in while the server disagreed, producing a loop between a protected page and the login screen instead of a clean sign-out. The fix made server-side session validation the single source of truth: a failed validation now clears the client's auth state immediately and redirects once, cleanly. Tracing it meant following the request across the client, the GraphQL layer, and the Redis-backed session store, a good reminder that auth bugs are usually distributed-system problems, not bugs in any one layer.

## Author

**Emmanuel Nwoye**
Backend-leaning full-stack engineer | Node.js, TypeScript, GraphQL, PostgreSQL, Redis, Socket.io
[LinkedIn](https://www.linkedin.com/in/emmanuelnwoye/) · [GitHub](https://github.com/Mikey1-nuel) · [Portfolio](https://emmanuel-port.netlify.app/)
