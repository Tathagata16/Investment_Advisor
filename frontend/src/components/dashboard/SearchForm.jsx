import { useState } from "react";

export default function SearchForm() {
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [investmentType, setInvestmentType] = useState("long");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      company,
      file,
      investmentType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      <div>
        <label className="block font-semibold mb-2">
          Company Name
        </label>

        <input
          type="text"
          placeholder="Tesla"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Upload Company PDF (Optional)
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

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