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

Risk Assessment

Risk Level:
{state["risk"]["level"]}

Risk Score:
{state["risk"]["score"]}

Risk Summary:
{state["risk"]["summary"]}

Write:

1. Executive Summary

2. Company Overview

3. Financial Analysis

4. News Analysis

5. Risk Assessment

6. Opportunities

7. Long-Term Outlook

8. Final Recommendation

Use markdown formatting.
"""

    state["report"] = ask_gemini(prompt)

    return state