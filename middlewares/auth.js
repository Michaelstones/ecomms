const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log(token);
    if (!token) {
      return res
        .status(400)
        .json({ msg: "you are not Authorized", success: false });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

module.exports = auth;
