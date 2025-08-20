import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import AttributeManager from "./components/AttributeManager";
import CreateProductForm from "./components/CreateProductForm";
import ProductList from "./components/ProductList";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import api from "./services/api";
import Products from "./pages/Products";

function App() {
  const [categories, setCategories] = useState([]);

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
    <div className="App">
      <Routes>
        {/* <Route path="*" element={<Notfound />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/categorylist" element={<CategoryList />} />
        <Route path="/attributemanager" element={<AttributeManager />} />
        <Route path="/createproductform" element={<CreateProductForm />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/attribute"
          element={<AttributeManager categories={categories} />}
        />
      </Routes>
    </div>
  );
}

export default App;
