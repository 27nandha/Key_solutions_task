import Product from "../models/Product.js";
import ProductAttribute from "../models/ProductAttribute.js";

export const createProduct = async (req, res) => {
  try {
    const { name, categoryId, attributes } = req.body;

    // Example of `attributes`:
    /*
    [
      { "attributeId": 1, "value": "Red" },
      { "attributeId": 2, "value": "11" },
      { "attributeId": 3, "value": "Sneaker" }
    ]
    */

    // 1. Create the product
    const product = await Product.create({ name, categoryId });

    // 2. Bulk insert attribute values
    if (Array.isArray(attributes)) {
      const productAttributes = attributes.map((attr) => ({
        productId: product.id,
        attributeId: attr.attributeId,
        value: attr.value,
      }));

      await ProductAttribute.bulkCreate(productAttributes);
    }

    res
      .status(201)
      .json({ message: "✅ Product created", productId: product.id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "❌ Failed to create product", details: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductAttribute,
          include: ["Attribute"],
        },
      ],
    });

    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", details: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    // Delete attributes first (FK dependency)
    await ProductAttribute.destroy({ where: { productId: id } });

    // Delete product
    await product.destroy();

    res.json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to delete product", details: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, attributes } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    // 1. Update product basic info
    await product.update({ name, categoryId });

    // 2. Update attributes
    if (Array.isArray(attributes)) {
      // Delete old attributes and re-insert (simpler approach)
      await ProductAttribute.destroy({ where: { productId: id } });

      const productAttributes = attributes.map((attr) => ({
        productId: id,
        attributeId: attr.attributeId,
        value: attr.value,
      }));

      await ProductAttribute.bulkCreate(productAttributes);
    }

    res.json({ message: "✅ Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to update product", details: error.message });
  }
};
