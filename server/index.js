require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const auth = require('./routes/auth')
const tableRoutes = require("./routes/table");
const menuRoutes = require('./routes/menu');
const registeredUserRoutes = require('./routes/RegisteredUserRoutes');
// const categoryRoutes = require("./routes/category");
const ordersRoute = require('./routes/orders');
const revenueRoutes = require('./routes/revenue');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

dbConnect();

app.use('/api/revenue', revenueRoutes);

app.use('/api/auth',auth)
app.use('/api/orders', ordersRoute);
app.use('/api/registered-users', registeredUserRoutes);
app.use("/api/tables", tableRoutes);
app.use('/api/menu', menuRoutes);
// app.use("/api/category", categoryRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Booking API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
