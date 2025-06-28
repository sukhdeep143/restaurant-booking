

---


# 🍽️ Restaurant Booking Web Application

This is a full-stack **Restaurant Booking** web application built using the **MERN stack** (MongoDB, Express, React, Node.js). The app allows customers to browse the menu, book tables online, and admins to manage reservations and restaurant information efficiently.

---

## 🚀 Live Preview

Frontend: [https://restaurant-booking-client.netlify.app](https://restaurant-booking-client.netlify.app)  
Backend: Coming Soon

---

## 📁 Project Structure

```

restaurant-booking/
├── client/       # Frontend - React (Vite + Tailwind CSS)
└── server/       # Backend - Express + MongoDB

````

---

## 🛠 Tech Stack

### Frontend
- React.js (with Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv (for environment variables)
- CORS

---

## 🔑 Features

### ✅ User
- View restaurant menu and details
- Book a table with preferred date/time
- Receive booking confirmation

### ✅ Admin
- View and manage all bookings
- Add/update/remove menu items
- Dashboard for quick overview

---

## ⚙️ Getting Started

### Clone the Repository

```bash
git clone https://github.com/sukhdeep143/restaurant-booking.git
cd restaurant-booking
````

---

### 📦 Setup Frontend

```bash
cd client
yarn install
yarn dev
```

> Runs on: [http://localhost:5173](http://localhost:5173)

---

### 🖥️ Setup Backend

```bash
cd server
yarn install
yarn dev
```

> Runs on: [http://localhost:5000](http://localhost:5000)

> Ensure you have a `.env` file in the server directory:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant
```

---

## 📷 Screenshots

*(Add screenshots of your UI here if available)*

---

## 📌 Future Improvements

* Email/SMS notifications for bookings
* Online food ordering
* Payment gateway integration
* Authentication (Login/Register)

---

## 🙌 Contributing

Feel free to fork this repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

