from langgraph.graph import StateGraph, END

from app.schemas.state import InvestmentState

from app.nodes.research_node import research_node
from app.nodes.financial_node import financial_node
from app.nodes.news_node import news_node
from app.nodes.risk_node import risk_node
from app.nodes.decision_node import decision_node
from app.nodes.report_node import report_node


builder = StateGraph(InvestmentState)

builder.add_node("research", research_node)
builder.add_node("financial", financial_node)
builder.add_node("news", news_node)
builder.add_node("risk", risk_node)
builder.add_node("decision", decision_node)
builder.add_node("report", report_node)

builder.set_entry_point("research")

builder.add_edge("research", "financial")
builder.add_edge("financial", "news")
builder.add_edge("news", "risk")
builder.add_edge("risk", "decision")
builder.add_edge("decision", "report")
builder.add_edge("report", END)

graph = builder.compile()