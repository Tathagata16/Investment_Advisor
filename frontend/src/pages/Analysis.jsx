import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAnalysisById } from "../services/analysisService";

export default function Analysis() {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const token = localStorage.getItem("token");

                const data = await getAnalysisById(id, token);

                setAnalysis(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAnalysis();
    }, [id]);

    if (!analysis) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}


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