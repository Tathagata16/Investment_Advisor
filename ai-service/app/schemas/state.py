from typing import TypedDict


class InvestmentState(TypedDict):
    company: str
    investmentType: str

    research: dict

    financial: dict

    news: dict

    risk: dict

    decision: dict

    report: str