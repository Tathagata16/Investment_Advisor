import json

from app.services.gemini_service import ask_gemini
import re

def decision_node(state):

    prompt = f"""
You are an experienced investment analyst.

Your task is to analyze the company using the provided research, financial data, news analysis, and risk assessment.

Company:
{state["company"]}

Investment Horizon:
{state["investmentType"]}

==================================================
COMPANY RESEARCH
==================================================

{state["research"]["summary"]}

==================================================
FINANCIAL INFORMATION
==================================================

Company Name:
{state["financial"].get("companyName")}

Current Price:
{state["financial"].get("currentPrice")}

Market Cap:
{state["financial"].get("marketCap")}

P/E Ratio:
{state["financial"].get("peRatio")}

EPS:
{state["financial"].get("eps")}

Revenue:
{state["financial"].get("revenue")}

Net Income:
{state["financial"].get("netIncome")}

Revenue Growth:
{state["financial"].get("revenueGrowth")}

Return on Equity (ROE):
{state["financial"].get("roe")}

Debt to Equity:
{state["financial"].get("debtToEquity")}

Current Ratio:
{state["financial"].get("currentRatio")}

Financial Score:
{state["financial"].get("score")}

==================================================
NEWS ANALYSIS
==================================================

Summary:
{state["news"]["summary"]}

Sentiment:
{state["news"]["sentiment"]}

News Score:
{state["news"]["score"]}

==================================================
RISK ASSESSMENT
==================================================

Risk Level:
{state["risk"]["level"]}

Risk Score:
{state["risk"]["score"]}

Risk Summary:
{state["risk"]["summary"]}

==================================================

Based on ALL the above information:

1. Evaluate the company's financial health.
2. Consider recent news sentiment.
3. Consider the business outlook from the research.
4. Consider the overall investment risk.
5. Provide ONE recommendation.

The recommendation MUST be exactly one of:

BUY
HOLD
SELL

Return ONLY valid JSON.

{{
  "recommendation": "BUY",
  "confidence": 91
}}
"""

    response = ask_gemini(prompt)

    try:
        cleaned = re.sub(r"```json|```", "", response).strip()

        decision = json.loads(cleaned)
    except Exception:

        decision = {
            "recommendation": "HOLD",
            "confidence": 50
        }

    state["decision"] = decision

    return state