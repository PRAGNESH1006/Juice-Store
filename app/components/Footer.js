// Footer.js

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">About Us</h5>
            <p className="text-sm">
              We are committed to bringing you the freshest and most delicious
              juices. Join us in our journey towards a healthier lifestyle.
            </p>
          </div>
          <div className="w-full sm:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="list-none">
              <li>
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="text-sm hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    router.push("/components/collection");
                  }}
                  className="text-sm hover:underline"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    router.push("/components/collection");
                  }}
                  className="text-sm hover:underline"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    router.push("/components/privacypolicy");
                  }}
                  className="text-sm hover:underline"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <p className="text-sm">123 Juice Street, Fruitville, FL 12345</p>
            <p className="text-sm">Email: pragneshpadhiyar4@.com</p>
            <p className="text-sm">Phone: +91 9879389572</p>
          </div>
        </div>
        <div className="text-center pt-6">
          <p className="text-sm">
            &copy; 2024 Juice Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
