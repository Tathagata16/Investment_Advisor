import {
  FaCheckCircle,
  FaSearch,
  FaChartLine,
  FaNewspaper,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";

const pipeline = [
  {
    title: "Company Research",
    description: "Collected company information using Tavily Search.",
    icon: <FaSearch />,
  },
  {
    title: "Financial Analysis",
    description: "Evaluated financial metrics from Yahoo Finance.",
    icon: <FaChartLine />,
  },
  {
    title: "News Analysis",
    description: "Analyzed recent company news and sentiment.",
    icon: <FaNewspaper />,
  },
  {
    title: "Risk Assessment",
    description: "Estimated overall investment risk.",
    icon: <FaShieldAlt />,
  },
  {
    title: "AI Recommendation",
    description: "Generated final recommendation using Gemini.",
    icon: <FaRobot />,
  },
];

export default function DecisionPipeline() {
  return (
    <section className="mt-10 bg-white rounded-2xl border border-gray-200 p-8">

      <h2 className="text-2xl font-semibold mb-8">
        Decision Pipeline
      </h2>

      <div className="space-y-5">

        {pipeline.map((step, index) => (
          <div key={step.title}>

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <FaCheckCircle />
              </div>

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <span className="text-gray-700">
                    {step.icon}
                  </span>

                  <h3 className="font-semibold">
                    {step.title}
                  </h3>

                </div>

                <p className="text-gray-500 text-sm mt-1">
                  {step.description}
                </p>

              </div>

            </div>

            {index !== pipeline.length - 1 && (
              <div className="ml-5 mt-2 mb-2 border-l-2 border-dashed border-gray-300 h-6" />
            )}

          </div>
        ))}

      </div>

    </section>
  );
}