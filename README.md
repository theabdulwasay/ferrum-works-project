# Ferrum Works

**Steel operations platform** — from melt shop to delivery dock.

A polished, frontend-only React demo for a steel manufacturing & trading business: a marketing landing page plus three role-based dashboards (**Customer**, **Manager**, **Admin**), with dummy login and live-feeling mock data. No backend required — open it, sign in, and explore.

<p align="center">
  <img alt="Ferrum Works stack" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Recharts" src="https://img.shields.io/badge/Recharts-2-FF6B35?style=for-the-badge" />
  <img alt="License" src="https://img.shields.io/badge/Demo-Frontend%20only-1B2838?style=for-the-badge" />
</p>

---

## Highlights

| Area | What you get |
| --- | --- |
| **Landing** | Hero, live-data preview, roles, process flow, stats, and CTA — same industrial visual language throughout |
| **Auth (demo)** | Pick Customer / Manager / Admin; any email & password works |
| **Customer** | Orders, live progress, place-order with price calc, invoices |
| **Manager** | Plant overview, batches, inventory, order queue, staff roster |
| **Admin** | Platform metrics, users, revenue & production charts, settings |
| **UI** | Responsive sidebar (drawer on mobile) + shared “heat gauge” progress motif |

---

## Tech stack

| Tool | Role |
| --- | --- |
| [React 18](https://react.dev) | UI |
| [Vite](https://vitejs.dev) | Dev server & build |
| [lucide-react](https://lucide.dev) | Icons |
| [Recharts](https://recharts.org) | Area, bar, line, pie charts |

Styling uses plain inline styles and a shared token file (`src/theme.js`) — no CSS framework to configure.

---

## Project structure

```
ferrum-works/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                 # React root
│   ├── App.jsx                  # Landing ↔ Dashboard
│   ├── theme.js                 # Colors, gradient, fonts
│   └── components/
│       ├── LandingPage.jsx      # Marketing homepage
│       └── Dashboard.jsx        # Login + all role dashboards
└── README.md
```

---

## Getting started

**Requires Node.js 18+**

```bash
# Install
npm install

# Develop
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

### Production build

```bash
npm run build      # → /dist
npm run preview    # local preview of /dist
```

`dist` is fully static — deploy to Vercel, Netlify, GitHub Pages, S3, or any static host.

---

## Using the demo

1. Open the app → marketing homepage  
2. Click **Sign in** or **Enter dashboard**  
3. Choose a role: **Customer**, **Manager**, or **Admin**  
4. Enter any email and password  
5. Click **Sign in to [Role] dashboard**  
6. Browse via the sidebar · **Log out** → login · **Back to site** → homepage  

### Demo profiles

| Role | Name shown in dashboard |
| --- | --- |
| Customer | Bilal Ahmed |
| Manager | Fatima Siddiqui |
| Admin | Muhammad Ibrar |

Staff roster and user lists use the same naming style (Ahmed Khan, Omar Hassan, Aisha Rahman, Al-Noor Constructions, and more).

---

## Customizing

- **Look & feel** — edit `src/theme.js` (colors, gradient, fonts) once; it updates landing + dashboards  
- **Mock data** — orders, inventory, users, charts live near the top of `src/components/Dashboard.jsx`  
- **New page** — add to the role’s `navMap` (in `Sidebar`) and `pageMap` (in `Dashboard`), then add the page component  

---

## Notes

- Frontend-only: no server, database, or real auth — do not ship the dummy login as production auth  
- Names, orders, and figures are placeholders for demos and screenshots  

---

<p align="center">
  <strong>Ferrum Works</strong> · every ton tracked, from melt to dock
</p>

<img width="1875" height="832" alt="image" src="https://github.com/user-attachments/assets/0c412731-198b-482b-83b4-12535dffc4a2" />
<img width="1882" height="830" alt="image" src="https://github.com/user-attachments/assets/62a2ed68-d5ce-4c3c-a2d4-
  9a31db9f9f58" />
<img width="1872" height="826" alt="image" src="https://github.com/user-attachments/assets/f10dde92-dec5-4204-b8dc-5e6cca15f88f" />
<img width="1893" height="830" alt="image" src="https://github.com/user-attachments/assets/d45bb248-6650-4f03-bc6f-290b8af87272" />
<img width="1889" height="828" alt="image" src="https://github.com/user-attachments/assets/282918e9-0605-4e13-9b23-4a5f79fbd479" />
<img width="1886" height="824" alt="image" src="https://github.com/user-attachments/assets/5d721db9-c933-43f4-95d5-da53a2d36392" />





