import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-5xl font-bold">
        AI Investment Advisor
      </h1>

      <p>Analyze companies using AI.</p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}