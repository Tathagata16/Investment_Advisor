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

# Dashboard

-   Company overview
-   Current price
-   Market cap
-   P/E ratio
-   EPS
-   Recommendation card
-   Gauge metrics
-   Decision pipeline
-   Expandable markdown report
-   PDF download

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

create a .env file:
VITE_API_URL=http://localhost:5000/api/v1

npm run dev
```

## Backend

``` bash
cd backend
npm install

create a .env
PORT=5000

MONGO_URI=<your-mongodb-uri>

JWT_SECRET=<your-secret>

CLIENT_URL=http://localhost:5173

AI_SERVICE_URL=http://localhost:8000


npm run dev
```

## AI Service

``` bash
cd ai-service

python -m venv venv

pip install -r requirements.txt

create a .env file:
GEMINI_API_KEY=<your-api-key>

NEWS_API_KEY=<your-api-key>

TAVILY_API_KEY=<your-api-key>

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

# Design Decisions

-   Hybrid Node.js + Python architecture
-   Separate AI microservice
-   Sequential LangGraph workflow for maintainability
-   Explainable AI outputs
-   Persistent analysis history
-   Server-side PDF generation

------------------------------------------------------------------------

# Disclaimer

This project is intended for educational and demonstration purposes
only. It does not constitute financial advice. Always perform
independent research before making investment decisions.
