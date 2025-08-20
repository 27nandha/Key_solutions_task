import React, { useEffect, useState } from "react";
import api from "../services/api";
import CategoryForm from "./CategoryForm";
import { Folder } from "lucide-react"; // nice minimal icon

const CategoryList = ({ categories }) => {
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
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
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📂 Existing Categories
      </h3>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="bg-white rounded-md shadow-sm max-h-[350px] overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                <Folder className="text-blue-500 w-5 h-5" />
                <span className="text-gray-800 font-medium">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
