import React, { useState, useEffect } from "react";
import api from "../services/api";

const CreateProductForm = ({ onProductCreated }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get("/categories");
      setCategories(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchAttributes = async () => {
        const response = await api.get(
          `/attributes/${selectedCategory}/attributes`
        );
        setAttributes(response.data);
        setFormValues({});
      };
      fetchAttributes();
    }
  }, [selectedCategory]);

  const handleChangeAttribute = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !selectedCategory || attributes.length === 0) return;

    const payload = {
      name: productName,
      categoryId: selectedCategory,
      attributes: Object.entries(formValues).map(([attributeId, value]) => ({
        attributeId: parseInt(attributeId),
        value: value.toString(),
      })),
    };

    try {
      await api.post("/products", payload);
      alert(" Product created!");
      setProductName("");
      setSelectedCategory("");
      setAttributes([]);
      setFormValues({});
      if (onProductCreated) onProductCreated();
    } catch (err) {
      console.error(err);
      alert(" Failed to create product.");
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-6 border border-gray-100 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., MacBook Pro 16 M3"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Attributes */}
        {attributes.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Product Attributes
            </h3>
            <div className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.id}>
                  <label className="block text-sm text-gray-600 mb-1">
                    {attr.name}
                  </label>
                  <input
                    type={
                      attr.type === "number"
                        ? "number"
                        : attr.type === "date"
                        ? "date"
                        : "text"
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formValues[attr.id] || ""}
                    onChange={(e) =>
                      handleChangeAttribute(attr.id, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
