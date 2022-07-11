const express = require("express");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const paymentCntrl = require("../controllers/paymentCntrl");
const router = express.Router();

router
  .route("/")
  .get(auth, authAdmin, paymentCntrl.getPayment)
  .post(auth, paymentCntrl.createPayment);

module.exports = router;
