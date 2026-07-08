import yfinance as yf


def fetch_company_financials(company: str):

    ticker = yf.Ticker(company)

    info = ticker.info

    return {
        "companyName": info.get("longName"),
        "currentPrice": info.get("currentPrice"),
        "marketCap": info.get("marketCap"),
        "peRatio": info.get("trailingPE"),
        "eps": info.get("trailingEps"),
        "dividendYield": info.get("dividendYield"),
        "revenue": info.get("totalRevenue"),
        "netIncome": info.get("netIncomeToCommon"),
        "revenueGrowth": info.get("revenueGrowth"),
        "roe": info.get("returnOnEquity"),
        "debtToEquity": info.get("debtToEquity"),
        "currentRatio": info.get("currentRatio"),
    }