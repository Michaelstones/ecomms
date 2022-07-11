const User = require("../models/userModel");
const authAdmin = async (req, res, next) => {
  try {
    const adminUser = await User.findOne({ _id: req.user.id });
    if (adminUser.role === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "you do not have admin privilege" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = authAdmin;
