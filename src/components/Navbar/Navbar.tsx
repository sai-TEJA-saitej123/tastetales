import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <>
      <nav className="bg-pink-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold text-pink-600 tastetales-title">
            <Link to="/" >TasteTales</Link>
          </h1>
          <ul className="flex gap-6 mt-2 sm:mt-0 text-sm text-gray-700">
            <li>
              <Link to="/Favorites" className="hover:text-pink-600 transition font-bold">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
