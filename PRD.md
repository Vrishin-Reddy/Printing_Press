## Product Requirements Document (PRD)

Sri Sharada Press Website (Printing_Press)


### 1. Summary
Sri Sharada Press is a modern marketing and lead‑generation website for a century‑old printing press. It showcases services, heritage, testimonials, portfolio, and provides booking and contact forms that send email notifications via a serverless API. The site emphasizes speed, accessibility, and reliability.


### 2. Goals and Non‑Goals
- Goals
  - Present a trustworthy, modern brand experience rooted in heritage.
  - Enable prospects to request quotes or contact the business quickly (phone, email, WhatsApp, forms).
  - Route form submissions to the press’s inbox with optional attachments.
  - Be fast, accessible, and easy to maintain/deploy.
- Non‑Goals
  - No user accounts or dashboards.
  - No online payments or order tracking.
  - No headless CMS integration (static content maintained in code).


### 3. Stakeholders
- Business owner and staff (primary)
- Prospective customers (B2B, B2C)
- Maintainers/Developers


### 4. Target Users and Personas
- Local business owner needing signage, visiting cards, or promotional material.
- Family planning wedding/invitation cards.
- Event organizer needing banners, standees, and collateral.


### 5. Success Metrics
- Form conversion rate (booking/contact submissions per sessions).
- Time to first interaction (call, email, WhatsApp, submit).
- Email delivery success rate from serverless function.
- Core Web Vitals (LCP, CLS) within good thresholds.


### 6. Information Architecture / Sitemap
- Home `/`
- Services `/services`
- Booking `/booking` (primary conversion)
- Contact `/contact`
- About `/about`
- Portfolio `/portfolio`
- Testimonials `/testimonials`
- Legacy `/legacy`
- 404 `*`


### 7. Detailed Feature Requirements

7.1 Navigation & Layout
- Sticky `Navbar` with brand, primary links, and “Book Now” CTA.
- Mobile menu via drawer; active route states; visible focus states.
- `Footer` with quick links, services list shortcuts, address, phone, email, and “back to top”.

7.2 Home
- Hero with legacy positioning, clear CTAs: Explore Legacy and Get a Quote.
- About teaser, icon‑centric services section, testimonials preview, “Why choose us”, final CTA.

7.3 Services
- Icon‑centric grid describing all services with features.
- “Book this service” CTA that deep‑links to `/booking?service=<slug>`.

7.4 Booking
- Booking form with fields:
  - Full name (required)
  - Email (required, type email)
  - Phone (required, structured via custom `PhoneInput` with country code)
  - Service (required; preselected when `?service=` is present)
  - Dimensions (optional)
  - Quantity (required, min 1)
  - Preferred date (optional date picker)
  - Attachments (optional; accepts .pdf, .png, .jpg, .jpeg, .svg, .tiff)
  - Additional information (optional)
- Anti‑spam honeypot: hidden `botcheck` field must remain empty.
- Attachments: client converts files to base64 and enforces ~8MB total across attachments.
- Submit sends JSON to `/api/send` with `{ source: "booking", ... }` and shows success/error toasts.
- Right column: quick contact actions and trust blocks.

7.5 Contact
- Contact form with fields:
  - Full name (required)
  - Email (required)
  - Phone (required)
  - Subject (General Inquiry | Quote Request | Support | Feedback)
  - Deadline (optional date picker)
  - Allow WhatsApp follow‑up (radio yes/no)
  - Message (required)
  - Attachments (optional; same types)
- Anti‑spam honeypot and 8MB total attachment cap.
- Submits to `/api/send` with `{ source: "contact", ... }`.
- Quick actions: call, email, WhatsApp link prefilled using `VITE_WHATSAPP_NUMBER` fallback `919391011520`.
- Business info card with address and hours, and an embedded Google Maps iframe + “Open in Google Maps” link.

7.6 Portfolio
- Static, filterable showcase by category with cards and images.
- CTA: Book and Contact buttons.

7.7 Testimonials
- Grid of testimonial cards with ratings, quotes, avatars.
- CTA: Book and WhatsApp.

7.8 About
- Heritage, values, and team section with motion effects and CTA.

7.9 Not Found
- Friendly 404 page linked in router wildcard.


### 8. Forms, Data Model, and API

8.1 Client payload shape
```
source: "booking" | "contact"
name: string
email: string
phone?: string
subject?: string
service?: string
message: string
attachments?: { filename: string; content: string; content_type?: string }[]
```

