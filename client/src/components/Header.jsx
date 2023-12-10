import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-600">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-md flex items-center justify-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-400" />
        </form>
        <ul className="flex gap-4 text-slate-700">
          <Link>
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link>
            {" "}
            <li className="hidden sm:inline">About</li>
          </Link>
          <Link>
            <li className="">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;