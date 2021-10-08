import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewModel = new Schema(
  {
    comment: { type: String, required: true },
    rate: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = new Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: {
    type: String,
  },
  category: { type: String, required: true },
  reviews: [reviewModel],
});

ProductsModel.static("findProducts", async function (mongoQuery) {
  const totalProducts = await this.countDocuments(mongoQuery.criteria);
  const products = await this.find(
    mongoQuery.criteria,
    mongoQuery.options.fields
  )
    .limit(mongoQuery.options.limit)
    .skip(mongoQuery.options.skip)
    .sort(mongoQuery.options.sort);
  // .populate({ path: "authors" });
  return {
    totalProducts,
    products,
  };
  // mongoQuery.links("/", totalProducts),
  // totalProducts,
  // pageTotal: Math.ceil(totalProducts / mongoQuery.options.limit)
  // )
});

export default model("products", ProductsModel);
