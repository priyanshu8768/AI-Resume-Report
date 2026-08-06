# AI Interview Prep

A full-stack AI-driven interview preparation platform with a React/Vite frontend and Express/MongoDB backend. Users register, upload a PDF resume, paste a job description, and receive a personalized interview report with match score, technical/behavioral questions, skill-gap analysis, and AI-generated resume PDF output.

## What this project does

- Uploads a PDF resume and extracts text using `pdf-parse`.
- Sends resume, self-description, and job description to Google Gemini via `@google/genai`.
- Generates a structured interview report JSON with match score, technical questions, behavioral questions, skill gaps, and a preparation plan.
- Stores interview reports in MongoDB and serves them through authenticated Express APIs.
- Provides a React dashboard to view reports, preview recent reports, and download an AI-generated PDF resume using Puppeteer.

## Tech stack

- Frontend: React 19, Vite, React Router, Axios, Sass
- Backend: Node.js, Express, MongoDB, Mongoose, JWT cookie auth, Multer
- AI: Google GenAI (`gemini-3.6-flash`) with JSON schema validation
- PDF: `pdf-parse` resume text extraction, Puppeteer HTML-to-PDF conversion
- Dev tools: ESLint, dotenv, CORS, bcryptjs

## File structure


/ (project root)
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── render.yaml
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── config/database.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   ├── file.middleware.js
│       │   └── rateLimit.middleware.js
│       ├── models/
│       │   ├── blacklist.model.js
│       │   ├── interviewReport.model.js
│       │   └── user.model.js
│       └── services/
│           ├── ai.service.js
│           └── temp.js
├── Frontend/
│   ├── package.json
│   ├── index.html
│   ├── netlify.toml
│   └── src/
│       ├── App.jsx
│       ├── app.routes.jsx
│       ├── main.jsx
│       ├── style.scss
│       ├── features/
│       │   ├── auth/
│       │   │   ├── auth.context.jsx
│       │   │   ├── components/protected.jsx
│       │   │   ├── hooks/useAuth.js
│       │   │   ├── pages/Login.jsx
│       │   │   ├── pages/Register.jsx
│       │   │   └── services/auth.api.js
│       │   └── interview/
│       │       ├── interview.context.jsx
│       │       ├── hooks/useInterview.js
│       │       ├── pages/Home.jsx
│       │       ├── pages/Interview.jsx
│       │       ├── services/interview.api.js
│       │       └── style/
│       │           ├── home.scss
│       │           └── interview.scss


## Key design details

- `Home.jsx` allows users to upload a resume, paste a job description, and generate an AI-powered report.
- `Interview.jsx` displays the generated report with section navigation for technical questions, behavioral questions, and a preparation road map.
- `InterviewProvider` and `AuthContext` share state across the app with React Context and custom hooks.
- Backend routes support authenticated report creation, retrieval, and PDF resume generation.
- AI service uses prompt engineering with typed JSON schema output to make generated content reliable and structured.

## Setup

### Backend

1. `cd Backend`
2. `npm install`
3. Create a `.env` file with:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_GENAI_API_KEY`
   - `Frontend_URL`
4. `npm start`

### Frontend

1. `cd Frontend`
2. `npm install`
3. `npm run dev`

### Environment variables

- `VITE_BACKEND_URL` (Frontend build environment variable)
- `MONGO_URI`, `JWT_SECRET`, `GOOGLE_GENAI_API_KEY`, `Frontend_URL` (Backend)

## Deployment

### Backend on Render

This repository contains `Backend/render.yaml` to define the backend service deployment.

1. Create a new Web Service on Render.
2. Connect your repository and select the `main` branch.
3. Set the root directory to `Backend`.
4. Use build command: `npm install`
5. Use start command: `npm start`
6. Add environment variables in Render:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_GENAI_API_KEY`
   - `Frontend_URL` (set to your Netlify site URL)

Render automatically injects `PORT` for the web service.

### Frontend on Netlify

This repository contains `Frontend/netlify.toml` to deploy the frontend from the `Frontend` folder.

1. Connect your repository to Netlify.
2. Set the base directory to `Frontend` so Netlify uses `Frontend/netlify.toml`.
3. Add environment variable in Netlify:
   - `VITE_BACKEND_URL` set to your Render backend URL
4. Deploy the site.

## Notes

- Keep `.env` files and API keys out of source control.
- `netlify.toml` also provides a redirect rule for SPA routing.
- `render.yaml` supports monorepo backend deployment.

