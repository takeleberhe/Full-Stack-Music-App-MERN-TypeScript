import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/store";
import Search from "./Search";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 md:p-6">
      <div className="text-2xl font-extrabold text-white">
        <Link to="/" className="hover:text-gray-300">
          Music APP
        </Link>
      </div>
      <div className="flex-1 mx-4">
        <Search />
      </div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <button
            onClick={() => (window.location.href = "/logout")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
