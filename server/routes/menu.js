const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

// ✅ GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// ✅ POST a new dish
router.post('/', async (req, res) => {
  try {
    const { dishName, category, isTodaySpecial } = req.body;

    console.log("📦 Received payload:", req.body);

    if (!dishName || !category) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Dish name and category are required." });
    }

    const newDish = new MenuItem({
      dishName,
      category,
      isTodaySpecial: isTodaySpecial || false,
    });

    // 👇 validate before saving
    await newDish.validate();
    const savedDish = await newDish.save();

    console.log("✅ Dish saved:", savedDish);
    res.status(201).json(savedDish);
  } catch (err) {
    console.error('❌ Error in POST /api/menu:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


// ✅ DELETE a dish
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dish' });
  }
});

// ✅ PUT (Update) a dish
router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update dish' });
  }
});


// ✅ GET dashboard stats (with category-wise count)
router.get('/stats/dashboard', async (req, res) => {
  try {
    // 1. Unique categories
    const uniqueCategories = await MenuItem.distinct('category');
    const totalCategories = uniqueCategories.length;

    // 2. Total dishes
    const totalItems = await MenuItem.countDocuments();

    // 3. Today's specials
    const todaysSpecials = await MenuItem.countDocuments({ isTodaySpecial: true });

    // 4. Category-wise dish count
    const categoryCounts = await MenuItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1
        }
      }
    ]);

    res.json({
      totalCategories,
      totalItems,
      todaysSpecials,
      categoryStats: categoryCounts
    });
  } catch (err) {
    console.error('❌ Failed to fetch dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});


module.exports = router;

