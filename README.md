# InterviewForge — MERN Starter

A full-stack starter for **InterviewForge**: AI-powered adaptive interview practice.
Built so you can finish it offline. Stack: **MongoDB · Express · React (Vite) · Node**.

---

## 🗂 Project Structure

```
interviewforge/
├── client/                     # React + Vite frontend (InterviewForge UI)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # NeonButton, GlowCard, InputField, NeonBadge,
│   │   │                       # Navbar, CircularTimer, ProgressBar, StatCard,
│   │   │                       # SidebarNav, AuthModal, QuestionListSidebar,
│   │   │                       # CircularProgressRing, AchievementBadge
│   │   ├── pages/              # Landing, InterviewRoom, Results, Profile
│   │   ├── context/            # AuthContext
│   │   ├── hooks/              # useAuth, useApi
│   │   ├── lib/                # api client, theme tokens
│   │   ├── styles/             # index.css (Inter + JetBrains Mono, theme)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── server/                     # Express + MongoDB API
│   ├── src/
│   │   ├── config/             # db.js, env.js
│   │   ├── controllers/        # auth, user, question, session, result
│   │   ├── middleware/         # auth, error, validate
│   │   ├── models/             # User, Question, Session, Answer
│   │   ├── routes/             # auth, users, questions, sessions, results
│   │   ├── utils/              # token, scoring, logger
│   │   ├── validators/         # zod schemas
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── docker-compose.yml          # optional local MongoDB
└── README.md
```

---

## 🎨 Design System (locked in)

| Token            | Value      |
|------------------|------------|
| Background       | `#0A0A0F`  |
| Card surface     | `#0F0F1A`  |
| Cyan neon accent | `#00F5FF`  |
| Display font     | Inter      |
| Mono font        | JetBrains Mono |

---

## 🚀 Quick Start (offline)

### 1. Prereqs
- Node 18+
- MongoDB running locally (or use `docker compose up -d mongo`)

### 2. Server
```bash
cd server
cp .env.example .env        # set MONGODB_URI + JWT_SECRET
npm install
npm run dev                 # http://localhost:5000
```

### 3. Client
```bash
cd client
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

---

## 🧭 Frontend Routes

| Path         | Page             | Status                                    |
|--------------|------------------|-------------------------------------------|
| `/`          | Landing + Auth   | ✅ Complete (port from Lovable preview)   |
| `/interview` | Interview Room   | ⏳ TODO — see `client/src/pages/InterviewRoom.jsx` (scaffolded) |
| `/results`   | Results          | ⏳ TODO — see `client/src/pages/Results.jsx` (scaffolded)        |
| `/profile`   | Profile          | ⏳ TODO — see `client/src/pages/Profile.jsx` (scaffolded)        |

Each scaffolded page contains the **layout skeleton, all required sub-components, mock data, and inline TODO comments** matching your spec. Wire them to the API endpoints listed below.

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register`  → `{ name, email, password }`
- `POST /api/auth/login`     → `{ email, password }` → `{ token, user }`
- `GET  /api/auth/me`        → current user (auth required)

### Users
- `GET  /api/users/me`           → profile
- `PATCH /api/users/me`          → update profile fields
- `DELETE /api/users/me`         → delete account
- `GET  /api/users/me/achievements`

### Questions
- `GET  /api/questions?topic=&difficulty=&limit=`
- `GET  /api/questions/:id`

### Sessions
- `POST /api/sessions`                       → start session, returns 10 questions
- `GET  /api/sessions/:id`
- `POST /api/sessions/:id/answer`            → `{ questionId, answer, mode }`
- `POST /api/sessions/:id/skip`              → `{ questionId }`
- `POST /api/sessions/:id/end`               → finalize + score

### Results
- `GET  /api/results/:sessionId`             → score, breakdown, AI feedback, per-question review

---

## 🧠 Adding the AI scoring layer (offline)

`server/src/utils/scoring.js` exposes `scoreAnswer({ question, answer })`.
Plug in any provider — OpenAI, Ollama (local), Anthropic — by editing that one file.
Default returns a deterministic mock score so the app runs end-to-end without an API key.

---

## 📦 Build for production

```bash
# server
cd server && npm run start

# client
cd client && npm run build         # outputs client/dist
```

Serve `client/dist` behind nginx/vercel/etc., point `VITE_API_URL` to your deployed Express server.

---

## ✅ What's included vs TODO

**Included**
- Full folder structure
- Express server with auth (JWT + bcrypt), Mongoose models, validation (Zod), error middleware
- React + Vite + Tailwind set up with InterviewForge theme tokens
- All shared UI components from the Lovable preview (NeonButton, GlowCard, InputField, etc.) ported to plain React + Tailwind
- Interview Room, Results, and Profile pages **scaffolded with layout + mock data + TODO markers** matching your spec
- Framer Motion installed and wired in scaffolds
- Docker compose for local Mongo

**TODO (offline)**
- Hook scaffolded pages to API endpoints (clear TODO comments mark each spot)
- Plug a real LLM into `server/src/utils/scoring.js`
- Add tests
