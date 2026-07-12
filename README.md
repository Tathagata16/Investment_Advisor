# AI Investment Research Agent

> **AI-powered investment research platform built with MERN, FastAPI,
> LangGraph and Google Gemini.**

## Overview

AI Investment Research Agent is a full-stack web application that
analyzes publicly traded companies and generates explainable investment
recommendations using an LLM-driven workflow.

The project follows a **hybrid microservice architecture**:

-   **Frontend (React)** -- Dashboard, authentication, history, reports
-   **Backend (Node.js/Express)** -- Authentication, MongoDB, REST APIs,
    PDF generation
-   **AI Service (FastAPI)** -- LangGraph orchestration, Gemini
    reasoning, financial/news/risk analysis

Instead of acting like a chatbot, the application follows a structured
investment research pipeline that: 1. Researches the selected company 2.
Retrieves financial information 3. Analyzes recent news sentiment 4.
Performs risk assessment 5. Generates an explainable recommendation 6.
Produces a detailed Markdown report 7. Stores the analysis for future
access

------------------------------------------------------------------------

# Features

## Authentication

-   JWT Authentication
-   User Signup & Login
-   Protected Routes
-   Persistent Login Session

## Investment Analysis

-   Company autocomplete search
-   Long-term and Short-term investment analysis
-   Company research
-   Financial analysis
-   News sentiment analysis
-   Risk assessment
-   Explainable AI recommendation
-   Confidence score

## Dashboard

-   Company overview
-   Recommendation card
-   Financial overview cards
-   Semi-circular gauge charts
-   Decision pipeline visualization
-   Markdown AI report
-   Analysis history

## Reports

-   PDF report download
-   Stored reports
-   View previous analyses

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   Axios
-   React Markdown
-   React Gauge Component
-   React Icons

## Backend

-   Node.js
-   Express.js
-   MongoDB Atlas
-   Mongoose
-   JWT
-   Multer
-   PDFKit

## AI Service

-   FastAPI
-   LangChain
-   LangGraph
-   Google Gemini
-   Tavily Search
-   Yahoo Finance
-   News API

------------------------------------------------------------------------

# System Architecture

``` text
                 React (Vercel)
                        │
                        ▼
            Express Backend (Railway)
                        │
        ┌───────────────┴───────────────┐
        │                               │
 MongoDB Atlas                 FastAPI AI Service
                                       │
                                LangGraph Workflow
                                       │
        Yahoo Finance • News API • Tavily Search
                                       │
                                 Google Gemini
```

------------------------------------------------------------------------

# LangGraph Workflow

``` text
START
  │
  ▼
Company Research
  │
  ▼
Financial Analysis
  │
  ▼
News Analysis
  │
  ▼
Risk Assessment
  │
  ▼
Investment Decision
  │
  ▼
Report Generation
  │
  ▼
END
```

------------------------------------------------------------------------

# Folder Structure

``` text
investment-advisor/

├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│
└── ai-service/
    ├── app/
    │   ├── graph/
    │   ├── nodes/
    │   ├── prompts/
    │   └── services/
    ├── state.py
    ├── main.py
    └── requirements.txt
```

------------------------------------------------------------------------

# REST API

## Authentication

    POST /api/v1/auth/signup
    POST /api/v1/auth/login

## User

    GET /api/v1/user/profile

## Companies

    GET /api/v1/company/search

## Analysis

    POST /api/v1/analysis
    GET  /api/v1/analysis/history
    GET  /api/v1/analysis/:id
    GET  /api/v1/analysis/:id/pdf

------------------------------------------------------------------------

# How to set up

git clone <repository-url>

cd Investment_Advisor

## Frontend

``` bash
cd frontend
npm install

npm run dev
```

## Backend

``` bash
cd backend
npm install

npm run dev
```

## AI Service

``` bash
cd ai-service

python -m venv venv

pip install -r requirements.txt

uvicorn main:app --reload
```

------------------------------------------------------------------------

# Environment Variables

## Frontend

``` env
VITE_API_URL=
```

## Backend

``` env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
AI_SERVICE_URL=
```

## AI Service

``` env
GEMINI_API_KEY=
NEWS_API_KEY=
TAVILY_API_KEY=
```

------------------------------------------------------------------------

# Deployment

-   Frontend → Vercel
-   Backend → Railway
-   AI Service → Railway
-   Database → MongoDB Atlas

