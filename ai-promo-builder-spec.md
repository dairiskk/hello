# 🧱 AI Promo Page Builder — MVP Specification (Final)

## 🚀 Overview

A SaaS tool for casino marketers and affiliates to **auto-generate, edit, and host responsive promo pages** that match the style of a casino website.  
Built with **Next.js**, **Tailwind**, **Prisma**, **JWT Auth**, **OpenAI**, and **local file storage**.

---

## 🧠 Core Concept

- **Optional inputs** (casino URL, content, style sliders)
- **AI auto-generates** layout & content
- **Always shows example values** (never blank)
- **Editable builder** (style, text, layout)
- **Publish under hosted URL**
- **Plan limits** enforce number of live pages
- **Local uploads** for images
- **Simple analytics** (views, clicks)
- **Stripe upgrade flow**
- **Deploy on Vercel** with local Postgres + Prisma

---

## 🧭 User Flow

1. **Register** → email/password, plan = Free
2. **Login** → JWT cookie
3. **Dashboard** → projects list, usage bar
4. **Create Project**
5. **Generate Page** → paste casino URL (optional)
6. **AI generates layout + brand kit**
7. **Edit page** → modify colors, text, layout
8. **Publish** → if under plan limit
9. **View Live Page** (`/promo/[slug]`)
10. **See Analytics** (views, clicks, CTR)
11. **Upgrade Plan** (Stripe Checkout → webhook)
12. **Settings** → change password, logout

---

## 💳 Plans & Limits

| Plan     | Max Published Pages | Custom Domains | Analytics Retention |
| -------- | ------------------- | -------------- | ------------------- |
| Free     | 1                   | 0              | 30 days             |
| Paid     | 20                  | 1              | 180 days            |
| Ultimate | 50                  | 3              | 365 days            |

- Publishing = live variant
- Unpublishing frees quota
- Upgrade via Stripe checkout → webhook updates plan

---

## ⚙️ Tech Stack

**Frontend:** Next.js 14+, Tailwind, shadcn/ui, Radix, React Hook Form, Zod  
**Backend:** Next.js API routes, Prisma + Postgres (local), JWT Auth (HttpOnly), bcrypt, OpenAI  
**File Storage:** Local (`/public/uploads`), max 2MB `.webp`  
**AI:** OpenAI GPT-4o-mini JSON responses  
**Billing:** Stripe Checkout + Webhook  
**Hosting:** Vercel (Next.js app)  
**Database:** Local Postgres, Prisma migrations on build

---

## 🧱 Data Model (Prisma)

- **User**: id, email, passwordHash, plan, publishedVariantCount, stripeCustomerId
- **Project**: name, userId
- **BrandKit**: tokensBase (AI), tokensOverrides (user)
- **Page**: pageSpecBase (AI), pageSpecOverrides (user), status, baseSlug
- **Variant**: locale, region, slug, i18nBase, i18nOverrides, published, analytics
- **AnalyticsEvent**: variantId, event ("view", "click"), ts
- **Subscription**: plan, stripeSubId, status, periodEnd

---

## 🧠 AI Generation

### Prompt Tuning

Use **OpenAI GPT-4o-mini** with **JSON-only response**.  
All generation requests are validated with Zod (`PageSpec`).

#### ✅ Prompt Template
