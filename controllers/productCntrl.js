const Products = require("../models/ProductModel");

// filter sort, pagination
class ApiQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // filter
  filtering() {
    const queryObj = { ...this.queryString };
    // console.log(queryObj);
    const excludedField = ["sort", "page", "limit"];
    excludedField.forEach((el) => delete queryObj[el]);
    // console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  // sorting

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // pagination

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productCntrl = {
  getProducts: async (req, res) => {
    try {
      const feat = new ApiQuery(Products.find({}), req.query)
        .filtering()
        .sorting()
        .pagination();
      const products = await feat.query;
      res
        .status(200)
        .json({ success: true, result: products.length, products: products });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) {
        return res
          .status(400)
          .json({ success: false, msg: "Image field is empty" });
      }
      const product = await Products.findOne({ product_id });
      if (product) {
        return res
          .status(400)
          .json({ success: false, msg: "product already exists" });
      }

      const newproduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newproduct.save();
      res.status(200).json({ success: true, msg: "created successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id, "hi");
      await Products.findByIdAndDelete({ _id: id });
      res.status(201).json({ success: true, msg: "deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  singleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({ _id: id });
      res
        .status(200)
        .json({ success: true, result: product.length, product: product });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
};

module.exports = productCntrl;
