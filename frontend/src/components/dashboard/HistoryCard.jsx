export default function HistoryCard({
  company,
  recommendation,
  confidence,
}) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="font-bold">
        {company}
      </h3>

      <p>{recommendation}</p>

      <p>{confidence}% Confidence</p>

    </div>
  );
}