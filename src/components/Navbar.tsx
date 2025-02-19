import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/Favicon2.png"; // Adjust path based on location

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBenefits = () => {
    const benefitsSection = document.querySelector(".benefits-section");
    benefitsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/50 backdrop-blur-md border-b border-gray-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-15 h-12">
                <img
                  src={Logo}
                  alt="Knowledge Vault Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-lg font-medium">
                Knowledge Vault
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <button
                onClick={scrollToBenefits}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Benefits
              </button>
              <button
                onClick={() => setShowEmailInput(true)}
                className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Email Input Modal */}
      <AnimatePresence>
        {showEmailInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowEmailInput(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Join the Waitlist
              </h3>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                />
                <button className="mt-4 w-full px-6 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg font-medium transition-colors text-white">
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
