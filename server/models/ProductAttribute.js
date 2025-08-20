import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.js";
import Attribute from "./Attribute.js";

const ProductAttribute = sequelize.define("ProductAttribute", {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ProductAttribute.belongsTo(Product, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});
Product.hasMany(ProductAttribute, {
  foreignKey: "productId",
});

ProductAttribute.belongsTo(Attribute, {
  foreignKey: "attributeId",
});
Attribute.hasMany(ProductAttribute, {
  foreignKey: "attributeId",
});

export default ProductAttribute;
