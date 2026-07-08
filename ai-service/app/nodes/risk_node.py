from app.services.gemini_service import ask_gemini
import json
import re


def risk_node(state):

    prompt = f"""
You are a financial risk analyst.

Evaluate the overall investment risk.

Financial Score:
{state["financial"]["score"]}

News Sentiment:
{state["news"]["sentiment"]}

News Summary:
{state["news"]["summary"]}

Return ONLY JSON.

{{
  "level":"Low",
  "score":22,
  "summary":"The company has healthy fundamentals with positive recent news."
}}
"""

    response = ask_gemini(prompt)

    cleaned = re.sub(r"```json|```", "", response).strip()

    try:
        risk = json.loads(cleaned)
    except Exception:
        risk = {
            "level": "Medium",
            "score": 50,
            "summary": "Unable to assess risk."
        }

    state["risk"] = risk

    return state