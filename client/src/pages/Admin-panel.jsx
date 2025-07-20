import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";
import "../components/ui/admin-panel.css";
import AdminMenu from "../components/ui/admin-menu";
import TableBooking from "../components/ui/TableBooking";
// import CategoryTable from "../components/ui/category";
import RegisteredUserList from "../components/ui/userTable";
import OrdersSection from "../components/ui/OrderSection";
import Revenue from "../components/ui/Revenue";


const DashboardCard = ({ title, value, color, onView }) => (
  <Card className={`dashboard-card ${color}`}>
    <CardContent className="dashboard-card-content">
      <div className="dashboard-card-title">
        {title}: {value}
      </div>
      <Button variant="link" className="dashboard-card-button" onClick={onView}>
        View Details
      </Button>
    </CardContent>
  </Card>
);

const Section = ({ title, children }) => (
  <section className="admin-section">
    <h2 className="admin-section-title">{title}</h2>
    <div className="admin-section-content">{children}</div>
  </section>
);

const AdminPanel = () => {
  const [showMenuCards, setShowMenuCards] = useState(false);
  const [showOrderStats, setShowOrderStats] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showRevenueCards, setShowRevenueCards] = useState(false);
  const [showtable_booking, setShowtable_booking] = useState(false);


  // dynamic menu result
const [stats, setStats] = useState({
  totalCategories: 0,
  totalItems: 0,
  todaysSpecials: 0,
});

useEffect(() => {
  const cachedStats = localStorage.getItem("dashboardStats");

  if (cachedStats) {
    setStats(JSON.parse(cachedStats));
  } else {
    fetchStats();
  }

  const interval = setInterval(fetchStats, 60000);
  return () => clearInterval(interval);
}, []);

const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/menu/stats/dashboard");
    setStats(res.data);
    localStorage.setItem("dashboardStats", JSON.stringify(res.data)); // Save to localStorage
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
  }
};


//dynamic orders
  const [orders, setOrders] = useState([]);
useEffect(() => {
  const cachedOrders = localStorage.getItem("orders");

  if (cachedOrders) {
    setOrders(JSON.parse(cachedOrders));
  } else {
    fetchOrders();
  }
}, []);

