from app.services.finance_service import fetch_company_financials


def calculate_score(data):

    score = 50

    pe = data.get("peRatio")

    if pe and pe < 25:
        score += 10

    growth = data.get("revenueGrowth")

    if growth and growth > 0:
        score += 10

    roe = data.get("roe")

    if roe and roe > 0.15:
        score += 10

    debt = data.get("debtToEquity")

    if debt and debt < 100:
        score += 10

    current = data.get("currentRatio")

    if current and current > 1:
        score += 10

    return min(score, 100)


def financial_node(state):

    financial = fetch_company_financials(state["company"])

    financial["score"] = calculate_score(financial)

    state["financial"] = financial

    return state