------------------------------------------------------------------------


# Design Decisions & Trade-offs

### 1. Hybrid Architecture (Node.js + Python)

**Decision:**  
The application is split into two backend services:
- **Node.js (Express):** Authentication, REST APIs, MongoDB, PDF generation, and business logic.
- **Python (FastAPI):** AI orchestration using LangGraph, LangChain, and Google Gemini.

**Why?**
- Python has a richer AI ecosystem.
- Node.js integrates naturally with the MERN stack.
- Keeps AI logic isolated from application logic.

**Trade-off**
- ✅ Better separation of concerns
- ✅ Independent deployment and scaling
- ❌ Requires maintaining two backend services

---

### 2. Dedicated AI Microservice

**Decision:**  
The AI workflow runs as a separate FastAPI service instead of being embedded inside the Express backend.

**Why?**
- Keeps the backend lightweight.
- AI components can evolve independently.
- Makes future migration to dedicated AI infrastructure easier.

**Trade-off**
- ✅ Cleaner architecture
- ✅ Easier maintenance
- ❌ Additional network request between backend and AI service

---

### 3. Sequential LangGraph Workflow

**Decision:**  
The LangGraph pipeline executes sequentially:

```
Research
→ Financial Analysis
→ News Analysis
→ Risk Assessment
→ Investment Decision
→ Report Generation
```

**Why?**
- Easier to understand and debug.
- Sufficient for the current project scope.

**Trade-off**
- ✅ Simpler implementation
- ✅ Easier debugging
- ❌ Slightly slower than parallel execution

---

### 4. Explainable AI

**Decision:**  
The application exposes intermediate reasoning instead of returning only a BUY/HOLD/SELL recommendation.

**Why?**
Investment decisions should be transparent and interpretable.

**Trade-off**
- ✅ Higher user trust
- ✅ Better demonstration of AI reasoning
- ❌ Larger response payloads

---

### 5. Persistent Analysis History

**Decision:**  
Every completed investment analysis is stored in MongoDB.

**Why?**
Allows users to revisit previous reports without triggering another AI analysis.

**Trade-off**
- ✅ Reduced AI API usage
- ✅ Faster access to previous analyses
- ❌ Increased database storage requirements

---

### 6. Server-side PDF Generation

**Decision:**  
PDF reports are generated by the Express backend using PDFKit.

**Why?**
Ensures consistent formatting and keeps document generation independent of the frontend.

**Trade-off**
- ✅ Consistent report generation
- ✅ Easier future integrations (emailing, sharing)
- ❌ Slight increase in backend workload

---

### 7. Company Autocomplete Using Yahoo Finance

**Decision:**  
Company search is powered by Yahoo Finance instead of maintaining a custom company database.

**Why?**
Provides live company information and ticker symbols without managing additional data.

**Trade-off**
- ✅ Always up-to-date
- ✅ No database maintenance
- ❌ Dependent on an external service

---

### 8. Dashboard-Based User Interface

**Decision:**  
Investment results are presented through a dashboard instead of a conversational chatbot interface.

**Why?**
Financial insights are easier to understand through structured visual components such as cards, gauges, and metrics.

**Trade-off**
- ✅ Professional user experience
- ✅ Improved readability
- ❌ Higher frontend development effort

---

### 9. Markdown-Based AI Reports

**Decision:**  
The AI service generates reports in Markdown format, which are rendered on the frontend.

**Why?**
Produces structured, readable reports with headings, lists, and formatting.

**Trade-off**
- ✅ Better readability
- ✅ Flexible formatting
- ❌ Requires Markdown rendering support

---

### 10. Environment-Based Configuration

**Decision:**  
All API endpoints, secrets, and service URLs are managed through environment variables.

**Why?**
Allows the same codebase to work across local development and production environments.

**Trade-off**
- ✅ Improved security
- ✅ Easier deployment
- ❌ Requires proper environment configuration

------------------------------------------------------------------------

# Future Improvements

-   Document-based RAG (currently on hold)
-   Parallel LangGraph execution
-   Live execution pipeline
-   Streaming LLM responses
-   Company comparison
-   Portfolio tracking
-   Watchlist
-   Dark mode
-   Interactive financial charts

------------------------------------------------------------------------

# Disclaimer

This project is intended for educational and demonstration purposes
only. It does not constitute financial advice. Always perform
independent research before making investment decisions.
