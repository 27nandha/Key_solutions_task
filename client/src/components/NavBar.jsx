import { BsBoxFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full my-6 px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-lg shadow-gray-200/20 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl">
      {/* Left: Welcome */}
      <div className="w-full lg:w-auto text-center lg:text-left">
        <button
          onClick={() => navigate("/")}
          className="text-xl flex justify-center items-center font-bold sm:text-2xl cursor-pointer text-gray-800 tracking-tight"
        >
          <CiHome className="font-bold text-gray-800" />
          Welcome User!
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Billing Button */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 h-11 bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-orange-500 hover:shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/category")}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 h-11 bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-orange-500 hover:shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Category
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
