const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// GET all menu items
router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

// POST a new dish
router.post('/', async (req, res) => {
  try {
    const { dishName, category, isTodaySpecial } = req.body;

    if (!dishName || !category) {
      return res.status(400).json({ error: "Dish name and category are required." });
    }

    const newDish = new MenuItem({
      dishName,
      category,
      isTodaySpecial: isTodaySpecial || false,
    });

    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    console.error('Error in POST /api/menu:', err);
    res.status(500).json({ error: 'Failed to add dish' });
  }
});

// DELETE a dish
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dish' });
  }
});

// PUT (Update) a dish
router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update dish' });
  }
});

module.exports = router;


