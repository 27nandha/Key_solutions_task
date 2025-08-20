import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCards from "../components/ProductCards";
import Navbar from "../components/NavBar";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          PRODUCTS
        </h1>
        <ProductCards products={products} />
      </div>
    </div>
  );
};

export default Home;
