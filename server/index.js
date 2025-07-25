require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const auth = require('./routes/auth')
const tableRoutes = require("./routes/Table");
const menuRoutes = require('./routes/menu');
const registeredUserRoutes = require('./routes/RegisteredUserRoutes');
// const categoryRoutes = require("./routes/category");
const ordersRoute = require('./routes/orders');
const revenueRoutes = require('./routes/revenue');
const bookingRoute = require("./routes/bookings");
const profileRoutes = require('./routes/profileRoutes');


const userRoutes = require('./routes/userRoutes');



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
app.use("/api/bookings", bookingRoute);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);


// app.use("/api/category", categoryRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Booking API is running");
});

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // replace * with frontend origin if needed
    methods: ['GET', 'POST']
  }
});

// Store io instance globally (optional but handy)
global.io = io;

// On client connection
io.on('connection', (socket) => {
  console.log('Admin connected: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('Admin disconnected: ' + socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

