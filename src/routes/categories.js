import express from "express";
import databaseObj from "../db/tables/index.js";
import s from "sequelize";
const { Op } = s;

const { Categories, Products } = databaseObj;

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const data = await Categories.findAll({
      include: { model: Products, through: { attributes: [] } },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const data = await Categories.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Categories.findOne({
      where: { id: req.params.id },
      // include: Products,
      include: { model: Products, through: { attributes: [] } },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoriesRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Categories.update(req.body, {
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

categoriesRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Categories.destroy({ where: { id: req.params.id } });
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

export default categoriesRouter;
