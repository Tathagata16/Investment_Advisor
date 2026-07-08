import { useState, useContext } from "react";
import { signup } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signup(formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold">Signup</h2>

        <input
          className="border w-full p-2"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Signup
        </button>

        <p>
          Already have an account?{" "}
          <Link
            className="text-blue-600"
            to="/login"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}