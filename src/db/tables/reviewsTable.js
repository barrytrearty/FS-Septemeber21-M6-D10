import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewModel = new Schema(
  {
    reviews: {
      comment: { type: String, required: true },
      rate: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    },
  },
  {
    timestamps: true,
  }
);

export default model("review", reviewModel);
