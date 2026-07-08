import os

from tavily import TavilyClient

from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


def search_company(company):

    response = client.search(
        query=f"{company} company overview business latest developments",
        search_depth="advanced",
        max_results=5
    )

    return response["results"]