// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "product_id",
});
// Products belongToMany Tags (through ProductTag) THIS IM NOT TOO SURE ABOUT
Product.belongsToMany(ProductTag, {
  foreignKey: "product_tag_id",
});
// Tags belongToMany Products (through ProductTag) THIS IM NOT TOO SURE ABOUT
Tag.belongsToMany(ProductTag, {
  foreignKey: "product_tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
