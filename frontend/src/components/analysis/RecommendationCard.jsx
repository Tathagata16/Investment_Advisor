import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMinus,
} from "react-icons/fa6";

export default function RecommendationCard({ analysis }) {
  const recommendation = analysis.recommendation;

  const config = {
    BUY: {
      icon: <FaArrowTrendUp size={26} />,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },

    HOLD: {
      icon: <FaMinus size={24} />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },

    SELL: {
      icon: <FaArrowTrendDown size={26} />,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  };

  const current = config[recommendation];

  return (
    <div
      className={`bg-white rounded-2xl border ${current.border} p-8 h-inherit`}
    >
      <div
        className={`w-14 h-14 rounded-xl ${current.bg} flex items-center justify-center ${current.color}`}
      >
        {current.icon}
      </div>

      <h3 className="mt-6 text-gray-500">
        AI Recommendation
      </h3>

      <h1
        className={`text-5xl font-bold mt-2 ${current.color}`}
      >
        {recommendation}
      </h1>

      <div className="mt-6">

        <p className="text-gray-500">
          Confidence
        </p>

        <h2 className="text-3xl font-bold">
          {analysis.confidence}%
        </h2>

      </div>

      <div className="mt-8">

        <p className="font-semibold mb-3">
          Decision Based On
        </p>

        <ul className="space-y-2 text-gray-600">

          <li>• Financial Analysis</li>

          <li>• Company Research</li>

          <li>• News Sentiment</li>

          <li>• Risk Assessment</li>

        </ul>

      </div>

    </div>
  );
}