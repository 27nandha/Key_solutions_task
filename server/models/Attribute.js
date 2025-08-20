import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";

const Attribute = sequelize.define("Attribute", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("string", "number"),
    allowNull: false,
  },
});

Attribute.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
Category.hasMany(Attribute, {
  foreignKey: "categoryId",
});

export default Attribute;
