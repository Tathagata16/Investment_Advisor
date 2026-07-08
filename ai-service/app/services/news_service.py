import os
import requests

from dotenv import load_dotenv

load_dotenv()


def fetch_company_news(company):

    url = "https://newsapi.org/v2/everything"

    response = requests.get(
        url,
        params={
            "q": company,
            "pageSize": 5,
            "sortBy": "publishedAt",
            "language": "en",
            "apiKey": os.getenv("NEWS_API_KEY"),
        },
    )

    articles = response.json().get("articles", [])

    return articles