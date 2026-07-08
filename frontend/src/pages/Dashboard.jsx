import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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

        <SearchForm />

        <h2 className="text-2xl font-bold mt-12 mb-4">
          Recent Analyses
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <HistoryCard
            company="Tesla"
            recommendation="BUY"
            confidence={92}
          />

          <HistoryCard
            company="Apple"
            recommendation="HOLD"
            confidence={81}
          />

        </div>

      </div>

    </div>
  );
}