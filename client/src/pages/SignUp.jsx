import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSignUpOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
    navigate("/sign-in");
    console.log(data);
  };

  return (
    <div className="m-6 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign Up</h1>
      <form className="flex flex-col gap-6">
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="text"
          name="username"
          placeholder="username"
          id="username"
          onChange={handleInputChange}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="email"
          name="email"
          placeholder="email"
          id="email"
          onChange={handleInputChange}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="password"
          name="password"
          placeholder="password"
          id="password"
          onChange={handleInputChange}
        />
        <button
          onClick={handleSignUpOnClick}
          disabled={loading}
          className="active:bg-blue-700 hover:opacity-95 bg-blue-400 text-white p-3 disabled:opacity-50"
        >
          {loading ? "loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
