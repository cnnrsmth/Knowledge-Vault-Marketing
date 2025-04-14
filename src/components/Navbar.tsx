import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png"; // Adjust path based on location
import { useWaitlistSubmission } from "../hooks/useWaitlistSubmission";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/useTheme";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { submitEmail, isLoading, error, success } = useWaitlistSubmission();
  const { isDarkMode } = useTheme();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between h-12 rounded-full py-1 px-4 ${
              isDarkMode
                ? "bg-gray-900/90 backdrop-blur-md border border-gray-800/50"
                : "bg-white/90 backdrop-blur-md border border-gray-200/50"
            } shadow-lg`}
          >
            {/* Logo and Name */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8">
                <img
                  src={Logo}
                  alt="Knowledge Vault Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className={`${
                  isDarkMode ? "text-white" : "text-gray-900"
                } text-base font-medium ml-2`}
              >
                Knowledge Vault
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } p-2`}
              >
                <svg
                  className="h-5 w-5"
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
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => {
                    const howItWorksSection = document.querySelector(
                      ".how-it-works-section"
                    );
                    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`${
                    isDarkMode
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 hover:text-blue-600"
                  } transition-colors text-sm`}
                >
                  How It Works
                </button>
                <button
                  onClick={() => {
                    const featuresSection = document.querySelector("#features");
                    featuresSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`${
                    isDarkMode
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 hover:text-blue-600"
                  } transition-colors text-sm`}
                >
                  Features
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.tryknowledgevault.xyz/vault",
                      "_blank"
                    )
                  }
                  className={`${
                    isDarkMode
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 hover:text-blue-600"
                  } transition-colors text-sm`}
                >
                  Featured Vaults
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={() =>
                    window.open("https://www.tryknowledgevault.xyz", "_blank")
                  }
                  className="flex items-center px-4 py-1.5 bg-[#3B82F6] hover:bg-[#2563eb] rounded-full text-white transition-colors text-sm"
                >
                  <span>Try It Free</span>
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-2"
              >
                <div
                  className={`rounded-xl py-6 px-5 ${
                    isDarkMode
                      ? "bg-gray-900/90 backdrop-blur-md border border-gray-800/50"
                      : "bg-white/90 backdrop-blur-md border border-gray-200/50"
                  } shadow-lg`}
                >
                  <div className="flex flex-col space-y-6">
                    <div className="flex justify-end mb-2">
                      <ThemeToggle />
                    </div>
                    <button
                      onClick={() => {
                        const howItWorksSection = document.querySelector(
                          ".how-it-works-section"
                        );
                        howItWorksSection?.scrollIntoView({
                          behavior: "smooth",
                        });
                        setIsMenuOpen(false);
                      }}
                      className={`${
                        isDarkMode
                          ? "text-white hover:text-blue-300"
                          : "text-gray-800 hover:text-blue-600"
                      } transition-colors text-sm py-2 text-center`}
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => {
                        const featuresSection =
                          document.querySelector("#features");
                        featuresSection?.scrollIntoView({ behavior: "smooth" });
                        setIsMenuOpen(false);
                      }}
                      className={`${
                        isDarkMode
                          ? "text-white hover:text-blue-300"
                          : "text-gray-800 hover:text-blue-600"
                      } transition-colors text-sm py-2 text-center`}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => {
                        window.open(
                          "https://www.tryknowledgevault.xyz/vault",
                          "_blank"
                        );
                        setIsMenuOpen(false);
                      }}
                      className={`${
                        isDarkMode
                          ? "text-white hover:text-blue-300"
                          : "text-gray-800 hover:text-blue-600"
                      } transition-colors text-sm py-2 text-center`}
                    >
                      Featured Vaults
                    </button>
                    <button
                      onClick={() => {
                        window.open(
                          "https://www.tryknowledgevault.xyz",
                          "_blank"
                        );
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center px-4 py-2.5 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors text-sm mt-2"
                    >
                      <span>Try It Free</span>
                      <svg
                        className="ml-1 h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
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
            className={`fixed inset-0 ${
              isDarkMode ? "bg-black/60" : "bg-gray-800/30"
            } backdrop-blur-sm z-50 flex items-center justify-center p-4`}
            onClick={() => setShowEmailInput(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } p-6 rounded-xl border max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Join Our Platform
                </h3>
                <button
                  onClick={() => setShowEmailInput(false)}
                  className={`${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
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
                    className={`w-full px-4 py-3 ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                    } border rounded-lg focus:outline-none focus:border-blue-500`}
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
