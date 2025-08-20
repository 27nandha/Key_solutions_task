import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();


app.use(express.json());

//  Allowed Origins 
const allowedOrigins = [
  "http://localhost:5173",
  "https://key-solutions-task.vercel.app",
  "https://key-solutions-task-git-main-27nandhas-projects.vercel.app",
  "https://key-solutions-task-40xj51wz7-27nandhas-projects.vercel.app",
];

// Dynamic CORS Handling
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin."));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/categories", categoryRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send(" API is running successfully...");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ alter: true }); // Keep DB in sync
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
