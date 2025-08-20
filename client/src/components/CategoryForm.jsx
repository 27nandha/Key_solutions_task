import React, { useState } from "react";
import api from "../services/api";
import { PlusCircle } from "lucide-react";

const CategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);
      const response = await api.post("/categories", { name });
      onCategoryAdded(response.data); // call parent to update UI
      setName("");
    } catch (error) {
      console.error("Failed to create category", error);
      alert("❌ Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-blue-600" />
        Add New Category
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        {/* Input */}
        <input
          type="text"
          placeholder="Enter category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium shadow-sm transition 
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
      `}
        >
          <PlusCircle className="w-4 h-4" />
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
