import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
Category.hasMany(Product, {
  foreignKey: "categoryId",
});

export default Product;
