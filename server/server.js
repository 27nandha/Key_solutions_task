import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import "./models/Attribute.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import "./models/Attribute.js";
import "./models/Product.js";
import "./models/ProductAttribute.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// Allow all origins (for dev)

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://key-solutions-task.vercel.app/",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/categories", attributeRoutes);
app.use("/api/products", productRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to DB and start server
try {
  await sequelize.authenticate();
  console.log("DB connected");

  await sequelize.sync(); // Populate tables
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
} catch (error) {
  console.error("DB connection failed:", error.message);
}
