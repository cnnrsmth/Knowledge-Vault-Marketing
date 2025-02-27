import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faLightbulb,
  faSearch,
  faWandMagicSparkles,
  faHome,
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useWaitlistSubmission } from "../hooks/useWaitlistSubmission";
import FluidOrbWithThemes from "./FluidOrbWithThemes";
import { useInView } from "react-intersection-observer";

// Update the keyframe animation
const glowingBorderKeyframes = `
  @keyframes borderBeam {
    0% {
      left: 0;
      opacity: 0;
    }
    5% {
      opacity: 0.7;
    }
    45% {
      opacity: 1;
    }
    55% {
      opacity: 0;
    }
    90% {
      left: 100%;
      opacity: 0;
    }
  }
`;

// Replace diagonal pattern with network animation
const networkPattern = `
  @keyframes networkPulse {
    0%, 100% {
      opacity: 1;
      filter: brightness(1);
    }
    50% {
      opacity: 0.7;
      filter: brightness(0.8);
    }
  }

  @keyframes subtleFloat {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-10px, -10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .network-grid {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    animation: networkPulse 8s ease-in-out infinite;
  }

  .network-grid::before {
    content: '';
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
      linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 35px 35px;
    background-position: center;
    mask-image: 
      radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 70%, transparent 100%),
      linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 100%);
    mask-composite: intersect;
    animation: subtleFloat 20s ease-in-out infinite;
    transition: opacity 0.3s ease-in-out;
  }

  .floating-orbs {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), transparent 70%);
    filter: blur(50px);
    animation: orbFloat 25s infinite ease-in-out;
  }

  .orb:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: -2s;
  }

  .orb:nth-child(2) {
    top: 60%;
    right: 15%;
    animation-delay: -5s;
  }

  .orb:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: -8s;
  }

  @keyframes orbFloat {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(30px, 30px);
    }
  }
`;

// Update the animations
const additionalAnimations = `
    @keyframes expand-circle {
      0% {
        transform: scale(0);
        opacity: 0.8;
        border-width: 4px;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        transform: scale(2);
        opacity: 0;
        border-width: 1px;
      }
    }

    .brain-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 300px;
    }

    .expanding-circle {
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 4px solid rgba(59, 130, 246, 0.5);
      animation: expand-circle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }

    .expanding-circle:nth-child(1) {
      animation-delay: -0s;
    }

    .expanding-circle:nth-child(2) {
      animation-delay: -1s;
    }

    .expanding-circle:nth-child(3) {
      animation-delay: -2s;
    }

    .brain-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
      filter: blur(10px);
      pointer-events: none;
    }

    @keyframes wave-motion {
      0% {
        transform: translateX(-8%) translateY(3%) rotate(-3deg) scale(0.95);
      }
      33% {
        transform: translateX(4%) translateY(-4%) rotate(2deg) scale(1);
      }
      66% {
        transform: translateX(-2%) translateY(5%) rotate(-1deg) scale(0.98);
      }
      100% {
        transform: translateX(-8%) translateY(3%) rotate(-3deg) scale(0.95);
      }
    }

    @keyframes wave-motion-alt {
      0% {
        transform: translateX(8%) translateY(-3%) rotate(3deg) scale(0.98);
      }
      33% {
        transform: translateX(-4%) translateY(4%) rotate(-2deg) scale(1);
      }
      66% {
        transform: translateX(2%) translateY(-5%) rotate(1deg) scale(0.95);
      }
      100% {
        transform: translateX(8%) translateY(-3%) rotate(3deg) scale(0.98);
      }
    }

    @keyframes pulse-glow {
      0%, 100% {
        opacity: 0.8;
        filter: brightness(0.8);
      }
      50% {
        opacity: 0.9;
        filter: brightness(0.9);
      }
    }

    .orb-container {
      position: relative;
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glowing-orb {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, 
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0.4) 60%,
        rgba(255, 255, 255, 0) 100%
      );
      box-shadow: 
        0 0 40px rgba(255, 255, 255, 0.2),
        inset 0 0 40px rgba(255, 255, 255, 0.2);
      overflow: hidden;
      backdrop-filter: blur(5px);
    }

    .blob {
      position: absolute;
      inset: 10px;
      filter: blur(10px);
      mix-blend-mode: overlay;
      animation: morph-blob 12s ease-in-out infinite;
      opacity: 0.8;
      transform-origin: center;
    }

    .blob-1 {
      background: linear-gradient(120deg, #60a5fa 0%, #3b82f6 100%);
      animation-delay: -3s;
    }

    .blob-2 {
      background: linear-gradient(-120deg, #2563eb 0%, #1d4ed8 100%);
      animation-delay: -6s;
      opacity: 0.7;
    }

    .blob-3 {
      background: linear-gradient(60deg, #93c5fd 0%, #60a5fa 100%);
      animation-delay: -9s;
      opacity: 0.6;
    }
`;

