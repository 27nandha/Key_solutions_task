import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Settings, Trash2, PlusCircle } from "lucide-react";
import Navbar from "./NavBar";

const AttributeManager = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [newAttribute, setNewAttribute] = useState({
    name: "",
    type: "string",
  });

  useEffect(() => {
    if (selectedCategory) {
      fetchAttributes(selectedCategory);
    } else {
      setAttributes([]);
    }
  }, [selectedCategory]);

  const fetchAttributes = async (categoryId) => {
    try {
      const res = await api.get(`/categories/${categoryId}/attributes`);
      setAttributes(res.data);
    } catch (error) {
      console.error("Error fetching attributes", error);
    }
  };

  const handleAddAttribute = async (e) => {
    e.preventDefault();
    if (!newAttribute.name.trim()) return;

    try {
      const res = await api.post(
        `/categories/${selectedCategory}/attributes`,
        newAttribute
      );
      setAttributes((prev) => [...prev, res.data]);
      setNewAttribute({ name: "", type: "string" });
    } catch (error) {
      console.error("Error creating attribute", error);
      alert("Error creating attribute");
    }
  };

  const handleDelete = async (attributeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attribute?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/attribute/${attributeId}`);
      setAttributes((prev) => prev.filter((attr) => attr.id !== attributeId));
    } catch (err) {
      console.error("Failed to delete attribute", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Settings className="text-blue-600 w-6 h-6" />
            Attribute Manager
          </h1>
          <p className="text-gray-600 text-base">
            Manage custom attributes for each product category
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="bg-white rounded-md shadow p-6 border border-gray-100">
          {/* Category Selection + Add Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Select Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Attribute Form */}
            {selectedCategory && (
              <form
                onSubmit={handleAddAttribute}
                className="flex flex-col mt-6 sm:flex-row items-center gap-4"
              >
                <input
                  type="text"
                  placeholder="Attribute name..."
                  className="flex-1 border  border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:outline-none focus:ring-blue-500"
                  value={newAttribute.name}
                  onChange={(e) =>
                    setNewAttribute({ ...newAttribute, name: e.target.value })
                  }
                  required
                />
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:outline-none focus:ring-blue-500"
                  value={newAttribute.type}
                  onChange={(e) =>
                    setNewAttribute({ ...newAttribute, type: e.target.value })
                  }
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                </select>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add
                </button>
              </form>
            )}
          </div>

          {/* Attribute List */}
          {selectedCategory && (
            <div className="mt-10">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Current Attributes
              </h3>
              {attributes.length === 0 ? (
                <p className="text-gray-500">No attributes found.</p>
              ) : (
                <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
                  <ul className="divide-y divide-gray-100">
                    {attributes.map((attr) => (
                      <li
                        key={attr.id}
                        className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {attr.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Type: {attr.type}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(attr.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttributeManager;
