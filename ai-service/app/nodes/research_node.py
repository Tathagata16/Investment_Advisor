from app.services.research_service import search_company


def research_node(state):

    results = search_company(state["company"])

    research_text = ""

    sources = []

    for result in results:

        research_text += f"""

Title:
{result["title"]}

Content:
{result["content"]}

"""

        sources.append(result["url"])

    state["research"] = {
        "summary": research_text,
        "sources": sources
    }

    return state