const ScrollIndicator = () => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="absolute bottom-12 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mt-12 sm:mt-0"
    onClick={() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }}
  >
    <span className="text-gray-400 text-sm font-medium">
      Click to learn more
    </span>
    <motion.div
      animate={{
        y: [0, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xl" />
    </motion.div>
  </motion.button>
);

interface FeatureSectionProps {
  icon: any;
  title: string;
  description: string;
  isReversed?: boolean;
  isFirstSection?: boolean;
  index: number;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon,
  title,
  description,
  isReversed,
  isFirstSection,
  index,
}) => {
  const isAskVault = title.includes("Ask Your Vault");
  const themeIndex = index % 2 === 0 ? 0 : 3;
  const [ref, isInView] = useInView({
    rootMargin: "-10% 0px -10% 0px",
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isReversed ? 100 : -100,
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : isReversed ? 100 : -100,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-12 items-center max-w-6xl mx-auto px-4 py-20`}
    >
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : isReversed ? 50 : -50,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeInOut",
        }}
      >
        <div className="group mb-6">
          <div className="relative">
            <div className="absolute inset-0 transition-all duration-300" />
            <div className="relative h-16 w-16 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <FontAwesomeIcon icon={icon} className="text-3xl text-gray-400" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </motion.div>
      <motion.div
        className="flex-1 relative flex items-center justify-center"
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : isReversed ? -50 : 50,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: "easeInOut",
        }}
      >
        {isFirstSection ? (
          <>
            <div className="absolute inset-0 bg-black rounded-xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                  opacity: 0.5,
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <FluidOrbWithThemes themeIndex={themeIndex} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <FluidOrbWithThemes themeIndex={themeIndex} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Email Input Component
const EmailInput: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const { submitEmail, isLoading, error, success } = useWaitlistSubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEmail(email);
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} relative`}>
      <div className="flex gap-2 w-full relative">
        <div className="relative flex-1">
          {/* Glowing border beam effect */}
          <div
            className="absolute h-[2px] w-[30%] top-0 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 overflow-hidden"
            style={{
              animation: "borderBeam 8s ease-in-out infinite",
            }}
          />
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 backdrop-blur-sm"
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
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 text-white bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg font-medium transition-colors whitespace-nowrap backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          {isLoading ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
    </form>
  );
};

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-400 overflow-x-hidden relative">
      {/* Network Pattern Overlay - Moved before Navbar */}
      <div className="network-grid" />

      {/* Floating Orbs - Moved before Navbar */}
      <div className="floating-orbs">
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
      </div>

      {/* Gradient Background - Moved before Navbar */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-50 z-[1]" />
      <div className="absolute inset-0 bg-gradient-conic from-blue-500/5 via-transparent to-transparent opacity-30 z-[1]" />

      {/* Content starts here with higher z-index */}
      <div className="relative z-[2]">
        <Navbar />
        {/* Add the keyframes and patterns to the page */}
        <style>
          {glowingBorderKeyframes}
          {networkPattern}
          {additionalAnimations}
        </style>

        {/* Fixed bottom gradient blur */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-[100] backdrop-blur-[2px]" />

        {/* Hero Section */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-3xl mx-auto flex flex-col justify-between min-h-[60vh] sm:h-[70vh] mt-16 sm:mt-0"
          >
            {/* Title Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent px-2 sm:px-0">
                One Vault to Rule Them All
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 px-2 sm:px-0">
                Summarise your books, ask them questions, and effortlessly
                connect ideas to unlock new insights.
              </p>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-400 text-lg flex flex-col items-center benefits-section px-2 sm:px-0"
            >
              <span className="text-sm uppercase tracking-wider font-medium text-blue-400/80 mt-8 mb-8">
                Key Benefits
              </span>

              {/* Book Features Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row justify-start sm:justify-center gap-6 mb-8">
                {[
                  {
                    icon: faWandMagicSparkles,
                    label: "Get Instant Book Summaries",
                    sectionId: "instant-summaries",
                  },
                  {
                    icon: faBookOpen,
                    label: "Store Book Summaries In Your Vault",
                    sectionId: "knowledge-vault",
                  },
                  {
                    icon: faLightbulb,
                    label: "Ask Your Vault Questions",
                    sectionId: "ask-vault",
                  },
                  {
                    icon: faSearch,
                    label: "Easily Find Content That Matters",
                    sectionId: "dynamic-search",
                  },
                  {
                    icon: faHome,
                    label: "Personalise Everything To Your Needs",
                    sectionId: "personalized-home",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group flex flex-row sm:flex-col items-center sm:items-center gap-4 cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById(item.sectionId)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full group-hover:bg-blue-500/10 transition-all duration-300" />
                      <div className="relative h-14 w-14 sm:h-14 sm:w-14 md:h-16 md:w-16 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-2xl sm:text-3xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-400/90 group-hover:text-white transition-colors duration-300 text-left sm:text-center">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col items-center px-2 sm:px-0 mb-16 sm:mb-0"
            >
              <span className="text-sm pb-4 sm:pb-4 text-gray-500">
                Be the first to know when we launch
              </span>
              <EmailInput className="w-full max-w-md mb-6 sm:mb-8" />
            </motion.div>
          </motion.div>

          <ScrollIndicator />
        </div>

        {/* Feature Sections */}
        <div className="relative">
          {/* Replace gradient with solid dark background */}
          <div className="absolute inset-0 bg-black pointer-events-none" />

          <div className="relative">
            {/* Feature sections remain the same but with added visual separators */}
            <div id="instant-summaries" className="border-t border-gray-800/50">
              <FeatureSection
                icon={faWandMagicSparkles}
                title="Instant AI-Powered Book Summaries That Save You Time"
                description="Get clear, concise summaries of every book you consume. Includes imagery, key learnings, quotes, and detailed notes, all generated by AI to save you time and effort."
                isFirstSection={true}
                index={0}
              />
            </div>

            <div id="knowledge-vault" className="border-t border-gray-800">
              <FeatureSection
                icon={faBookOpen}
                title="All Your Book Summaries, Organised in One Place"
                description="Never lose track of what you've read again. Store all your book summaries, key takeaways, quotes and notes in a sleek Vault. Keep your learning journey all in one place."
                isReversed
                index={1}
              />
            </div>

            <div id="ask-vault" className="border-t border-gray-800">
              <FeatureSection
                icon={faLightbulb}
                title="Unlock Hidden Connections in Your Reading with AI-Powered Q&A"
                description="Use AI-powered chat to ask questions and uncover insights hidden across your content. Connect themes, ideas, and concepts across all the books you've consumed, like having a smart personal assistant for your knowledge."
                index={2}
              />
            </div>

            <div id="dynamic-search" className="border-t border-gray-800">
              <FeatureSection
                icon={faSearch}
                title="Effortless Search & Filters to Instantly Find What Matters"
                description="Effortlessly navigate your Vault with powerful search and filters. Whether you're looking for detailed notes, key quotes that resonate, or the most impactful takeaways, find exactly what you need — fast."
                isReversed
                index={3}
              />
            </div>

            <div id="personalized-home" className="border-t border-gray-800">
              <FeatureSection
                icon={faHome}
                title="Tailor Your Knowledge Vault to Fit Your Style"
                description="Make Knowledge Vault your own with a fully customizable UI. Choose layouts, preferences, and themes that suit your style, so you feel at home."
                index={4}
              />
            </div>
          </div>
        </div>

        {/* Final CTA Section with enhanced visibility */}
        <div className="border-t border-gray-800 bg-gradient-to-t from-blue-900/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                Ready to Supercharge Your Learning?
              </h2>
              <p className="text-gray-400 text-lg">
                Provide your email and we'll inform you as soon as we're ready
                to launch!
              </p>
              {/* Email Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <EmailInput className="w-full max-w-md mb-8" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
