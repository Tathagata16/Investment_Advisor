import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { searchCompanies } from "../../services/companyService";

export default function SearchForm({onAnalyze}) {
    const [searchText, setSearchText] = useState("");

    const [debouncedSearch] = useDebounce(searchText, 500);

    const [companies, setCompanies] = useState([]);

    const [selectedCompany, setSelectedCompany] = useState(null);

    const [investmentType, setInvestmentType] = useState("long");

    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            if (debouncedSearch.length < 2) {
                setCompanies([]);
                return;
            }

            try {
                const results = await searchCompanies(debouncedSearch);
                setCompanies(results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompanies();
    }, [debouncedSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCompany) {
            alert("Please select a company.");
            return;
        }

        onAnalyze({
            symbol: selectedCompany.symbol,
            companyName: selectedCompany.name,
            investmentType,
            file,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 space-y-6"
        >
            <div className="relative">

                <label className="block font-semibold mb-2">
                    Search Company
                </label>

                <input
                    className="border rounded w-full p-2"
                    placeholder="Search company..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setSelectedCompany(null);
                    }}
                />

                {companies.length > 0 && !selectedCompany && (
                    <div className="absolute bg-white border rounded shadow w-full mt-1 max-h-72 overflow-y-auto z-20">

                        {companies.map((company) => (
                            <div
                                key={company.symbol}
                                onClick={() => {
                                    setSelectedCompany(company);
                                    setSearchText(company.name);
                                    setCompanies([]);
                                }}
                                className="p-3 cursor-pointer hover:bg-gray-100 border-b"
                            >
                                <div className="font-semibold">
                                    {company.name}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {company.exchange} • {company.symbol}
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* <div>

                {/* <label className="block font-semibold mb-2">
                    Upload Company PDF (Optional)
                </label> 

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

            </div> */}

            <div>

                <label className="block font-semibold mb-2">
                    Investment Horizon
                </label>

                <div className="flex gap-6">

                    <label>
                        <input
                            type="radio"
                            value="long"
                            checked={investmentType === "long"}
                            onChange={(e) => setInvestmentType(e.target.value)}
                        />

                        <span className="ml-2">
                            Long Term
                        </span>
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="short"
                            checked={investmentType === "short"}
                            onChange={(e) => setInvestmentType(e.target.value)}
                        />

                        <span className="ml-2">
                            Short Term
                        </span>
                    </label>

                </div>

            </div>

            <button
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >
                Analyze Company
            </button>

        </form>
    );
}