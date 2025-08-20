import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import CreateProductForm from "../components/CreateProductForm";
import api from "../services/api";
import Navbar from "../components/NavBar";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CreateProductForm onProductCreated={fetchProducts} />
          <ProductList products={products} onRefresh={fetchProducts} />
        </div>
      </div>
    </div>
  );
};

export default Products;