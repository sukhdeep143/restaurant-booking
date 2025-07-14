require('dotenv').config(); 
const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected to MongoDB Atlas!");
  seedOrders();
}).catch((err) => console.error("MongoDB connection error:", err));

function istToUtcDate(year, month, day, hour = 0, minute = 0) {
  // `month` is 0-based in JS Date
  const istDate = new Date(Date.UTC(year, month, day, hour - 5, minute - 30));
  return istDate;
}




const orders = [
  {
    userId: "user1",
    items: [
      { name: "Paneer Butter Masala", quantity: 1, price: 200 },
      { name: "Naan", quantity: 2, price: 40 }
    ],
    tableNumber: 3,
    status: "Completed",
    totalAmount: 280,
    paymentMethod: "COD",
    createdAt: istToUtcDate(2025, 6, 12, 10, 30) // ✅ IST -> UTC
  },
  {
    userId: "user2",
    items: [
      { name: "Pizza", quantity: 1, price: 300 }
    ],
    tableNumber: 5,
    status: "Completed",
    totalAmount: 300,
    paymentMethod: "Online",
    createdAt: istToUtcDate(2025, 6, 12, 14, 0)
  },
  {
    userId: "user3",
    items: [
      { name: "Burger", quantity: 2, price: 150 }
    ],
    tableNumber: 1,
    status: "Completed",
    totalAmount: 300,
    paymentMethod: "COD",
    createdAt: istToUtcDate(2025, 6, 1, 13, 0)
  },
  {
    userId: "user4",
    items: [
      { name: "Pasta", quantity: 1, price: 250 }
    ],
    tableNumber: 7,
    status: "Completed",
    totalAmount: 250,
    paymentMethod: "Online",
    createdAt: istToUtcDate(2025, 5, 15, 15, 0)
  },
  {
    userId: "user5",
    items: [
      { name: "Momos", quantity: 1, price: 120 }
    ],
    tableNumber: 4,
    status: "Cancelled",
    totalAmount: 120,
    paymentMethod: "COD",
    createdAt: istToUtcDate(2025, 6, 12, 16, 30)
  },
  {
    userId: "user6",
    items: [
      { name: "Sizzler", quantity: 1, price: 400 }
    ],
    tableNumber: 2,
    status: "Cancelled",
    totalAmount: 400,
    paymentMethod: "Online",
    createdAt: istToUtcDate(2025, 6, 3, 18, 45)
  }
];


async function seedOrders() {
  try {
    await Order.deleteMany(); // ✅ Clear previous entries
    await Order.insertMany(orders);
    console.log("✅ Dummy orders seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding orders:", err);
    mongoose.disconnect();
  }
}
