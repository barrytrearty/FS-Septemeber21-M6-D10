import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Categories = sequelize.define(
  "categories",
  {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Categories;
