const express = require("express");
const cloudinary = require("cloudinary");
const fs = require("fs");
const router = express.Router();
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

// Init cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", auth, authAdmin, async (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files) === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "No files to upload" });
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removePath(file.tempFilePath);
      return res.status(400).json({ success: false, msg: "File too large" });
    }
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removePath(file.tempFilePath);
      return res
        .status(400)
        .json({ success: false, msg: "File format not supported" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;

        removePath(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

router.post("/destroy", auth, authAdmin, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res
        .status(400)
        .json({ success: false, msg: "no Image to delete" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ success: true, msg: "image deleted succefully" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

const removePath = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;
