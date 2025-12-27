import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-400">
        AlgoVisualizer
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/bubble-sort" className="hover:text-blue-400">
          Bubble Sort
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
