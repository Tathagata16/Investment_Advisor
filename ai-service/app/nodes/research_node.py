def research_node(state):

    company = state["company"]

    state["research"] = {
        "company": company,
        "status": "Research completed"
    }

    return state