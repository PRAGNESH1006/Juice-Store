import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-4 ">
      <div>Smoothie data, method, and rating by Pragnesh Padhiyar</div>
      <div>&copy; {currentYear} Pragnesh Padhiyar. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
