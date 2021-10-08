import Products from "./productsTable.js";
import Reviews from "./reviewsTable.js";
import Categories from "./categoriesTable.js";
import Users from "./usersTable.js";
import ProductCategories from "./productCategories.js";
import ItemsInShoppingCart from "./ItemsInShoppingCart.js";

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

Users.hasMany(Reviews);
Reviews.belongsTo(Users);

// Categories.belongsToMany(Products, { through: "productCategories" });
// Products.belongsToMany(Categories, { through: "productCategories" });

Categories.belongsToMany(Products, {
  through: { model: ProductCategories, unique: false },
});
Products.belongsToMany(Categories, {
  through: { model: ProductCategories, unique: false },
});

Users.belongsToMany(Products, {
  through: { model: ItemsInShoppingCart, unique: false },
});
Products.belongsToMany(Users, {
  through: { model: ItemsInShoppingCart, unique: false },
});

Users.hasMany(ItemsInShoppingCart);
ItemsInShoppingCart.belongsTo(Users);

// Products.belongsToMany(ItemsInShoppingCart, {
//   through: { model: "shoppingCart", unique: false },
// });
// ItemsInShoppingCart.belongsToMany(Products, {
//   through: { model: "shoppingCart", unique: false },
// });

Products.hasMany(ItemsInShoppingCart);
ItemsInShoppingCart.belongsTo(Products);

export default {
  Products,
  Reviews,
  Categories,
  Users,
  ProductCategories,
  ItemsInShoppingCart,
};
