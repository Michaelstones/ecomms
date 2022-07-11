const express = require("express");
const categoryCntrl = require("../controllers/categoryCntrl");
const authAdmin = require("../middlewares/authAdmin");
const auth = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(categoryCntrl.getCategories)
  .post(auth, authAdmin, categoryCntrl.createCategory);

router
  .route("/:id")
  .delete(auth, authAdmin, categoryCntrl.deleteCategory)
  .put(auth, authAdmin, categoryCntrl.updateCategory);

module.exports = router;
