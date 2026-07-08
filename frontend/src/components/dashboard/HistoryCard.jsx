import { useNavigate } from "react-router-dom";

export default function HistoryCard({ analysis }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/analysis/${analysis._id}`)}
      className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="font-bold">
        {analysis.company}
      </h2>

      <p className="mt-2">
        {analysis.recommendation}
      </p>

      <p>
        Confidence {analysis.confidence}%
      </p>
    </div>
  );
}