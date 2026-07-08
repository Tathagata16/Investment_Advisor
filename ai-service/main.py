from fastapi import FastAPI

app = FastAPI(title="AI Investment Service")


@app.get("/")
def home():
    return {
        "success": True,
        "message": "AI Service Running"
    }