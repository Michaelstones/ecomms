const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paymentModel");

const userContrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/v1/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      //   console.log(user, "hi");
      if (!user) {
        return res
          .status(404)
          .json({ msg: "User does not exist.", success: false });
      }
      //   validate password
      const pMatch = await bcrypt.compare(password, user.password);
      //   console.log(pMatch, "hi");
      if (!pMatch) {
        return res
          .status(404)
          .json({ msg: "password is incorrect", success: false });
      }
      //create accesstoken and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/v1/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/v1/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message, success: false });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      //   console.log(user);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const { id } = req.user;
      // console.log(id);
      const user = await User.findById({ _id: id });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Please Login or Register" });
      }

      await User.findOneAndUpdate(
        { _id: id },
        { cart: req.body.cart || req.body.cartz }
      );
      return res.status(201).json({ success: true, msg: "updated " });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({});
      return res.status(200).json({ success: true, history });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userContrl;