8.2 Client behavior
- `filesToBase64(inputs)` reads selected files and builds attachment array including `size` (used only client‑side to enforce 8MB cap; stripped before send).
- `sendToEdge(payload)` POSTs JSON to `/api/send`, throwing on non‑2xx responses.
- Honeypot check blocks obvious bots.

8.3 Serverless API: `/api/send`
- Methods: OPTIONS 200, GET 200 (health), POST 200/4xx/5xx.
- Validates `name`, `email`, `message` presence; responds 400 if missing.
- Builds simple HTML summary (including `source`, `phone`, `service`, `subject`).
- Calls Resend REST API to send an email:
  - `from`: `RESEND_FROM` (required)
  - `to`: array with `RESEND_TO` or default `sspress.1912@gmail.com`
  - `reply_to`: sender’s email
  - `subject`: `subject` if provided else derived
  - `html`: generated body
  - `attachments`: base64 attachments (no data: prefix)
- Responds `{ ok: true, id }` on success or `{ error, details }` on failure.
- CORS: `Access-Control-Allow-Origin: *` for GET/POST/OPTIONS.

8.4 Test endpoint: `/api/test`
- Returns `{ ok, method, timestamp, env }` to verify deployment configuration.


### 9. Environment & Configuration
- Deployment: Vercel (recommended) with serverless functions under `api/`.
- Required env vars (server):
  - `RESEND_API_KEY`
  - `RESEND_FROM` (e.g., `Sri Sharada Press <notifications@yourdomain.com>`)
  - Optional: `RESEND_TO` (default `sspress.1912@gmail.com`)
- Client (Vite):
  - `VITE_WHATSAPP_NUMBER` (digits only, 7–15; fallback `919391011520`)
  - Optional Formspree/webhook: `VITE_FORMSPREE_ENDPOINT`, `VITE_FORMSPREE_CONTACT_ENDPOINT`, `VITE_EMAIL_WEBHOOK`, `VITE_CONTACT_EMAIL`


### 10. Accessibility Requirements
- Keyboard accessible nav, forms, dialogs, and focus outlines.
- Color contrast for text and interactive elements meets WCAG AA.
- Reduced‑motion respected for animations.
- Semantic HTML for headings, labels, and buttons; icons have `aria-hidden` where decorative.


### 11. Performance & SEO
- Fast LCP via optimized images and static rendering.
- Proper meta tags and descriptive copy on key pages.
- Bundle splitting configured (vendor/ui chunks) to improve load.


### 12. Analytics and Observability
- `@vercel/analytics` enabled in `main.tsx`.
- Manual event tracking not required at launch; can be added later for conversions.


### 13. Security & Privacy
- Honeypot spam protection on forms.
- Permissive CORS limited to this use case; consider tightening if embedding elsewhere.
- No PII persisted server‑side; emails are relayed via Resend only.


### 14. Constraints & Assumptions
- Attachments total size capped at ~8MB client‑side.
- Sending domain is configured in Resend; `RESEND_FROM` is authorized.
- Content and assets are static and maintained in the repo.


### 15. Acceptance Criteria

15.1 Routing
- Visiting each route renders the expected page and landmarks; unknown routes show 404.

15.2 Booking Form
- Preselects service when `?service=<slug>` matches known services.
- Validation errors show when required fields are empty; submit disabled during send.
- On success, toast “booking request was sent”, form resets, date cleared.
- Attachments: accepts allowed types; >8MB total shows error and blocks submit.

15.3 Contact Form
- Requires name, email, phone, and message.
- Subject defaults to “General Inquiry”; allow WhatsApp radio toggles.
- On success, toast “message was sent”, form resets, date cleared, counter reset.

15.4 WhatsApp CTA
- Clicking WhatsApp actions opens `wa.me/<number>` with encoded prefilled message.
- If `VITE_WHATSAPP_NUMBER` invalid/missing, uses fallback `919391011520`.

15.5 API
- `GET /api/test` returns 200 JSON with env flags.
- `POST /api/send` 400 for missing required fields; 200 with `{ ok: true }` on success; 5xx/502 on Resend errors.

15.6 Accessibility
- All interactive controls reachable by keyboard; visible focus ring.
- Images have `alt` where informative.


### 16. Out of Scope (v1)
- Multi‑language content.
- Pricing calculator/estimator.
- Admin dashboard or CRM integration.


### 17. Future Enhancements
- Rate‑limit and captcha for forms.
- Structured email templates with branding.
- CMS for content updates.
- Lead tagging/UTM capture and analytics events.


### 18. Release Plan
- v1.0: Current feature set deployed to Vercel; env configured; email delivery verified.
- v1.1+: Incremental improvements (analytics, SEO, performance budgets, content updates).


