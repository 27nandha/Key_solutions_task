import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import "./models/Attribute.js";
import "./models/Product.js";
import "./models/ProductAttribute.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://key-solutions-task.vercel.app",
  "https://key-solutions-task-git-main-27nandhas-projects.vercel.app",
  "https://key-solutions-task-40xj51wz7-27nandhas-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
