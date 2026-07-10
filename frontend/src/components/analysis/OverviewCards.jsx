const formatMarketCap = (value) => {
  if (!value) return "-";

  if (value >= 1e12)
    return `$${(value / 1e12).toFixed(2)}T`;

  if (value >= 1e9)
    return `$${(value / 1e9).toFixed(2)}B`;

  return `$${value}`;
};

export default function OverviewCards({
  analysis,
}) {
  const cards = [
    {
      title: "Current Price",
      value: `$${analysis.financial.currentPrice}`,
    },
    {
      title: "Market Cap",
      value: formatMarketCap(
        analysis.financial.marketCap
      ),
    },
    {
      title: "P/E Ratio",
      value: analysis.financial.peRatio,
    },
    {
      title: "EPS",
      value: analysis.financial.eps,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mt-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6"
        >

          <p className="text-gray-500 text-sm">

            {card.title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {card.value || "-"}

          </h2>

        </div>

      ))}

    </div>
  );
}