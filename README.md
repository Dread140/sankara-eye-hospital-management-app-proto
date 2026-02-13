# sankara-eye-hospital-management-app-proto
# 🏥 Sankara EyeCare Pro

> Enterprise Digital Workflow System for Sankara Eye Hospital  
> Precision Vision. Digital Excellence.

---

# 📌 Project Overview

Sankara EyeCare Pro is a full-stack hospital workflow management system designed specifically for eye hospitals.

It manages the entire patient lifecycle:

Registration  
→ Screening (Timed Tests)  
→ Doctor Consultation  
→ Billing  
→ Exit  

The system includes queue automation, test timers, role-based access, audit logging, and WhatsApp/SMS notifications.

This documentation is structured so that AI tools (Codex) or developers can build the full system from this file.

---

# 🧠 System Architecture

## Frontend
- React.js
- Tailwind CSS
- Material UI
- Axios (API calls)

## Backend
- Node.js
- Express.js
- JWT Authentication
- Role Middleware
- REST API Architecture

## Database
- SQLite (Development)
- PostgreSQL (Production)

## Notification Providers
- Twilio (SMS + WhatsApp)
- WhatsApp Business API (Meta)

---

# 📁 Folder Structure

```
SankaraEyeCarePro/
│
├── server/
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   │   ├── smsService.js
│   │   └── whatsappService.js
│   ├── models/
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── layout/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

# 👥 User Roles

| Role | Access |
|------|--------|
| Admin | Full access |
| Receptionist | Register patients |
| Technician | Conduct tests |
| Doctor | Consultation |
| Billing | Payment management |

---

# 🔄 Patient Lifecycle

Each patient contains:

```
id
uhid
token_number
priority_level
current_stage
status
created_at
```

## Stage Enum

```
registered
screening
doctor
billing
completed
```

Stage auto-updates based on workflow completion.

---

# 🎟 Queue System

Each patient receives:

- Token number
- Queue position
- Priority level

## Priority Hierarchy

1. Emergency
2. VIP
3. Senior Citizen
4. Normal (FIFO)

Queue sorting logic prioritizes accordingly.

---

# ⏱ Screening Test Timer System

Timed diagnostic tests only (not consultation).

| Test | Duration |
|------|----------|
| Vision | 5 min |
| Refraction | 10 min |
| IOP | 5 min |
| OCT | 15 min |
| Field | 20 min |
| Pre-op | 25 min |

## Timer Logic

1. Technician clicks "Start Test"
2. Status → in_progress
3. Countdown begins
4. When timer finishes:
   - Backend API marks test completed
   - Log entry created
   - WhatsApp/SMS notification triggered
   - Patient moves to next stage

Consultation has no fixed timer — only start and end timestamps recorded.

---

# 📊 Admin Dashboard

Displays:

- Total Patients Today
- Tests in Progress
- Waiting Queue
- Emergency Cases
- Average Test Duration
- Average Consultation Time
- Completed Patients

Includes charts and visual indicators.

---

# 📱 Notification System

## SMS Integration

Using Twilio or other provider.

Example service:

```js
const sendSMS = async (to, message) => {
  await client.messages.create({
    body: message,
    from: process.env.SMS_NUMBER,
    to
  });
};
```

---

## WhatsApp Integration

Using Twilio WhatsApp API or Meta Business API.

Example:

```js
await client.messages.create({
  from: "whatsapp:+14155238886",
  to: `whatsapp:${to}`,
  body: message
});
```

## WhatsApp Use Cases

- Token assigned
- Test completed
- Doctor ready
- Bill generated
- Appointment reminder

⚠ Business-initiated messages require approved templates.

---

# 🗂 Audit Logging

Every action is recorded:

```
logs
- id
- user_id
- action
- patient_id
- timestamp
```

Example actions:
- Started Vision Test
- Ended Consultation
- Emergency Override
- Generated Invoice

---

# 🗄 Database Schema

## Users

```
id
name
email
password
role
created_at
```

## Patients

```
id
uhid
name
age
gender
phone
token_number
priority_level
current_stage
status
created_at
```

## Tests

```
id
patient_id
test_type
status
start_time
end_time
```

## Consultations

```
id
patient_id
doctor_id
start_time
end_time
duration
```

## Billing

```
id
patient_id
amount
status
payment_mode
created_at
```

## Logs

```
id
user_id
action
patient_id
timestamp
```

---

# 🔌 API Endpoints

## Authentication

POST `/api/auth/login`

---

## Patients

POST `/api/patients`  
GET `/api/patients`

---

## Tests

PUT `/api/tests/start/:id`  
PUT `/api/tests/complete/:id`  
GET `/api/tests/waiting`

---

## Consultation

PUT `/api/consultation/start/:id`  
PUT `/api/consultation/end/:id`

---

## Billing

POST `/api/billing`  
PUT `/api/billing/pay/:id`

---

## Notifications

POST `/api/notify/sms`  
POST `/api/notify/whatsapp`

---

# 🔐 Security

- JWT with expiration
- Role-based middleware
- Password hashing (bcrypt)
- Input validation
- Rate limiting
- HTTPS required in production

---

# ☁ Deployment Plan

Development:
- Node + SQLite

Production:
- PostgreSQL
- Redis (queue caching)
- Docker
- Cloud (AWS/Azure)
- Nginx reverse proxy

---

# 📦 Environment Variables

```
PORT=5000
JWT_SECRET=secret
DATABASE_URL=postgres_connection_string
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE=xxx
```

---

# 📈 Future Upgrades

- Multi-branch support
- AI-based queue prediction
- Real-time waiting hall display
- PDF prescription auto-send
- WhatsApp chat bot integration

---

# 🧭 ER Relationship Overview

Users → Logs  
Patients → Tests  
Patients → Consultations  
Patients → Billing  
Tests → Logs  

---

# 📜 License

MIT License

---

# 🏥 Sankara EyeCare Pro

Enterprise Workflow Automation for Eye Hospitals.

This documentation contains everything needed for developers or AI to build the complete system.
