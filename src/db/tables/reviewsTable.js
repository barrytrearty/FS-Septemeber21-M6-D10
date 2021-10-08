import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Reviews = sequelize.define(
  "reviews",
  {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    // username: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

export default Reviews;
