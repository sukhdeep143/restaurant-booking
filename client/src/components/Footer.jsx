// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        <p className="text-sm mb-4 md:mb-0">
          © 2025 <span className="font-semibold text-blue-600 dark:text-blue-400">EasyDine</span>. All rights reserved.
        </p>
        
        <div className="flex space-x-4">
          <a
            href="https://github.com/sukhdeep143/restaurant-booking"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          
          <a
            href="https://github.com/sukhdeep143/restaurant-booking"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://twitter.com/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-white transition"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
