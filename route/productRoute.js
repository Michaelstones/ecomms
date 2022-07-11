const express = require("express");
const productCntrl = require("../controllers/productCntrl");
const authAdmin = require("../middlewares/authAdmin");
const auth = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(productCntrl.getProducts)
  .post(auth, authAdmin, productCntrl.createProduct);

router
  .route("/:id")
  .delete(auth, authAdmin, productCntrl.deleteProduct)
  .put(auth, authAdmin, productCntrl.updateProducts)
  .get(auth, productCntrl.singleProduct);

module.exports = router;
