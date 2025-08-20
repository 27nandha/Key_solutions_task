import React, { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import AttributeManager from "../components/AttributeManager";
import api from "../services/api";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 py-10 container mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🗂️ Category Manager
          </h2>
          <button
            onClick={() => navigate("/attribute")}
            className="bg-amber-200 hover:bg-amber-300 text-gray-800 px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Add Attributes to your Existing Product
          </button>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryForm onCategoryAdded={handleNewCategory} />
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Category;
