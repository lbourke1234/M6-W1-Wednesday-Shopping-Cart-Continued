import Product from './product.js'
import Review from './review.js'
import User from './user.js'
import Category from './category.js'
import ProductCategory from './productCategory.js'

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false }
})
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false }
})
export default { Product, Review, User, Category, ProductCategory }
