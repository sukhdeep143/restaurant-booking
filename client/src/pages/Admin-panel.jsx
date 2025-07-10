import React, { useState } from "react";
// import axios from 'axios';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";
import "../components/ui/admin-panel.css";
import AdminMenu from "../components/ui/admin-menu";
import TableBooking from "../components/ui/TableBooking";
import CategoryTable from "../components/ui/category";
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
                  title="Today's Special"
                  value={3}
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
                  title="Reserved Tables"
                  value={4}
                  onView={() => handleSectionChange("table_booking")}
                />
                <DashboardCard
                  title="Available Tables"
                  value={6}
                  onView={() => handleSectionChange("table_booking")}
                />
                <DashboardCard
                  title="Occupied Tables"
                  value={6}
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
          <Section >
            <div className="p-6">
      <CategoryTable />
    </div>
          </Section>
        );
      case "items":
        return (
          <Section >
            
    <div className="p-6">
      <AdminMenu />
    </div>
  
          </Section>
        );
      case "orders":
        return (
          <Section > <div className="p-6">
      <OrdersSection/>
    </div></Section>
        );
      case "revenue":
        return (
          <Section > <div className="p-6">
    <Revenue />
  </div></Section>
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
          <Section >
            <div className="overflow-x-auto">
             
      <RegisteredUserList/>
    
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

