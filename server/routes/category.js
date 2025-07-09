const express = require("express");
const router = express.Router();
const Category = require('../models/Cat');

// ✅ Create (Add) Category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📝 Read All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Category by ID
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete Category by ID
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
