import express from "express";
import databaseObj from "../db/tables/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;

const { ItemsInShoppingCart, Products, Users } = databaseObj;

const cartRouter = express.Router();

cartRouter.route("/:userId").get(async (req, res, next) => {
  try {
    const data = await ItemsInShoppingCart.findAll({
      where: { userId: req.params.userId },
      include: Products,
    });

    // const data = await ItemsInShoppingCart.findAll({
    //   attributes: ["price"],
    //   where: { userId: req.params.userId },
    //   include: Products,
    // });

    // const betterData = await ItemsInShoppingCart.findAll({
    //   where: { userId: req.params.userId },
    //   include: {
    //     model: Products,
    //     through: {
    //       attributes: [
    //         Products.name,
    //         // Products.price,
    //         // sequelize.fn("COUNT", sequelize.col("price")),
    //       ],
    //     },
    //   },
    // });

    // const data = await ItemsInShoppingCart.count({
    //   where: { userId: req.params.userId },
    // });

    // const totalItems = await ItemsInShoppingCart.count();

    res.send({ totalItems, ...data });

    res.send(betterData);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

cartRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await ItemsInShoppingCart.destroy({
      where: { id: req.params.id },
    });
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

export default cartRouter;
