import React, { useState } from "react";
import api from "../services/api";

const ProductList = ({ products, onRefresh }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/${id}`);
      onRefresh();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({ name: product.name });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: "" });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/products/${id}`, formData);
      setEditingProduct(null);
      onRefresh();
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-6 border border-gray-100 w-full max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Product List</h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10 border border-dashed border-gray-200 rounded-md">
          🧐 No products found. Try adding one!
        </p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border border-gray-200 bg-gray-50 rounded-md p-4"
            >
              {editingProduct === product.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                    placeholder="Product Name"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-800">
                    {product.name}
                  </h3>

                  {product.ProductAttributes?.length > 0 ? (
                    <ul className="ml-4 mt-2 list-disc text-sm text-gray-700">
                      {product.ProductAttributes.map((attr) => (
                        <li key={attr.id}>
                          <span className="font-medium">
                            {attr.Attribute?.name}:
                          </span>{" "}
                          {attr.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">No attributes</p>
                  )}

                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
