import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { getHistory } from "../services/analysisService";
import { analyzeCompany } from "../services/analysisService";
import { AuthContext } from "../context/AuthContext";

import SearchForm from "../components/dashboard/SearchForm";
import HistoryCard from "../components/dashboard/HistoryCard";

export default function Dashboard() {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    //analyze function
    const handleAnalyze = async ({
        symbol,
        companyName,
        investmentType,
        file,
    }) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("company", symbol);
            formData.append("investmentType", investmentType);

            if (file) {
                formData.append("document", file);
            }

            const analysis = await analyzeCompany(formData, token);

            navigate(`/analysis/${analysis._id}`);
        } catch (err) {
            alert(err.response?.data?.message || "Analysis failed.");
        } finally {
            setLoading(false);
        }
    };

    //getting history function..
    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("token");

                const data = await getHistory(token);

                setHistory(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchHistory();

    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow">

                <div className="max-w-6xl mx-auto flex justify-between items-center p-5">

                    <h1 className="text-2xl font-bold">
                        AI Investment Advisor
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </header>

            <div className="max-w-6xl mx-auto mt-10">

                <h2 className="text-3xl font-bold">
                    Welcome, {user?.name}
                </h2>

                <p className="text-gray-600 mb-8">
                    Analyze any publicly listed company using AI.
                </p>

                {
                    loading && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                            <p className="font-medium">
                                Analyzing company...
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                                Fetching financial data, researching recent news, generating AI recommendation...
                            </p>
                        </div>
                    )
                }
                <SearchForm onAnalyze={handleAnalyze} />

                <h2 className="text-2xl font-bold mt-12 mb-4">
                    Recent Analyses
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    {
                        history.map((analysis) => (

                            <HistoryCard

                                key={analysis._id}

                                analysis={analysis}

                            />

                        ))
                    }

                </div>

            </div>

        </div>
    );
}