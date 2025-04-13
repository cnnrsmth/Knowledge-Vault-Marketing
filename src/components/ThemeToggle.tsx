import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full flex items-center justify-center transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className={`w-6 h-6 flex items-center justify-center ${
          isDarkMode ? "text-yellow-300" : "text-blue-600"
        }`}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
