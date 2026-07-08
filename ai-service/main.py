from fastapi import FastAPI
from pydantic import BaseModel

from app.graph.investment_graph import graph

app = FastAPI(title="AI Investment Service")


class AnalysisRequest(BaseModel):
    company: str
    investmentType: str


@app.get("/")
def home():
    return {
        "success": True,
        "message": "AI Service Running"
    }


@app.post("/analyze")
def analyze(request: AnalysisRequest):

    state = {
        "company": request.company,
        "investmentType": request.investmentType,
        "research": {},
        "financial": {},
        "news": {},
        "risk": {},
        "decision": {},
        "report": ""
    }

    result = graph.invoke(state)

    return {
        "recommendation": result["decision"]["recommendation"],
        "confidence": result["decision"]["confidence"],
        "financialScore": result["financial"]["score"],
        "newsScore": result["news"]["score"],
        "riskScore": result["risk"]["score"],
        "report": result["report"]
    }