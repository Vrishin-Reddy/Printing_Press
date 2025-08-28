
## Sri Sharada Press — Printing_Press

Production‑ready React + Vite website for a century‑old printing press. It showcases services, history, testimonials, portfolio, and provides booking and contact flows with email delivery via a serverless API.


### Tech stack
- **Frontend**: React 18, TypeScript, Vite, React Router
- **UI**: Tailwind CSS, shadcn/ui (Radix primitives), Lucide icons, Framer Motion
- **Data/UX**: TanStack Query (scaffolded), Sonner toasts, @vercel/analytics
- **Serverless**: Vercel Functions (`api/send.ts`, `api/test.ts`)
- **Email delivery**: Resend REST API
- **Testing**: Vitest, Testing Library, MSW, Playwright (e2e scaffold), Axe


### Quick start
1) Prereqs: Node 18.x

2) Install
```bash
npm install
```

3) Dev
```bash
npm run dev
# opens on http://localhost:8080 (see vite.config.ts)
```

4) Build & preview
```bash
npm run build
npm run preview
```


### App architecture
- `src/main.tsx`: mounts React app, injects `@vercel/analytics`
- `src/App.tsx`: global providers (TanStack Query, Tooltip, Toaster), router, layout (`Navbar`, `Footer`, `ScrollToTop`)
- Pages: `src/pages/*` (Index, Services, Booking, About, Contact, Portfolio, Testimonials, Legacy, NotFound)
- Components: `src/components/*` (Hero, ServicesSection, ServicesList, BookingForm, PhoneInput, Footer, etc.)
- Utilities:
  - `src/lib/sendForm.ts`: file base64 helper and POST client to `/api/send`
  - `src/utils/whatsapp.ts`: builds WA deep links with `VITE_WHATSAPP_NUMBER`
  - `src/utils/emailService.ts`: optional Formspree/webhook helpers (not used by the main flow)
- Serverless API:
  - `api/send.ts`: Vercel function relaying messages to Resend
  - `api/test.ts`: health/config probe


### Routing map
- `/` Home: Hero, About teaser, Services grid, Testimonials preview, CTA
- `/services` Services: icon‑centric list + process steps
- `/booking` Booking: `BookingForm` with attachments, preferred date, quantity, etc.
- `/contact` Contact: form with attachments, business info, map, quick actions
- `/portfolio` Portfolio: filterable showcase (static sample data)
- `/testimonials` Testimonials: reviews and CTA
- `/about` About: `AboutPage` with history, values, team, CTA
- `/legacy` Legacy: heritage page (present in routes)
- `*` NotFound


### Forms and data flow
- Both `BookingForm` and `Contact` send JSON to `/api/send` via `sendToEdge()`.
- Attachments are converted to base64 in the browser using `filesToBase64()`; a client‑side 8MB total limit is enforced.
- A hidden honeypot field (`botcheck`) reduces spam.
- Success/error UX handled with Sonner toasts; forms are disabled while submitting and then reset on success.

Payloads sent to the API share this shape:
```json
{
  "source": "booking" | "contact",
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "attachments": [{ "filename": "...", "content": "base64", "content_type": "..." }]
}
```


### Serverless email relay (`api/send.ts`)
- Validates required fields (`name`, `email`, `message`).
- Builds a simple HTML summary email and posts to Resend (`https://api.resend.com/emails`).
- Responds with `{ ok: true, id }` on success.
- Adds permissive CORS for GET/POST/OPTIONS.

Environment variables (set locally or in Vercel Project Settings):
- `RESEND_API_KEY` (required)
- `RESEND_FROM` (required, e.g., `Sri Sharada Press <notifications@yourdomain.com>`) 
- `RESEND_TO` (optional; default `sspress.1912@gmail.com`)

Client‑side environment (Vite, optional):
- `VITE_WHATSAPP_NUMBER` (defaults to `919391011520`)
- `VITE_FORMSPREE_ENDPOINT`, `VITE_FORMSPREE_CONTACT_ENDPOINT` (if using Formspree helpers)
- `VITE_EMAIL_WEBHOOK`, `VITE_CONTACT_EMAIL` (if using custom webhook helpers)

Test endpoint:
- `GET /api/test` returns `{ ok, method, timestamp, env }` to verify deployment and env presence.


### UI/Accessibility
- Components are built with shadcn/ui (Radix), Tailwind, and accessible semantics.
- Keyboard/focus states and reduced‑motion preferences are respected where relevant.
- `Navbar` includes scroll progress and responsive mobile drawer.
- `Footer` includes address, phone, and mail links, plus quick links and services.


### Testing
- Unit/integration: Vitest + Testing Library + MSW
  - Example: `src/pages/__tests__/Contact.integration.test.tsx` tests form flow & error handling
- API handler tests: `src/api/__tests__/send.test.ts` (legacy mocks reference nodemailer, while runtime uses Resend)
- E2E: Playwright config scaffolded

Commands
```bash
npm run typecheck
npm run test
# or with coverage (see vitest config)
```


### Build and deploy
- Build: `npm run build` (outputs to `dist/`)
- Vite dev server: port 8080 (IPv6 host `::`) per `vite.config.ts`
- GitHub Pages base path handled automatically if `GITHUB_ACTIONS` is set
- Recommended hosting: **Vercel** (first‑class for `/api/*` serverless functions)

Vercel steps
1) Import repo in Vercel
2) Framework preset: Vite
3) Set env vars: `RESEND_API_KEY`, `RESEND_FROM`, optionally `RESEND_TO`
4) Deploy; test `GET /api/test` and submit a form


### Project structure (high‑level)
```
api/                # Vercel functions (send, test)
public/             # Static assets
src/
  components/       # UI and composite components
  lib/              # sendForm (attachments + API client)
  pages/            # Route components
  utils/            # whatsapp link builder, optional email helpers
  mocks/            # MSW handlers for tests
```


### Troubleshooting
- 500 from `/api/send`: ensure `RESEND_API_KEY` and `RESEND_FROM` are set in the deployment environment.
- Emails not delivered: check Resend dashboard/logs; verify `RESEND_TO` address; confirm sending domain configuration.
- Attachments rejected: client enforces ~8MB total; reduce file sizes.
- WhatsApp deep links wrong number: set `VITE_WHATSAPP_NUMBER` to digits only (7–15).


### License
Proprietary. All rights reserved by Sri Sharada Press.
