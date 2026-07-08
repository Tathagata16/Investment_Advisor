import { useLocation, Navigate } from "react-router-dom";

export default function Analysis() {
  const { state } = useLocation();

  if (!state?.analysis) {
    return <Navigate to="/dashboard" replace />;
  }

  const { analysis } = state;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold">
          {analysis.company}
        </h1>

        <p className="text-xl mt-2">
          Recommendation:
          <span className="font-bold ml-2">
            {analysis.recommendation}
          </span>
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold">
              Financial Score
            </h3>

            <p className="text-3xl mt-2">
              {analysis.financialScore}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold">
              News Score
            </h3>

            <p className="text-3xl mt-2">
              {analysis.newsScore}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold">
              Risk Score
            </h3>

            <p className="text-3xl mt-2">
              {analysis.riskScore}
            </p>
          </div>

        </div>

        <div className="bg-white rounded shadow p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Report
          </h2>

          <pre className="whitespace-pre-wrap font-sans">
            {analysis.report}
          </pre>

        </div>

      </div>

    </div>
  );
}