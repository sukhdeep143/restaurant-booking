import React, { useState } from 'react';
import { FaHamburger, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo and Site Name */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white"
          onClick={closeMenu}
        >
          <FaHamburger className="text-yellow-500" />
          <span>Developer Restaurant</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/content"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Content
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>
            <Link
              to="/content"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Content
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
