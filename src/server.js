import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
// import { connectDB } from "./db/index.js";
// import sequelize from "./db/index.js";
// import reviewsRouter from "./routes/reviews.js";
import productsRouter from "./routes/products.js";
// import categoriesRouter from "./routes/categories.js";
// import usersRouter from "./routes/users.js";
// import cartRouter from "./routes/shoppingCart.js";

const server = express();

const port = process.env.PORT || 5000;

server.use(cors());

server.use(express.json());

server.use("/products", productsRouter);
// server.use("/reviews", reviewsRouter);
// server.use("/users", usersRouter);
// server.use("/categories", categoriesRouter);
// server.use("/shoppingCart", cartRouter);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
