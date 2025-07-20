// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700">
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About EasyDine</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><a href="/partner" className="hover:underline">Partner with EasyDine</a></li>
            <li><a href="/affiliate" className="hover:underline">Affiliate Program</a></li>
            <li><a href="/advertise" className="hover:underline">Advertise Your Restaurant</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/sukhdeep143/restaurant-booking/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          © 2025 <span className="font-semibold text-blue-400">EasyDine</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
