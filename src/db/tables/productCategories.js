import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const ProductCategories = sequelize.define(
  "productCategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

export default ProductCategories;
