import express from "express";
import {
  createAttribute,
  getCategoryAttributes,
  deleteAttribute,
} from "../controllers/attributeController.js";

const router = express.Router();

// Add attribute to category
router.post("/:categoryId/attributes", createAttribute);

// Get all attributes for a category
router.get("/:categoryId/attributes", getCategoryAttributes);

// Optional: delete attribute
router.delete("/attribute/:id", deleteAttribute);

export default router;
