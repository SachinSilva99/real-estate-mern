import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignUpOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
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
      <form className=" flex flex-col gap-6 ">
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="text"
          id="username"
          placeholder="username"
          ref={usernameRef}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="email"
          id="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="password"
          placeholder="password"
          ref={passwordRef}
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
