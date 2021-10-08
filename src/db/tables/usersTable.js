import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const Users = sequelize.define(
  "users",

  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/btrearty/image/upload/v1632321701/blogPosts/hw8ax6kxbb2vn00pi9ik.webp",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Users;
