const Category = require("../models/categoryModel");
const Products = require("../models/ProductModel");
const categoryCntrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      return res.status(200).json({ success: true, categories });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res
          .status(400)
          .json({ success: false, msg: "category already exist" });
      const newCategory = new Category({ name });
      await newCategory.save();
      return res
        .status(200)
        .json({ success: true, msg: "New category added succesfully" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({ category: id });
      if (product) {
        return res
          .status(400)
          .json({ success: false, msg: "Please delete Item with a relation" });
      }
      await Category.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ success: true, msg: "Category is now deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: id }, { name }, { new: true });
      return res
        .status(200)
        .json({ success: true, msg: "Category is now updated" });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
};

module.exports = categoryCntrl;
