import express from "express";
import databaseObj from "../db/tables/index.js";
import s from "sequelize";

const { Reviews, Products } = databaseObj;

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Reviews.findAll({ include: Products });
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Reviews.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Reviews.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Reviews.update(req.body, {
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

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Reviews.destroy({ where: { id: req.params.id } });
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

reviewsRouter.get("/", async (req, res, next) => {});

export default reviewsRouter;
