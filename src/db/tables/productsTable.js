import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Products = sequelize.define("products", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image_url: {
    type: DataTypes.TEXT,
    defaultValue:
      "https://res.cloudinary.com/btrearty/image/upload/v1632321701/blogPosts/hw8ax6kxbb2vn00pi9ik.webp",
  },
  // category: { type: DataTypes.STRING, allowNull: false },
});

export default Products;
