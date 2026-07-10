import React from "react";

export default function GaugeSection({ analysis }) {
  const metrics = [
    { 
      title: "Financial Score", 
      value: analysis?.financial?.score ?? 0, 
      accentClass: "from-blue-500/10 to-transparent",
      textClass: "text-blue-600"
    },
    { 
      title: "News Score", 
      value: analysis?.news?.score ?? 0, 
      accentClass: "from-purple-500/10 to-transparent",
      textClass: "text-purple-600"
    },
    { 
      title: "Risk Score", 
      value: analysis?.risk?.score ?? 0, 
      accentClass: "from-orange-500/10 to-transparent",
      textClass: "text-orange-600"
    },
    { 
      title: "Confidence", 
      value: analysis?.confidence ?? 0, 
      accentClass: "from-emerald-500/10 to-transparent",
      textClass: "text-emerald-600"
    },
  ];

  const getStatus = (value) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Average";
    return "Poor";
  };

  const getStatusColor = (value) => {
    if (value >= 80) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (value >= 60) return "bg-blue-50 text-blue-700 border-blue-100";
    if (value >= 40) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-rose-50 text-rose-700 border-rose-100";
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
          Overall Performance Metrics
        </h2>
        <p className="text-xs text-gray-400">
          Real-time multi-dimensional assessment scorecards.
        </p>
      </div>

      {/* Locked 2x2 Grid System */}
      <div className="grid grid-cols-2 gap-4 grow">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:shadow-md hover:border-gray-200"
          >
            {/* Subtle aesthetic gradient accent */}
            <div className={`absolute inset-0 bg-linear-to-br ${metric.accentClass} opacity-40 pointer-events-none`} />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {metric.title}
                </span>
                <span className="text-3xl font-light tracking-tight text-gray-900">
                  {Math.round(metric.value)}
                  <span className="text-xs text-gray-400 font-normal ml-0.5">/100</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusColor(
                    metric.value
                  )}`}
                >
                  {getStatus(metric.value)}
                </span>
                
                {/* Micro visual indicator bar */}
                <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-current ${metric.textClass}`} 
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}