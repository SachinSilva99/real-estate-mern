import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/UserSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignInOnClick = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const res = await fetch("/api/v1/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }

    dispatch(signInSuccess(data));
    navigate("/");
    console.log(data);
  };

  return (
    <div className="m-6 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign In</h1>
      <form className="flex flex-col gap-6">
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleInputChange}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleInputChange}
        />
        <button
          onClick={handleSignInOnClick}
          disabled={loading}
          className="active:bg-blue-700 hover:opacity-95 bg-blue-400 text-white p-3 disabled:opacity-50"
        >
          {loading ? "loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-1 mt-5">
        <p>Dont have an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-800">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
