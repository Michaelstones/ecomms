const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDb = require("./config/connectDb");
const path = require("path");
require("dotenv").config();

// security
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.configure(function () {
  app.use(allowCrossDomain);
  //some other code
});

// Route imports
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const uploadRoute = require("./route/upload");
const productRoute = require("./route/productRoute");
const paymentRoute = require("./route/paymentRoute");

// middleWare
const app = express();

// set security helpers
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// EndPoints
app.get("/", (req, res) => {
  res.send("<h1>Ecommerce  API</h1>");
});
app.use("/api/v1", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/payment", paymentRoute);

// connect to the Db
// const URI = process.env.MONGO_URI;
// mongoose.connect(
//   URI,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("Connected to MongoDB");
//   }
// );

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

start();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });
