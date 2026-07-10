import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiChevronDown, FiChevronUp, FiDownload } from "react-icons/fi";
import { downloadPDF } from "../../services/analysisService";

export default function ReportSection({ analysis }) {
    const [expanded, setExpanded] = useState(false);


    //functino to download pdf/call get pdf
    const handleDownload = async () => {
        try {
            const token = localStorage.getItem("token");

            const blob = await downloadPDF(
                analysis._id,
                token
            );

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = `${analysis.company}-analysis.pdf`;

            link.click();

            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

            <div
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <h2 className="text-xl font-semibold">
                    Detailed AI Report
                </h2>

                <div className="flex items-center gap-3">

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDownload();
                        }}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        <FiDownload />
                        Download PDF
                    </button>

                    {expanded ? (
                        <FiChevronUp size={22} />
                    ) : (
                        <FiChevronDown size={22} />
                    )}

                </div>
            </div>

            {expanded && (
                <div className="border-t border-gray-200 p-6">

                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-bold mb-6">
                                    {children}
                                </h1>
                            ),

                            h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold mt-8 mb-3">
                                    {children}
                                </h2>
                            ),

                            h3: ({ children }) => (
                                <h3 className="text-xl font-semibold mt-5 mb-2">
                                    {children}
                                </h3>
                            ),

                            p: ({ children }) => (
                                <p className="mb-4 leading-7 text-gray-700">
                                    {children}
                                </p>
                            ),

                            ul: ({ children }) => (
                                <ul className="list-disc ml-6 mb-4">
                                    {children}
                                </ul>
                            ),

                            ol: ({ children }) => (
                                <ol className="list-decimal ml-6 mb-4">
                                    {children}
                                </ol>
                            ),

                            li: ({ children }) => (
                                <li className="mb-2">
                                    {children}
                                </li>
                            ),

                            strong: ({ children }) => (
                                <strong className="font-bold text-black">
                                    {children}
                                </strong>
                            ),
                        }}
                    >
                        {analysis.report}
                    </ReactMarkdown>

                </div>
            )}

        </section>
    );
}