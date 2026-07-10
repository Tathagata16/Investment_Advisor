export default function AnalysisHeader({ analysis }) {
  const recommendationColors = {
    BUY: "bg-green-100 text-green-700",
    HOLD: "bg-yellow-100 text-yellow-700",
    SELL: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-4xl font-bold">
            {analysis.financial.companyName}
          </h1>

          <p className="mt-2 text-gray-500">

            {analysis.financial.sector}

            {" • "}

            {analysis.financial.industry}

          </p>

        </div>

        <div className="text-right">

          <span
            className={`px-4 py-2 rounded-full font-bold ${
              recommendationColors[
                analysis.recommendation
              ]
            }`}
          >
            {analysis.recommendation}
          </span>

          <p className="mt-4 text-gray-600">
            Confidence
          </p>

          <h2 className="text-3xl font-bold">
            {analysis.confidence}%
          </h2>

        </div>

      </div>

    </div>
  );
}