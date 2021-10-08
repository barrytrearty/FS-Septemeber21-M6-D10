import express from "express";
import databaseObj from "../db/tables/index.js";
import s from "sequelize";
import sequelize from "../db/index.js";
// import ItemsInShoppingCart from "../db/tables/ItemsInShoppingCart.js";
const { Op } = s;

const { Users, Products, ItemsInShoppingCart } = databaseObj;

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const data = await Users.findAll({ include: [Products] });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = await Users.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Users.findAll({
      // include: [Products, ItemsInShoppingCart],
      include: [Products],
      where: { id: req.params.id },
    });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Users.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Users.destroy({ where: { id: req.params.id } });
    if (rows > 0) {
      res.send("ok");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/:id/addProduct", async (req, res, next) => {
  try {
    const prodCatObj = { ...req.body, userId: req.params.id };
    const data = await ItemsInShoppingCart.create(prodCatObj);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default usersRouter;
