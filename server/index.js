const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const auth = require('./routes/auth')
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

dbConnect()

app.use('/api/auth',auth)

// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Booking API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
