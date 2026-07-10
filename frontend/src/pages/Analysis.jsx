import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { getAnalysisById } from "../services/analysisService";
import AnalysisHeader from "../components/analysis/AnalysisHeader";
import OverviewCards from "../components/analysis/OverviewCards";
import ScoreCards from "../components/analysis/ScoreCards";
import GaugeSection from "../components/analysis/GaugeSection";
import RecommendationCard from "../components/analysis/RecommendationCard";
import DecisionPipeline from "../components/analysis/DecisionPipeline";
import ReportSection from "../components/analysis/ReportSection";

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

            <div className="w-full max-w-375 mx-auto">

                <AnalysisHeader analysis={analysis} />

                <OverviewCards analysis={analysis} />

                {/* <ScoreCards analysis={analysis} /> */}

                <div className="grid grid-cols-12 gap-8 mt-8">

                    <div className="col-span-8">
                        <GaugeSection analysis={analysis} />
                    </div>

                    <div className="col-span-4">
                        <RecommendationCard analysis={analysis} />
                    </div>

                </div>
                <DecisionPipeline />



                <ReportSection analysis={analysis} />

            </div>

        </div>
    );
}