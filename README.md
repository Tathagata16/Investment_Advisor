# AI Investment Research Agent
# link: https://investment-advisor-lime.vercel.app/

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

# LLM chat used to build this project
# link: https://chatgpt.com/share/6a53bc42-8094-83ee-aab0-d371e5e2f537
# link: https://chatgpt.com/share/6a53bf20-acd8-83e8-9a86-6f1fd2dd010b (debug)
# link: https://chatgpt.com/share/6a53bf4a-7ce8-83ee-aced-4bd0ca6186e6

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

# Example AI response on companies:
 (I'm including the report generated by the llm only, other than this, the agent also suggests compact scores on various matrics)
 Investment Report: Tesla (TSLA)
Executive Summary
This report issues a SELL recommendation for Tesla (TSLA) with a confidence level of 85%. While the company demonstrates strong operational capabilities, reflected in a Financial Score of 80 and record Q2 deliveries, current market sentiment and inherent risks significantly outweigh these positives. The News Score of 40 indicates prevailing negative sentiment, largely driven by regulatory hurdles for key initiatives and increasing institutional investor hesitancy concerning leadership. The overall risk level is High, with a Risk Score of 80, driven by the discrepancy between robust performance and declining stock price, significant regulatory challenges, and a growing institutional aversion to Musk-led ventures. Investors are advised to divest given the current risk-reward profile.

Company Overview
Tesla, Inc. (TSLA) is an American multinational automotive and clean energy company headquartered in Austin, Texas. Tesla designs and manufactures electric vehicles (EVs), battery energy storage from home to grid-scale, solar panels and related products, and other associated products and services. Its primary segments include Automotive and Energy Generation and Storage. The company is a recognized leader in the global EV market and is increasingly focusing on autonomous driving technology (Full Self-Driving - FSD) and future Robotaxi services, as well as artificial intelligence (AI) applications.

Financial Analysis
Financial Score: 80
Tesla's financial performance remains robust, characterized by strong revenue growth and healthy profitability margins within its core automotive segment.
The company reported record Q2 deliveries, demonstrating continued operational efficiency and demand for its electric vehicles globally. This operational strength underscores Tesla's capabilities in manufacturing and market penetration.
Cash flow generation remains strong, supporting ongoing investments in manufacturing expansion, battery technology, and autonomous driving research and development.
Despite these strong underlying financials, the stock's sharp decline following robust results signals broader investor concerns that are currently overshadowing fundamental financial success. This suggests that the market is re-evaluating valuation metrics or discounting future growth potential due to external factors.
News Analysis
News Score: 40
The market sentiment surrounding Tesla is currently predominantly negative, as indicated by a News Score of 40.
Recent news cycles have highlighted significant regulatory challenges for the key Robotaxi initiative, raising questions about the timeline and viability of this future revenue stream. These regulatory hurdles are perceived as substantial roadblocks to realizing a core long-term growth driver.
There is a growing segment of institutional investors actively avoiding Musk-led companies, not just Tesla. This avoidance is attributed to concerns over corporate governance, leadership distractions, and unpredictable public statements, contributing to persistent selling pressure or lack of new investment.
Despite positive operational news like record deliveries, the market's reaction has been largely negative, leading to stock price depreciation. This divergence suggests that sentiment-driven factors are currently more influential than fundamental operational achievements.
Risk Assessment
Risk Level: High
Risk Score: 80
Valuation Concerns: Despite a recent price correction, Tesla's valuation remains elevated by traditional automotive industry standards, potentially leaving it vulnerable to further adjustments if growth expectations are not met or market sentiment deteriorates further.
Regulatory Headwinds: The ambitious Robotaxi initiative faces significant regulatory challenges globally, which could delay or even prevent its widespread deployment, impacting a key future growth narrative.
Leadership-Related Risks: The perceived distractions and controversial public persona of CEO Elon Musk continue to be a source of concern for investors. A growing segment of institutional investors is actively avoiding Musk-led companies, posing a structural headwind for capital inflow.
Increased Competition: The EV market is becoming increasingly competitive, with traditional automakers and new entrants rapidly expanding their electric vehicle offerings, potentially eroding Tesla's market share and pricing power over time.
Technological Execution Risk: While FSD technology is a core differentiator, the full realization and regulatory approval of true Level 4/5 autonomous driving remain uncertain and technologically challenging.
Market Disconnect: The stock's sharp decline on robust operational results signals a significant disconnect between performance and investor confidence, indicating a broader re-evaluation of the company's future trajectory and inherent risks.
Opportunities
Continued EV Market Growth: The global transition to electric vehicles remains a powerful secular trend, providing a large and expanding addressable market for Tesla's core products.
Energy Storage Expansion: Tesla's energy generation and storage division, particularly Powerwall and Megapack, presents a significant growth opportunity, capitalizing on increasing demand for renewable energy solutions and grid stability.
Technological Leadership: Tesla continues to be at the forefront of battery technology, manufacturing innovation, and AI development for autonomous driving, which could yield long-term competitive advantages.
Brand Strength and Ecosystem: The strong brand loyalty and integrated ecosystem of charging infrastructure, software updates, and advanced technology offer a sticky customer base and potential for recurring revenue.
Long-Term Outlook
The long-term outlook for Tesla is characterized by both immense potential and significant uncertainty. While the company is well-positioned within the burgeoning EV and renewable energy sectors, the realization of its more ambitious projects, particularly Robotaxi, is heavily dependent on overcoming regulatory hurdles and achieving technological perfection. The current market reaction, where strong operational performance is met with stock depreciation, suggests that investors are increasingly discounting future potential due to present risks, especially those related to leadership and execution on complex, regulated initiatives. Unless there's a clear resolution to the regulatory issues surrounding Robotaxi and a significant improvement in institutional investor sentiment, the stock is likely to remain under pressure. The current high risk profile and negative sentiment outweigh the long-term potential for the foreseeable future.

Final Recommendation
Recommendation: SELL

Confidence: 85%

Based on our comprehensive analysis, we maintain a SELL recommendation for TSLA. Despite the company's strong operational performance and a healthy Financial Score of 80, the prevailing negative sentiment (News Score of 40) and high inherent risks (Risk Level: High, Risk Score: 80) necessitate this cautious stance. The market's adverse reaction to positive operational news, coupled with significant regulatory challenges for the Robotaxi initiative and growing institutional investor avoidance of Musk-led companies, indicates that a re-evaluation of Tesla's risk premium is underway. Investors are advised to divest existing positions to mitigate exposure to what appears to be a period of significant uncertainty and potential further downside.


Investment Report: Apple Inc. (AAPL)
1. Executive Summary
This report provides a comprehensive analysis of Apple Inc. (AAPL), leading to a strong BUY recommendation. With an impressive Financial Score of 90 and a News Score of 88, the company demonstrates exceptional operational strength and a positive market sentiment. The investment is characterized by a Low Risk Level (Risk Score: 22), underpinned by robust financial health, continuous positive developments across its key sectors, and an optimistic market outlook. Our confidence in this recommendation stands at 91%, reflecting Apple's enduring innovation, market leadership, and sustainable growth trajectory.

2. Company Overview
Apple Inc. (AAPL) is a global leader in consumer electronics, software, and online services. Headquartered in Cupertino, California, the company designs, manufactures, and markets smartphones (iPhone), personal computers (Mac), tablets (iPad), wearables and accessories (Apple Watch, AirPods), and provides a wide range of related services. Apple is renowned for its innovative product design, premium brand positioning, robust ecosystem, and strong customer loyalty. Its diversified revenue streams across hardware and high-margin services continue to solidify its dominant position in the technology industry.

3. Financial Analysis
Apple's financial performance is exceptionally strong, earning a Financial Score of 90. This high score reflects:

Robust Revenue Growth: Consistent top-line expansion driven by sustained demand for its flagship products and continuous growth in its Services segment.
Exceptional Profitability: High gross margins and efficient operational management translate into strong net income and earnings per share.
Healthy Balance Sheet: A substantial cash reserve and manageable debt levels provide significant financial flexibility for innovation, acquisitions, and shareholder returns.
Strong Cash Flow Generation: Significant operating cash flow fuels ongoing R&D, capital expenditures, and substantial capital return programs (dividends and share repurchases).
Efficient Asset Utilization: Demonstrates effective management of its assets to generate revenue and profit.
Overall, Apple exhibits very strong financial health, underpinning its resilience and capacity for future growth.

4. News Analysis
The news surrounding Apple Inc. is overwhelmingly positive, reflected in a News Score of 88. Recent developments and market sentiment indicate:

Continuous Innovation: Positive reception for recent product launches and updates, including advancements in the iPhone lineup, Mac series, and wearables. Excitement around new product categories like Apple Vision Pro also contributes significantly.
Services Segment Growth: Strong performance and expanding subscriber base for high-margin services such as Apple Music, iCloud, Apple TV+, and the App Store.
Strategic AI Integration: Positive buzz surrounding Apple's initiatives to integrate advanced Artificial Intelligence capabilities across its ecosystem, promising enhanced user experiences and competitive advantage.
Market Expansion and Share Gains: Continued strong performance in key international markets and robust demand in established regions.
Supply Chain Optimization: Evidence of effective management of global supply chain challenges, ensuring product availability.
These positive developments are fueling an optimistic market outlook for AAPL's future performance.

5. Risk Assessment
The investment in Apple Inc. is assessed as Low Risk, with a Risk Score of 22.

Risk Level: Low
Risk Score: 22
Risk Summary: The investment exhibits very strong financial health, reinforced by positive developments across key sectors and an optimistic market outlook. Apple's dominant market position, robust brand loyalty, and diversified revenue streams contribute significantly to its low-risk profile. While no investment is entirely risk-free, Apple's substantial cash reserves and proven ability to navigate economic cycles provide a strong buffer. Potential risks, such as increased regulatory scrutiny, intense competition, or supply chain disruptions, are well-managed by the company's proactive strategies and formidable market power, making their overall impact on the investment relatively low.

6. Opportunities
Apple's future growth potential is substantial, driven by several key opportunities:

Services Ecosystem Expansion: Continued growth in its high-margin services segment, with potential for new offerings and deeper integration.
Emerging Markets Penetration: Significant room for expansion in developing economies where smartphone adoption and brand loyalty can still be cultivated.
New Product Categories: Successful commercialization and wider adoption of new product categories like augmented/virtual reality (e.g., Apple Vision Pro) could open vast new revenue streams.
AI Integration and Innovation: Leveraging AI to enhance existing products and services, creating new differentiating features, and maintaining a technological edge.
Wearables and Health Technology: Continued innovation and expansion in the wearables market, particularly with the Apple Watch, focusing on health and fitness monitoring.
Enterprise Market: Opportunities to further penetrate the enterprise market with its devices and services, building on its strong reputation for security and ease of use.
7. Long-Term Outlook
The long-term outlook for Apple Inc. is exceptionally positive. The company's relentless focus on innovation, coupled with its unparalleled brand strength and sticky ecosystem, positions it for sustained leadership in the technology sector. We anticipate continued growth in its core product categories, driven by regular refresh cycles and technological advancements. The high-margin Services segment is expected to be a significant growth engine, further enhancing profitability and diversifying revenue streams. Apple's strong financial position and disciplined capital allocation strategy provide a solid foundation for future investments and shareholder returns. Its ability to attract and retain talent, adapt to market shifts, and maintain a premium brand image ensures its relevance and profitability for years to come.

8. Final Recommendation
Recommendation: BUY Confidence: 91%

Based on our comprehensive analysis, we strongly recommend a BUY rating for Apple Inc. (AAPL). The company presents an attractive investment opportunity due to its:

Exceptional Financial Health (Financial Score: 90)
Positive Market Sentiment and Continuous Innovation (News Score: 88)
Low Risk Profile (Risk Score: 22)
Robust Long-Term Growth Opportunities
Apple's proven track record of innovation, dominant market position, strong brand loyalty, and significant financial strength make it a cornerstone investment. The identified opportunities, coupled with a well-managed risk profile, provide a compelling case for capital appreciation and long-term value creation.

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
