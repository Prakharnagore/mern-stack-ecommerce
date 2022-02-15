const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").patch(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").patch(isAuthenticatedUser, updateProfile);
router.route("/password/update").patch(isAuthenticatedUser, updatePassword);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
