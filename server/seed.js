// seed.js
require('dotenv').config(); // ✅ Load environment variables
const mongoose = require('mongoose');
const Order = require('./models/Order');

// Use the same URL from your .env file
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    return Order.insertMany(sampleOrders);
  })
  .then(() => {
    console.log('Sample orders inserted!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting orders:', err);
    mongoose.connection.close();
  });

const sampleOrders = [
  {
    userId: 'Kashvi001',
    tableNumber: '1',
    status: 'Pending',
    total: 500,
    items: [
      { name: 'Paneer Tikka', quantity: 2, price: 200 },
      { name: 'Naan', quantity: 2, price: 50 }
    ]
  },
  {
    userId: 'Ravi123',
    tableNumber: '3',
    status: 'Preparing',
    total: 300,
    items: [
      { name: 'Biryani', quantity: 1, price: 250 },
      { name: 'Raita', quantity: 1, price: 50 }
    ]
  },
  {
    userId: 'Sana555',
    tableNumber: '5',
    status: 'Completed',
    total: 750,
    items: [
      { name: 'Pizza', quantity: 1, price: 500 },
      { name: 'Cold Drink', quantity: 2, price: 125 }
    ],
    timestamp: new Date()
  }
];

