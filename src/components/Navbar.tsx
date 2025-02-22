import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png"; // Adjust path based on location
import { useWaitlistSubmission } from "../hooks/useWaitlistSubmission";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { submitEmail, isLoading, error, success } = useWaitlistSubmission();

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
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitEmail(email);
    if (!error) {
      setTimeout(() => {
        setShowEmailInput(false);
        setEmail("");
      }, 1500);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-black/50 backdrop-blur-md border-b border-gray-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src={Logo}
                  alt="Knowledge Vault Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-base sm:text-lg font-medium ml-2 sm:ml-3">
                Knowledge Vault
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setShowEmailInput(true)}
                className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-800/50 py-4"
              >
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      setShowEmailInput(true);
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Email Input Modal */}
      <AnimatePresence>
        {showEmailInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEmailInput(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Join the Waitlist
                </h3>
                <button
                  onClick={() => setShowEmailInput(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    disabled={isLoading}
                  />
                  {/* Status Icons */}
                  <AnimatePresence>
                    {(success || error) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-3 inset-y-0 flex items-center"
                      >
                        <div
                          className={`h-5 w-5 flex items-center justify-center rounded-full ${
                            success ? "bg-green-500/20" : "bg-red-500/20"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={success ? faCheck : faXmark}
                            className={`text-xs ${
                              success ? "text-green-500" : "text-red-500"
                            }`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-4 w-full px-6 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg font-medium transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  {isLoading ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