const fetchOrders = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
    localStorage.setItem("orders", JSON.stringify(res.data));
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};


  //dynamic booking
  const [tableSummary, setTableSummary] = useState({
    available: 0,
    reserved: 0,
    occupied: 0,
  });

  useEffect(() => {
  fetchOrders();
  fetchTableSummary(); // Initial fetch

  const interval = setInterval(() => {
    fetchOrders();
    fetchTableSummary();
  }, 2000); // 🔁 refresh every 2000 ms = 2 seconds

  return () => clearInterval(interval); // Cleanup on unmount
}, []);

  const fetchTableSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tables");
      const tables = res.data;

      const summary = {
        available: tables.filter((t) => t.status === "available").length,
        reserved: tables.filter((t) => t.status === "reserved").length,
        occupied: tables.filter((t) => t.status === "occupied").length,
      };

      setTableSummary(summary);
    } catch (err) {
      console.error("Error fetching table summary:", err);
    }
  };

  //dynamic orders
  const today = new Date();
  const todayDate = today.toLocaleDateString();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const todayOrders = orders.filter(
    (order) => new Date(order.createdAt).toLocaleDateString() === todayDate
  );

  const monthOrders = orders.filter((order) => {
    const date = new Date(order.createdAt);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const yearOrders = orders.filter((order) => {
    const date = new Date(order.createdAt);
    return date.getFullYear() === currentYear;
  });

  //dynamic revenue
const calcRevenue = (orderList) =>
  orderList.reduce(
    (acc, order) => {
      if (order.status === "Completed") {
        acc.received += order.totalAmount;
        acc.total += order.totalAmount;  // ✅ Only count this in total
      } else {
        acc.pending += order.totalAmount;
      }
      return acc;
    },
    { received: 0, pending: 0, total: 0 }
  );


  const todayRevenue = calcRevenue(todayOrders);
  const monthRevenue = calcRevenue(monthOrders);
  const yearRevenue = calcRevenue(yearOrders);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <div
              className="admin-header cursor-pointer"
              onClick={() => setShowOrderStats(!showOrderStats)}
            >
              Order Statistics
              <ChevronDown
                className={`transform transition-transform ${
                  showOrderStats ? "rotate-180" : ""
                }`}
              />
            </div>

            {showOrderStats && (
              <div className="dashboard-grid">
                <DashboardCard
                  title="📅 Today's Orders"
                  value={todayOrders.length}
                  onView={() => handleSectionChange("orders")}
                />
                <DashboardCard
                  title="📆 Monthly Orders"
                  value={monthOrders.length}
                  onView={() => handleSectionChange("orders")}
                />
                <DashboardCard
                  title="📈 Yearly Orders"
                  value={yearOrders.length}
                  onView={() => handleSectionChange("orders")}
                />
              </div>
            )}

            <div
              className="admin-header cursor-pointer"
              onClick={() => setShowMenuCards(!showMenuCards)}
            >
              Menu - Control Panel
              <ChevronDown
                className={`transform transition-transform ${
                  showMenuCards ? "rotate-180" : ""
                }`}
              />
            </div>

            {showMenuCards && (
              <div className="dashboard-grid">
                <DashboardCard
                  title="📁Total Categories"
                  value={stats.totalCategories}
                  onView={() => handleSectionChange("items")}
                />
                <DashboardCard
                  title="🍴Total Items"
                  value={stats.totalItems}
                  onView={() => handleSectionChange("items")}
                />
                <DashboardCard
                  title="🌟Today's Special"
                  value={stats.todaysSpecials}
                  onView={() => handleSectionChange("items")}
                />
              </div>
            )}
            <div
              className="admin-header cursor-pointer"
              onClick={() => setShowtable_booking(!showtable_booking)}
            >
              Table Bookings
              <ChevronDown
                className={`transform transition-transform ${
                  showtable_booking ? "rotate-180" : ""
                }`}
              />
            </div>

            {showtable_booking && (
              <div className="dashboard-grid">
                <DashboardCard
                  title="📌Reserved Tables"
                  value={tableSummary.reserved}
                  onView={() => handleSectionChange("table_booking")}
                />
                <DashboardCard
                  title=" ✅Available Tables"
                  value={tableSummary.available}
                  onView={() => handleSectionChange("table_booking")}
                />
                <DashboardCard
                  title="❌Occupied Tables"
                  value={tableSummary.occupied}
                  onView={() => handleSectionChange("table_booking")}
                />
              </div>
            )}

            <div
              className="admin-header cursor-pointer"
              onClick={() => setShowRevenueCards(!showRevenueCards)}
            >
              Revenue Report
              <ChevronDown
                className={`transform transition-transform ${
                  showRevenueCards ? "rotate-180" : ""
                }`}
              />
            </div>

            {showRevenueCards && (
              <>
                <div className="dashboard-grid three-cards">
                  <DashboardCard
                    title="📅 Today"
                    value={`₹${todayRevenue.total}`}
                    color="green"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="🗓️ This Month"
                    value={`₹${monthRevenue.total}`}
                    color="blue"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="📈 This Year"
                    value={`₹${yearRevenue.total}`}
                    color="purple"
                    onView={() => handleSectionChange("revenue")}
                  />
                </div>
              </>
            )}
          </>
        );

      case "items":
        return (
          <Section>
            <div className="p-6">
              <AdminMenu />
            </div>
          </Section>
        );
      case "orders":
        return (
          <Section>
            {" "}
            <div className="p-6">
              <OrdersSection />
            </div>
          </Section>
        );
      case "revenue":
        return (
          <Section>
            {" "}
            <div className="p-6">
              <Revenue />
            </div>
          </Section>
        );
      case "table_booking":
        return (
          <Section>
            <div className="p-6">
              <TableBooking />
            </div>
          </Section>
        );

      case "users":
        return (
          <Section>
            <div className="overflow-x-auto">
              <RegisteredUserList />
            </div>
          </Section>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  // const navItemClass = (section) => `p-2 w-full text-left rounded-xl transition-colors duration-150 ${activeSection === section ? "bg-gray-700 text-white font-semibold" : "hover:bg-gray-700 hover:text-white"}`;

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav>
          <div className="sidebar-section-title">DASHBOARD</div>
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`nav-button ${
              activeSection === "dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection("users")}
            className={`nav-button ${
              activeSection === "users" ? "active" : ""
            }`}
          >
            Registered Users
          </button>
<button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/home"; // or navigate("/admin/login") if using react-router
  }}
  className="nav-button text-red-600 hover:text-red-800"
>
  Logout
</button>

          <div className="sidebar-section-title">MANAGEMENT</div>

          <button
            onClick={() => setActiveSection("items")}
            className={`nav-button ${
              activeSection === "items" ? "active" : ""
            }`}
          >
            Items
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`nav-button ${
              activeSection === "orders" ? "active" : ""
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveSection("revenue")}
            className={`nav-button ${
              activeSection === "revenue" ? "active" : ""
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveSection("table_booking")}
            className={`nav-button ${
              activeSection === "table_booking" ? "active" : ""
            }`}
          >
            Table Booking
          </button>
        </nav>
        <footer className="sidebar-footer">Logged in as: Admin</footer>
      </aside>

      <main className="main-content">
        <h1 className="page-title">{activeSection.replace("_", " ")}</h1>
        {renderSection()}
        <div className="footer-links">
          Copyright © Resturant System 2025 |<a href="#">Privacy Policy</a> ·
          <a href="#">Terms</a>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
