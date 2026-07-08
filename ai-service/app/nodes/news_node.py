from app.services.news_service import fetch_company_news
from app.services.gemini_service import ask_gemini


def news_node(state):

    articles = fetch_company_news(state["company"])

    text = ""

    for article in articles:

        text += f"""
Title:
{article.get("title")}

Description:
{article.get("description")}
"""

    prompt = f"""
Analyze the following recent news about the company.

{text}

Return ONLY JSON.

{{
    "summary":"...",
    "sentiment":"Positive",
    "score":82
}}
"""

    response = ask_gemini(prompt)

    import json
    import re

    cleaned = re.sub(r"```json|```", "", response).strip()

    try:
        news = json.loads(cleaned)

    except Exception:

        news = {
            "summary": "Unable to analyze news.",
            "sentiment": "Neutral",
            "score": 50
        }

    state["news"] = news

    return state