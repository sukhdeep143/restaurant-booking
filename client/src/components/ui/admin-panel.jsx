import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import "./admin-panel.css";

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

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
];


const mockTables = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  status: ["available", "reserved", "occupied"][Math.floor(Math.random() * 3)],
}));

const TableChart = ({ tables, onToggle }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "seat available";
      case "reserved":
        return "seat reserved";
      case "occupied":
        return "seat occupied";
      default:
        return "seat";
    }
  }
  };



const AdminPanel = () => {
  const [showMenuCards, setShowMenuCards] = useState(false);
  const [showOrderStats, setShowOrderStats] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showRevenueCards, setShowRevenueCards] = useState(false);
  const [showTableBooking, setShowTableBooking] = useState(false);

  const [tables, setTables] = useState(mockTables);

  const toggleTableStatus = (id) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id
          ? {
              ...table,
              status:
                table.status === "available"
                  ? "reserved"
                  : table.status === "reserved"
                  ? "available"
                  : table.status, // keep occupied unchanged
            }
          : table
      )
    );
  };

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
                  title="Pending Orders"
                  value={3}
                  onView={() => handleSectionChange("orders")}
                />
                <DashboardCard
                  title="Completed Orders"
                  value={5}
                  onView={() => handleSectionChange("orders")}
                />
                <DashboardCard
                  title="Cancelled Orders "
                  value={1}
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
                  title="Total Categories"
                  value={5}
                  onView={() => handleSectionChange("categories")}
                />
                <DashboardCard
                  title="Total Items"
                  value={24}
                  onView={() => handleSectionChange("items")}
                />
                <DashboardCard
                  title="Hidden Items"
                  value={2}
                  onView={() => handleSectionChange("items")}
                />
                <DashboardCard
                  title="Today's Special"
                  value={3}
                  onView={() => handleSectionChange("items")}
                />
              </div>
            )}
            <div
              className="admin-header cursor-pointer"
              onClick={() => setShowTableBooking(!showTableBooking)}
            >
              Table Bookings
              <ChevronDown
                className={`transform transition-transform ${
                  showTableBooking ? "rotate-180" : ""
                }`}
              />
            </div>

            {showTableBooking && (
              <div className="dashboard-grid">
                <DashboardCard
                  title="Reserved Tables"
                  value={4}
                  onView={() => handleSectionChange("Table Booking")}
                />
                <DashboardCard
                  title="Available Tables"
                  value={6}
                  onView={() => handleSectionChange("Table Booking")}
                />
                <DashboardCard
                  title="Occupied Tables"
                  value={6}
                  onView={() => handleSectionChange("Table Booking")}
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
                <h3 className="revenue-section-title">Today's Earnings</h3>
                <div className="dashboard-grid">
                  <DashboardCard
                    title="Payments Received"
                    value={0}
                    color="blue"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="Payments Yet to receive (COD)"
                    value={0}
                    color="yellow"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="Total Earnings"
                    value={0}
                    color="green"
                    onView={() => handleSectionChange("revenue")}
                  />
                </div>

                <h3 className="revenue-section-title">Total Earnings</h3>
                <div className="dashboard-grid">
                  <DashboardCard
                    title="Payments Received"
                    value={150}
                    color="blue"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="Payments Yet to receive (COD)"
                    value={0}
                    color="yellow"
                    onView={() => handleSectionChange("revenue")}
                  />
                  <DashboardCard
                    title="Total Earnings"
                    value={150}
                    color="green"
                    onView={() => handleSectionChange("revenue")}
                  />
                </div>
              </>
            )}
          </>
        );
      case "categories":
        return (
          <Section title="Manage Categories">
            Category management content goes here.
          </Section>
        );
      case "items":
        return (
          <Section title="Manage Items">
             <Button onClick={() => alert("Add Item Clicked!")}>Add New Item</Button>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">{item.status}</td>
                      <td className="p-3 space-x-2">
                        <Button size="sm" onClick={() => alert(`Edit ${item.name}`)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        );
      case "orders":
        return (
          <Section title="Orders">Orders list and controls go here.</Section>
        );
      case "revenue":
        return (
          <Section title="Revenue Report">Revenue Details go here.</Section>
        );
      case "Table Booking":
        return (
          <Section title="Table Booking Layout">
            <p className="info-text">
              Click on a table to toggle between Available and Reserved.
            </p>
            <TableChart tables={tables} onToggle={toggleTableStatus} />
          </Section>
        );

      case "users":
        return (
          <Section title="Registered Users">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

          <div className="sidebar-section-title">MANAGEMENT</div>
          <button
            onClick={() => setActiveSection("categories")}
            className={`nav-button ${
              activeSection === "categories" ? "active" : ""
            }`}
          >
            Category
          </button>
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
            onClick={() => setActiveSection("Table Booking")}
            className={`nav-button ${
              activeSection === "Table Booking" ? "active" : ""
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
