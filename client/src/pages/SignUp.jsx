import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="m-6 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign Up</h1>
      <form className=" flex flex-col gap-6 ">
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="text"
          id="username"
          placeholder="username"
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="email"
          id="email"
          placeholder="password"
        />
        <input
          className="border p-3 rounded-md focus:outline-none"
          type="password"
          id="password"
        />
        <button className="active:bg-blue-700 hover:opacity-95 bg-blue-400 text-white p-3 disabled:opacity-50">
          Sign Up
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
