import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const ItemsInShoppingCart = sequelize.define(
  "shoppingCart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

export default ItemsInShoppingCart;
