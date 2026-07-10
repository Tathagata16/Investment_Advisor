import {
    FaChartLine,
    FaNewspaper,
    FaShieldAlt,
    FaBullseye,
} from "react-icons/fa";

export default function ScoreCards({ analysis }) {

    const cards = [
        {
            title: "Financial Score",
            value: analysis.financial.score,
            icon: <FaChartLine size={26} />,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            title: "News Score",
            value: analysis.news.score,
            icon: <FaNewspaper size={26} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Risk Score",
            value: analysis.risk.score,
            icon: <FaShieldAlt size={26} />,
            color: "text-red-600",
            bg: "bg-red-50",
        },
        {
            title: "Confidence",
            value: analysis.confidence,
            icon: <FaBullseye size={26} />,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    const getLabel = (value) => {

        if (value >= 80)
            return "Excellent";

        if (value >= 60)
            return "Good";

        if (value >= 40)
            return "Average";

        return "Poor";

    };

    return (

        <div className="grid grid-cols-4 gap-6 mt-8">

            {
                cards.map(card => (

                    <div
                        key={card.title}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                    >

                        <div
                            className={`${card.bg} ${card.color} w-14 h-14 rounded-xl flex items-center justify-center`}
                        >
                            {card.icon}
                        </div>

                        <h3 className="mt-5 text-gray-500 font-medium">
                            {card.title}
                        </h3>

                        <h1 className="text-5xl font-bold mt-3">
                            {card.value}
                        </h1>

                        <p className="mt-3 text-sm text-gray-500">
                            {getLabel(card.value)}
                        </p>

                    </div>

                ))
            }

        </div>

    );

}