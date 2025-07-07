import React from 'react';
import { FaHamburger } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white">
          <FaHamburger className="text-yellow-500" />
          <span>Developer Restaurant</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="space-x-4 hidden md:flex">
          <a
            href="#home"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </a>
          <a
            href="#content"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Content
          </a>
          <a
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
