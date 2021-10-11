import express from "express";
import ProductsModel from "../db/tables/productsTable.js";
import createHttpError from "http-errors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
// import { reviewModel } from "../db/tables/productsTable.js";
// import databaseObj from "../db/tables/index.js";
// import s from "sequelize";
// const { Op, fn } = s;

import q2m from "query-to-mongo";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
// });

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "amazon-products",
  },
});

// const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

// const { Products, Reviews, Categories, ProductCategories, Users } = databaseObj;

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    // const roducts = await ProductsModel.find();
    const mongoQuery = q2m(req.query);
    const { totalProducts, products } = await ProductsModel.findProducts(
      mongoQuery
    );
    res.send({
      links: mongoQuery.links("/products", totalProducts),
      totalProducts,
      pageTotal: Math.ceil(totalProducts / mongoQuery.options.limit),
      products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findById(id);

    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const modifiedProduct = await ProductsModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (modifiedProduct) {
      res.send(modifiedProduct);
    } else {
      next(createHttpError(404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedProduct = await ProductsModel.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Blog Post with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = await ProductsModel.findById(id);
    if (products) {
      res.send(products.reviews);
    } else {
      next(createHttpError(404, `Blog Post with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = await ProductsModel.findById(req.params.id);
    if (updatedProduct) {
      console.log("here");
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: req.body } },
        { new: true }
      );
      res.send(updatedProduct);
    } else {
      next(createHttpError(404, `Product ID${id} NOT FOUND`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findById(id);
    if (product) {
      const productreview = product.reviews.find(
        (review) => review._id.toString() === req.params.reviewId
      );
      if (productreview) {
        res.send(productreview);
      } else {
        next(createHttpError(404, `review with id ${id} not found!`));
      }
      // res.send(product.reviews);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.id);

    if (product) {
      const index = product.reviews.findIndex(
        (review) => review._id.toString() === req.params.reviewId
      );
      console.log(index);
      if (index !== -1) {
        product.reviews[index] = {
          ...product.reviews[index].toObject(),
          ...req.body,
        };
        await product.save();
        res.send(product);
      } else {
        next(createHttpError(404, `Blog Post with id ${id} not found!`));
      }
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findByIdAndUpdate(
      id,
      {
        $pull: { reviews: { _id: req.params.reviewId } },
      },
      { new: true }
    );
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `Blog Post with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// productsRouter.put(
//   "/:id/imageUpload",
//   multer({ storage: cloudinaryStorage }).single("product"),
//   async (req, res, next) => {
//     try {
//       const products = await ProductsModel.find();
//       const index = products.findIndex((p) => p.id === req.params.id);
//       let productToBeUpdated = products[index];
//       console.log(index);
//       const newImage = { image_url: req.file.path };
//       console.log(newImage);
//       const updatedProduct = { ...productToBeUpdated.toObject(), ...newImage };
//       console.log(updatedProduct);
//       products[index] = updatedProduct;
//       const productToSave = products[index];
//       await products.save();
//       res.send(productToSave);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

productsRouter.put(
  "/:id/imageUpload",
  multer({ storage: cloudinaryStorage }).single("product"),
  async (req, res, next) => {
    try {
      let product = await ProductsModel.findByIdAndUpdate(req.params.id, {
        image_url: req.file.path,
      });

      res.send(product._id);
    } catch (error) {
      next(error);
    }
  }
);

export default productsRouter;
