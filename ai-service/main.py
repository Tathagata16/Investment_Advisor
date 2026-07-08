from fastapi import FastAPI
from pydantic import BaseModel

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

    return {
        "recommendation": "BUY",
        "confidence": 91,
        "financialScore": 88,
        "newsScore": 84,
        "riskScore": 22,
        "report": f"Mock AI report generated for {request.company}."
    }