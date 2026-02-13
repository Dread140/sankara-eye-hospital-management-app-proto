# 🏥 Sankara EyeCare Pro (Prototype)

Enterprise digital workflow system for Sankara Eye Hospital.

This repository now includes a working monorepo prototype with:
- **Node.js + Express backend** (`server/`)
- **React + MUI frontend** (`client/`)
- **SQLite development database** (`database/schema.sql` + `server/data/hospital.db`)

---

## ✅ Implemented from the original spec

- Role-based JWT authentication
- Patient registration + priority queue ordering
- Test workflow endpoints (start/complete)
- Consultation workflow endpoints (start/end)
- Billing workflow endpoints (create/pay)
- Notification API stubs for SMS and WhatsApp
- Admin dashboard API metrics
- Audit logging table
- Secure defaults: helmet, rate limiting, input validation

---

## 📁 Folder structure

```
.
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── data/
│   ├── package.json
│   └── server.js
├── database/
│   └── schema.sql
└── README.md
```

---

## 🚀 Getting started

### 1) Install dependencies

From the repo root:

```bash
npm install
```

### 2) Start backend

```bash
npm run dev:server
```

Backend URL: `http://localhost:5000`

Health check:

```bash
curl http://localhost:5000/health
```

### 3) Start frontend

```bash
npm run dev:client
```

Frontend URL: `http://localhost:5173`

---

## 🔐 Default login

On first boot, backend seeds a default admin user:

- **Email:** `admin@sankara.local`
- **Password:** `Admin@123`

Get JWT token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sankara.local","password":"Admin@123"}'
```

Copy `token` and use as `Authorization: Bearer <token>`.

---

## 🔌 API endpoints

- `POST /api/auth/login`
- `POST /api/patients`
- `GET /api/patients`
- `PUT /api/tests/start/:id`
- `PUT /api/tests/complete/:id`
- `GET /api/tests/waiting`
- `PUT /api/consultation/start/:id`
- `PUT /api/consultation/end/:id`
- `POST /api/billing`
- `PUT /api/billing/pay/:id`
- `POST /api/notify/sms`
- `POST /api/notify/whatsapp`
- `GET /api/dashboard`

---

## ⚙️ Environment variables

Create `server/.env`:

```env
PORT=5000
JWT_SECRET=change_me
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=
```

When Twilio values are missing, notification services run in mock mode (console logs).

---

## 🧩 Customize it “to your wish”

If you want changes, these are best next steps:

1. Add role-specific frontend pages (Reception, Technician, Doctor, Billing).
2. Add real Twilio/Meta integrations in `server/services/`.
3. Add queue display board and live updates (WebSocket).
4. Add appointment module and follow-up reminders.
5. Switch to PostgreSQL in production.

Share your exact custom requests (UI, workflow, reports, billing logic, etc.), and we can implement them feature-by-feature.

---

## 📜 License

MIT
