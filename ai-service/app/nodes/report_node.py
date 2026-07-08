from app.services.gemini_service import ask_gemini


def report_node(state):

    prompt = f"""
Generate a detailed investment report.

Company:
{state['company']}

Recommendation:
{state['decision']['recommendation']}

Confidence:
{state['decision']['confidence']}

Financial Score:
{state['financial']['score']}

News Score:
{state['news']['score']}

Risk Score:
{state['risk']['score']}

Write:

1. Executive Summary

2. Financial Analysis

3. News Analysis

4. Risk Analysis

5. Final Verdict

Use markdown formatting.
"""

    state["report"] = ask_gemini(prompt)

    return state