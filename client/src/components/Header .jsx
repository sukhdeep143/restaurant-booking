// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 text-center text-xl font-semibold">
      🍽️ EasyDine – Your Restaurant Booking Buddy
      <div className="mt-2">
        <button
          onClick={() => navigate("/userpanel")} // ✅ lowercase
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to User Panel
        </button>
      </div>
    </header>
  );
}
