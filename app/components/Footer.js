// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-4 lg:mb-0">
            &copy; 2024 Pragnesh Padhiyar. All rights reserved.
          </p>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
