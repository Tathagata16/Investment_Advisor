import json

from app.services.gemini_service import ask_gemini
import re

def decision_node(state):

    prompt = f"""
You are a professional investment analyst.

Company:
{state['company']}

Investment Horizon:
{state['investmentType']}

Financial Score:
{state['financial']['score']}

News Score:
{state['news']['score']}

Risk Score:
{state['risk']['score']}

Respond ONLY in valid JSON.

Format:

{{
    "recommendation":"BUY",
    "confidence":88
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