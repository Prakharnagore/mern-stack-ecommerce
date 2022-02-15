const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controllers/productController");

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").patch(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReviews);

module.exports = router;
