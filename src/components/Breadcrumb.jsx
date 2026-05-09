import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ algorithmName, category, categoryPath }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
      <Link
        to="/"
        className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-1"
      >
        Home
      </Link>
      <span className="text-gray-600">/</span>
      <Link
        to={categoryPath}
        className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-1"
      >
        {category}
      </Link>
      <span className="text-gray-600">/</span>
      <span className="text-white font-semibold">{algorithmName}</span>
    </nav>
  );
};

export default Breadcrumb;
