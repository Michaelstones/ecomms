const Products = require("../models/ProductModel");
const Payments = require("../models/paymentModel");
const User = require("../models/userModel");

const paymentCntrl = {
  getPayment: async (req, res) => {
    try {
      const payment = await Payments.find({});
      return res.status(200).json({ success: true, payment });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const { id } = req.user;
      // console.log(id);
      const user = await User.findById({ _id: id }).select("name email");
      if (!user) {
        return res.status(400).json({ success: false, msg: "user not found" });
      }
      const { name, email, _id } = user;
      console.log(name, email, _id);
      const { cart, paymentID, address } = req.body;
      const newpayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      console.log("hi2");
      await newpayment.save();
      return res
        .status(200)
        .json({ msg: "created", success: true, newpayment });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = paymentCntrl;
