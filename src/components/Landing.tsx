import React, { useState, useEffect } from "react";
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
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useWaitlistSubmission } from "../hooks/useWaitlistSubmission";
import FluidOrbWithThemes from "./FluidOrbWithThemes";
import { useInView } from "react-intersection-observer";
import HeroImage from "../assets/generic-marketing-digital-nomad.png";
import RachelImage from "../assets/rachel.jpeg";
import HelenImage from "../assets/helen.jpeg";
import AllBooksGif from "../assets/all-your-books-in-one-place.gif";
import InstantlyFindGif from "../assets/instantly-find-what-matters.gif";
import InstantBookSummariesGif from "../assets/inatant-book-summaries.gif";
import AIGenGIF from "../assets/AIGenGIF.gif";
import EditingGIF from "../assets/EditingGIF.gif";
import AIAgentImage from "../assets/aiagentcomingsoon.png";
import BrendanImage from "../assets/brendan.jpeg";
import JackyImage from "../assets/jacky.png";
import AbhishekImage from "../assets/abhishek.jpeg";
import GinoImage from "../assets/gino.jpeg";
import SukhImage from "../assets/sukh.jpeg";
import StephanImage from "../assets/stephan.jpeg";
import ZulalImage from "../assets/Zulal.jpeg";
import MiguelImage from "../assets/miguel.png";
import AdarshImage from "../assets/adarsh.jpeg";
import KnowledgeVaultDetailed from "../assets/knowledge-vault-detailed.png";
import KnowledgeVaultSearch from "../assets/knowledge-vault-search.png";
import KnowledgeVaultSummarise from "../assets/knowledge-vault-summarise.png";
import BooksImage from "../assets/books.png";
import TakeawaysImage from "../assets/takeaways.png";
import QuotesImage from "../assets/quotes.png";
import NotesImage from "../assets/notes.png";
import { useTheme } from "../hooks/useTheme";

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

    /* Prevent white overscroll */
    html, body {
      background-color: #000;
      overscroll-behavior: none;
    }
    
    /* Ensure the root element has black background */
    #root {
      background-color: #000;
      min-height: 100vh;
    }

    /* Custom scrollbar styling */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(59, 130, 246, 0.3);
      border-radius: 20px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgba(59, 130, 246, 0.5);
    }
    
    /* Hide scrollbar for Firefox */
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
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
    
    /* Video feature animation */
    @keyframes float-element {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
    
    .feature-float {
      animation: float-element 6s ease-in-out infinite;
    }
    
    .feature-tag-pulse {
      animation: pulse-tag 3s ease-in-out infinite;
    }
    
    @keyframes pulse-tag {
      0%, 100% {
        box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
      }
      50% {
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.7);
      }
    }
`;

const ScrollIndicator = () => <></>;

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
  const themeIndex = index % 2 === 0 ? 0 : 3;
  const [ref, isInView] = useInView({
    rootMargin: "-10% 0px -10% 0px",
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: window.innerWidth > 640 ? (isReversed ? 100 : -100) : 0,
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x:
          window.innerWidth > 640
            ? isInView
              ? 0
              : isReversed
              ? 100
              : -100
            : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-6 sm:gap-12 items-center max-w-6xl mx-auto px-4 py-10 sm:py-20`}
    >
      <motion.div
        className="flex-1"
        initial={{
          opacity: 0,
          x: window.innerWidth > 640 ? (isReversed ? 50 : -50) : 0,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          x:
            window.innerWidth > 640
              ? isInView
                ? 0
                : isReversed
                ? 50
                : -50
              : 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeInOut",
        }}
      >
        <div className="group mb-4 sm:mb-6">
          <div className="relative">
            <div className="absolute inset-0 transition-all duration-300" />
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <FontAwesomeIcon
                icon={icon}
                className="text-2xl sm:text-3xl text-gray-400"
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
          {description}
        </p>

        {/* New Feature Detail */}
        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ delay: 0.3 + item * 0.1, duration: 0.5 }}
              className="flex items-start gap-2 sm:gap-3"
            >
              <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-[10px] sm:text-xs text-blue-400"
                />
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                {index === 0 &&
                  item === 1 &&
                  "Search and summarise any book in seconds"}
                {index === 0 &&
                  item === 2 &&
                  "Synthesise key takeaways, quotes, and notes"}
                {index === 0 &&
                  item === 3 &&
                  "Make edits to summaries so they're more, you"}

                {index === 1 &&
                  item === 1 &&
                  "Organise all your books in one place"}
                {index === 1 &&
                  item === 2 &&
                  "View key takeaways by book, topic, author and more"}
                {index === 1 &&
                  item === 3 &&
                  "Your own AI assistant that knows your books inside and out... coming soon"}

                {index === 2 &&
                  item === 1 &&
                  "Search and filters that adapt in real time, as your book list evolves"}
                {index === 2 &&
                  item === 2 &&
                  "Frictionlessly search across all your books for key learnings"}
                {index === 2 &&
                  item === 3 &&
                  "Connect insights across everything you've read"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="flex-1 relative flex items-center justify-center w-full md:w-auto mt-6 md:mt-0"
        initial={{
          opacity: 0,
          x: window.innerWidth > 640 ? (isReversed ? -50 : 50) : 0,
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          x:
            window.innerWidth > 640
              ? isInView
                ? 0
                : isReversed
                ? -50
                : 50
              : 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: "easeInOut",
        }}
      >
        {/* Video Container without hover glow or bouncing animation */}
        <div className="w-full relative rounded-xl overflow-hidden shadow-2xl group transition-all duration-300">
          {/* Remove glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-transparent z-10 pointer-events-none"></div>

          {/* Video Element or GIF based on index */}
          <div className="relative rounded-xl overflow-hidden border border-gray-700/60 transition-all duration-300">
            {index === 0 ? (
              <img
                src={InstantBookSummariesGif}
                alt="Save time with instant book summaries"
                className="w-full h-auto"
              />
            ) : index === 1 ? (
              <img
                src={AllBooksGif}
                alt="All your book summaries in one place"
                className="w-full h-auto"
              />
            ) : index === 2 ? (
              <img
                src={InstantlyFindGif}
                alt="Instantly find what matters"
                className="w-full h-auto"
              />
            ) : null}
          </div>
        </div>
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
          {isLoading ? "Processing..." : "Try It, Free"}
        </button>
      </div>
    </form>
  );
};

// Twitter/X Style Testimonials Component
const TwitterTestimonials: React.FC = () => {
  const { isDarkMode } = useTheme();
  const testimonials = [
    {
      name: "Brendan O'Leary",
      handle: "@olearycrew",
      text: "I don't retain much from books. Having it stored in a place where i can quickly revisit key concepts is a game changer.\n\nNow I actually remember what I read! 🧠",
      image: BrendanImage,
    },
    {
      name: "Jacky W",
      handle: "@jkhwongie",
      text: "Been on @knowledge_vault for months and im HOOKED. Don't sleep on this app.",
      image: JackyImage,
    },
    {
      name: "Abhishek V",
      handle: "@abvijayvergiya",
      text: "Used to doomscroll, swapped it for @knowledge_vault.",
      image: AbhishekImage,
    },
    {
      name: "Gino",
      handle: "@Devmesis",
      text: "Cut 40+ hrs of reading and still know more?? @knowledge_vault is a cheat code.",
      image: GinoImage,
    },
    {
      name: "Sukh",
      handle: "@thisissukh_",
      text: "Bought @knowledge_vault a month ago, haven't left since. 💫",
      image: SukhImage,
    },
    {
      name: "Stephan Meijer",
      handle: "@meijer_s",
      text: "All my fave quotes, searchable in like 2 secs. @knowledge_vault.",
      image: StephanImage,
    },
    {
      name: "Zulal",
      handle: "@zee7",
      text: "I don't have time to summarise what I read, but @knowledge_vault does it for me. Edits are quick, and it keeps me sharp.",
      image: ZulalImage,
    },
    {
      name: "Miguel Rengifo",
      handle: "@miguelreng",
      text: "No time to read full books? Me neither. @knowledge_vault.",
      image: MiguelImage,
    },
    {
      name: "Rachel Kim",
      handle: "@rachelreads",
      text: "Ok @knowledge_vault has replaced Blinkist.🤯",
      image: RachelImage,
    },
    {
      name: "Adarsh Sharma",
      handle: "@ad0rsh",
      text: "1 book a week w @knowledge_vault and it's still fire. Worth every penny.",
      image: AdarshImage,
    },
    {
      name: "Helen Bailey",
      handle: "@helenbailey",
      text: "@knowledge_vault I skim summaries, find the bangers, then dive in. Obsessed w this thing.",
      image: HelenImage,
    },
  ];

  return (
    <div
      className={`py-10 sm:py-16 px-3 sm:px-6 md:px-8 ${
        isDarkMode ? "bg-black" : "bg-white"
      } relative overflow-hidden`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/3 left-1/4 w-64 h-64 ${
            isDarkMode ? "bg-blue-600/5" : "bg-blue-300/10"
          } rounded-full filter blur-[100px] opacity-60`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/4 w-64 h-64 ${
            isDarkMode ? "bg-purple-600/5" : "bg-purple-300/10"
          } rounded-full filter blur-[100px] opacity-60`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
              isDarkMode
                ? "from-white to-blue-300"
                : "from-gray-900 to-blue-600"
            } bg-clip-text text-transparent`}
          >
            What People Are Saying
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Pinterest-style masonry layout for testimonials */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:mb-24 sm:gap-4 space-y-3 sm:space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.handle}
              className={`${
                isDarkMode
                  ? "bg-gray-900/70 border-gray-800/70 hover:bg-gray-800/70 hover:border-gray-700/70"
                  : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              } backdrop-blur-sm rounded-xl p-3 sm:p-5 border
                transition-all duration-200 shadow-xl break-inside-avoid mb-3 sm:mb-4`}
              style={{
                height: "fit-content",
                display: "inline-block",
                width: "100%",
              }}
            >
              <div className="flex items-center mb-2 sm:mb-3">
                <div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden flex-shrink-0 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-100 border-gray-200"
                  } border`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-2 sm:ml-3">
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } text-xs sm:text-sm`}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs">
                    {testimonial.handle}
                  </p>
                </div>
              </div>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } text-xs sm:text-sm leading-relaxed whitespace-pre-line`}
              >
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div
          className={`pricing-section relative py-16 sm:py-20 ${
            isDarkMode
              ? "border-t border-gray-800/50"
              : "border-t border-gray-200/50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-blue-300"
                    : "from-gray-900 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Simple, Transparent Pricing
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Staggered pricing layout */}
            <div className="flex flex-col items-center justify-center lg:flex-row lg:items-end max-w-4xl mx-auto gap-8">
              {/* Free Tier */}
              <div
                className={`w-full lg:w-5/12 lg:translate-y-8 ${
                  isDarkMode
                    ? "bg-gray-900/70 border-gray-800/70 hover:bg-gray-800/70 hover:border-gray-700/70"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                } backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 shadow-xl`}
              >
                <div className="text-center mb-4">
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Free
                  </h3>
                  <div
                    className={`mt-2 text-3xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    £0
                  </div>
                  <div className="text-gray-400 text-sm">Forever</div>
                </div>
                <div
                  className={`${
                    isDarkMode
                      ? "border-t border-gray-800"
                      : "border-t border-gray-200"
                  } my-4`}
                ></div>
                <ul className="space-y-3">
                  <li
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-400 mr-2"
                    />
                    Unlimited books
                  </li>
                  <li
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-400 mr-2"
                    />
                    3 AI Generated Summaries
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() =>
                      window.open("https://www.tryknowledgevault.xyz", "_blank")
                    }
                    className={`w-full px-4 py-2 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors font-medium`}
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Pro Tier */}
              <div
                className={`w-full lg:w-7/12 mt-4 lg:mt-0 lg:min-h-[380px] ${
                  isDarkMode
                    ? "bg-gray-900/70 border-blue-600/30 hover:bg-gray-800/70 hover:border-blue-500/50"
                    : "bg-white border-blue-400/30 hover:bg-gray-50 hover:border-blue-400/50"
                } backdrop-blur-sm rounded-xl p-8 border transition-all duration-200 shadow-xl relative transform hover:-translate-y-1 z-10`}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </div>
                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Pro
                  </h3>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`mt-2 text-4xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      £5
                    </div>
                    <div className="text-gray-400 text-sm">per month</div>
                  </div>
                </div>
                <div
                  className={`${
                    isDarkMode
                      ? "border-t border-gray-800"
                      : "border-t border-gray-200"
                  } my-4`}
                ></div>
                <ul className="space-y-3">
                  <li
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-6 h-6 min-w-[1.5rem] rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    </div>
                    <span className="font-medium">Unlimited books</span>
                  </li>
                  <li
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-6 h-6 min-w-[1.5rem] rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    </div>
                    <span className="font-medium">
                      Unlimited AI Generated summaries
                    </span>
                  </li>

                  <li
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-6 h-6 min-w-[1.5rem] rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    </div>
                    <span className="font-medium">
                      Early access to new AI features
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() =>
                      window.open("https://www.tryknowledgevault.xyz", "_blank")
                    }
                    className={`w-full px-4 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors font-medium flex items-center justify-center`}
                  >
                    <span>Get Started</span>
                    <svg
                      className="ml-2 h-4 w-4"
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this component above the StepsLayout component
const ImageOverlay: React.FC<{
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  onClose: () => void;
}> = ({ isOpen, imageSrc, altText, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative max-w-5xl max-h-[90vh] w-auto h-auto rounded-xl overflow-hidden ${
          isDarkMode ? "shadow-[0_0_30px_rgba(59,130,246,0.3)]" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="max-w-full max-h-[90vh] object-contain"
        />
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full ${
            isDarkMode
              ? "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80"
              : "bg-white/80 text-gray-700 hover:bg-gray-100/80"
          }`}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </div>
  );
};

const StepsLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(1);
  const [activeCarouselImage, setActiveCarouselImage] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayImage, setOverlayImage] = useState("");
  const [overlayAlt, setOverlayAlt] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < 768);

    // Add window resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openOverlay = (src: string, alt: string) => {
    setOverlayImage(src);
    setOverlayAlt(alt);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const carouselImages = [
    { src: BooksImage, alt: "Books collection" },
    { src: TakeawaysImage, alt: "Takeaways view" },
    { src: QuotesImage, alt: "Quotes view" },
    { src: NotesImage, alt: "Notes view" },
  ];

  const handlePrevImage = () => {
    setActiveCarouselImage((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveCarouselImage((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const steps = [
    {
      number: 1,
      title: "Search for your book",
      description:
        "Use our search functionality to quickly identify the book you want to add.",
      content:
        "We connect to Google Books and Goodreads to ensure you can always find the book you're looking for.",
    },
    {
      number: 2,
      title: "Summarise your book",
      description:
        "Our AI will summarise your book instantly. Or you can summarise it yourself.",
      content:
        "Our AI analyses your book and generates a comprehensive summary in seconds. Each summary includes important quotes, actionable takeaways and detailed notes.",
    },
    {
      number: 3,
      title: "Grow your Knowledge Vault",
      description: "Every book you add makes your Knowledge Vault smarter.",
      content:
        "Explore hidden links between authors, surface recurring ideas, and connect takeaways across genres with ease.",
    },
  ];

  // Mobile stacked layout where each step is shown one after another
  const MobileLayout = () => (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto">
      {steps.map((step) => (
        <div key={step.number} className="w-full">
          {/* Step header */}
          <div
            className={`flex p-5 rounded-lg mb-4 ${
              isDarkMode
                ? "bg-blue-900/20 border-l-4 border-blue-400"
                : "bg-blue-50 border-l-4 border-blue-500"
            }`}
          >
            <div className="flex-shrink-0 mr-6">
              <div className="text-2xl font-mono font-bold text-blue-400">
                {step.number.toString().padStart(2, "0")}
              </div>
            </div>
            <div>
              <h3
                className={`font-medium text-lg ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>

          {/* Step content/image */}
          <div className="w-full">
            {step.number === 1 && (
              <div className="w-full group relative">
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <img
                    src={KnowledgeVaultSearch}
                    alt="Search for books"
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isDarkMode
                        ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : ""
                    }`}
                  />
                </div>
                {/* Tap to expand button - more visible on mobile */}
                <button
                  onClick={() =>
                    openOverlay(KnowledgeVaultSearch, "Search for books")
                  }
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? "bg-gray-800/80 text-blue-400"
                      : "bg-white/80 text-blue-600"
                  }`}
                  aria-label="Expand image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                </button>
              </div>
            )}

            {step.number === 2 && (
              <div className="w-full h-[400px] overflow-y-auto custom-scrollbar group relative">
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <img
                    src={KnowledgeVaultSummarise}
                    alt="Book summarization"
                    className={`w-full object-contain transition-all duration-300 ${
                      isDarkMode
                        ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : ""
                    }`}
                    style={{ minHeight: "800px" }}
                  />
                </div>
                {/* Tap to expand button - more visible on mobile */}
                <button
                  onClick={() =>
                    openOverlay(KnowledgeVaultSummarise, "Book summarization")
                  }
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? "bg-gray-800/80 text-blue-400"
                      : "bg-white/80 text-blue-600"
                  }`}
                  aria-label="Expand image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                </button>
                {/* Add a scroll indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white/70 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            )}

            {step.number === 3 && (
              <div className="w-full relative">
                <div className="h-[400px] overflow-y-auto custom-scrollbar group relative">
                  <div
                    className="w-full rounded-xl overflow-hidden"
                    style={{ borderRadius: "0.75rem" }}
                  >
                    <img
                      src={carouselImages[activeCarouselImage].src}
                      alt={carouselImages[activeCarouselImage].alt}
                      className={`w-full object-contain transition-all duration-300 ${
                        isDarkMode
                          ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Tap to expand button - more visible on mobile */}
                  <button
                    onClick={() =>
                      openOverlay(
                        carouselImages[activeCarouselImage].src,
                        carouselImages[activeCarouselImage].alt
                      )
                    }
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${
                      isDarkMode
                        ? "bg-gray-800/80 text-blue-400"
                        : "bg-white/80 text-blue-600"
                    }`}
                    aria-label="Expand image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </button>
                </div>

                {/* Carousel controls */}
                <div className="mt-3 flex justify-center gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCarouselImage(index)}
                      className={`w-3 h-3 rounded-full ${
                        activeCarouselImage === index
                          ? "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>

                {/* Left/right buttons - larger on mobile */}
                <div className="flex justify-between mt-3">
                  <button
                    onClick={handlePrevImage}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isDarkMode
                        ? "bg-gray-800/80 text-white"
                        : "bg-gray-200/80 text-gray-800"
                    }`}
                    aria-label="Previous image"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isDarkMode
                        ? "bg-gray-800/80 text-white"
                        : "bg-gray-200/80 text-gray-800"
                    }`}
                    aria-label="Next image"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop interactive layout
  const DesktopLayout = () => (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto">
      {/* Steps list on the left */}
      <div className="lg:w-2/5">
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              onClick={() => setActiveStep(step.number)}
              className={`flex cursor-pointer p-6 rounded-lg transition-all duration-200 ${
                activeStep === step.number
                  ? isDarkMode
                    ? "bg-blue-900/20 border-l-4 border-blue-400"
                    : "bg-blue-50 border-l-4 border-blue-500"
                  : isDarkMode
                  ? "hover:bg-gray-800/50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 mr-6">
                <div
                  className={`text-2xl font-mono font-bold ${
                    activeStep === step.number
                      ? "text-blue-400"
                      : isDarkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {step.number.toString().padStart(2, "0")}
                </div>
              </div>
              <div>
                <h3
                  className={`font-medium text-xl ${
                    activeStep === step.number
                      ? isDarkMode
                        ? "text-white"
                        : "text-gray-900"
                      : isDarkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-base mt-2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } line-clamp-2`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content panel on the right - now full image */}
      <div className="lg:w-3/5">
        <div
          className={`h-full rounded-2xl overflow-hidden ${
            isDarkMode ? "bg-transparent" : "bg-transparent"
          }`}
        >
          {/* Images take up the full height and width */}
          <div className="h-full w-full">
            {activeStep === 1 && (
              <div className="w-full h-full group relative">
                <div
                  className="w-full h-full rounded-xl overflow-hidden"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <img
                    src={KnowledgeVaultSearch}
                    alt="Search for books"
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isDarkMode
                        ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : ""
                    }`}
                  />
                </div>
                {/* Subtle expand icon in top right */}
                <button
                  onClick={() =>
                    openOverlay(KnowledgeVaultSearch, "Search for books")
                  }
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/70 text-blue-400"
                      : "bg-white/70 text-blue-600"
                  }`}
                  aria-label="Expand image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                </button>
              </div>
            )}

            {activeStep === 2 && (
              <div className="w-full h-[500px] overflow-y-auto custom-scrollbar group relative">
                <div
                  className="w-full h-full rounded-xl overflow-hidden"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <img
                    src={KnowledgeVaultSummarise}
                    alt="Book summarization"
                    className={`w-full object-contain transition-all duration-300 ${
                      isDarkMode
                        ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : ""
                    }`}
                    style={{ minHeight: "800px" }}
                  />
                </div>
                {/* Subtle expand icon in top right */}
                <button
                  onClick={() =>
                    openOverlay(KnowledgeVaultSummarise, "Book summarization")
                  }
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/70 text-blue-400"
                      : "bg-white/70 text-blue-600"
                  }`}
                  aria-label="Expand image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                </button>
                {/* Add a scroll indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white/70 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="w-full h-full relative">
                <div className="h-[500px] overflow-y-auto custom-scrollbar group relative">
                  <div
                    className="w-full h-full rounded-xl overflow-hidden"
                    style={{ borderRadius: "0.75rem" }}
                  >
                    <img
                      src={carouselImages[activeCarouselImage].src}
                      alt={carouselImages[activeCarouselImage].alt}
                      className={`w-full object-contain transition-all duration-300 ${
                        isDarkMode
                          ? "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Subtle expand icon in top right */}
                  <button
                    onClick={() =>
                      openOverlay(
                        carouselImages[activeCarouselImage].src,
                        carouselImages[activeCarouselImage].alt
                      )
                    }
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/70 text-blue-400"
                        : "bg-white/70 text-blue-600"
                    }`}
                    aria-label="Expand image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </button>
                </div>

                {/* Carousel controls */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCarouselImage(index)}
                      className={`w-2 h-2 rounded-full ${
                        activeCarouselImage === index
                          ? "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>

                {/* Left/right buttons */}
                <button
                  onClick={handlePrevImage}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? "bg-gray-800/80 text-white hover:bg-gray-700/80"
                      : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
                  }`}
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                </button>
                <button
                  onClick={handleNextImage}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full ${
                    isDarkMode
                      ? "bg-gray-800/80 text-white hover:bg-gray-700/80"
                      : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
                  }`}
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ImageOverlay
        isOpen={isOverlayOpen}
        imageSrc={overlayImage}
        altText={overlayAlt}
        onClose={closeOverlay}
      />

      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
};

const Landing: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Add useEffect hook to apply styles directly to the body
  useEffect(() => {
    // Prevent overscroll white space with appropriate theme color
    document.body.style.backgroundColor = isDarkMode ? "#000" : "#fff";
    document.documentElement.style.backgroundColor = isDarkMode
      ? "#000"
      : "#fff";

    // Cleanup on component unmount
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-gray-400" : "bg-white text-gray-600"
      } overflow-x-hidden relative overflow-y-hidden`}
    >
      {/* Network Pattern Overlay - Moved before Navbar */}
      <div className={`network-grid ${isDarkMode ? "" : "light-network"}`} />

      {/* Floating Orbs - Moved before Navbar */}
      <div className="floating-orbs">
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
      </div>

      {/* Gradient Background - Moved before Navbar */}
      <div
        className={`absolute inset-0 bg-gradient-radial ${
          isDarkMode ? "from-blue-900/20" : "from-blue-200/30"
        } via-transparent to-transparent opacity-50 z-[1]`}
      />
      <div
        className={`absolute inset-0 bg-gradient-conic ${
          isDarkMode ? "from-blue-500/5" : "from-blue-300/15"
        } via-transparent to-transparent opacity-30 z-[1]`}
      />

      {/* Content starts here with higher z-index */}
      <div className="relative z-[2]">
        <Navbar />
        {/* Add the keyframes and patterns to the page */}
        <style>
          {glowingBorderKeyframes}
          {networkPattern}
          {additionalAnimations}
          {`
            /* Light mode overrides */
            .light-mode .network-grid::before {
              background-image: 
                radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.15) 1px, transparent 1px),
                linear-gradient(to right, rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(37, 99, 235, 0.1) 1px, transparent 1px);
            }
            
            .light-mode {
              --bg-primary: #ffffff;
              --bg-secondary: #f3f4f6;
              --bg-tertiary: #e5e7eb;
              --text-primary: #111827;
              --text-secondary: #4b5563;
              --border-color: #d1d5db;
              --highlight-color: #2563eb;
            }
            
            .dark-mode {
              --bg-primary: #000000;
              --bg-secondary: #111827;
              --bg-tertiary: #1f2937;
              --text-primary: #f9fafb;
              --text-secondary: #9ca3af;
              --border-color: #374151;
              --highlight-color: #3b82f6;
            }
          `}
        </style>

        {/* Hero Section with updated layout */}
        <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-start md:justify-center px-3 sm:px-6 md:px-8 py-8 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between min-h-[40vh] sm:min-h-[60vh] mt-8 md:mt-0 gap-6 sm:gap-8"
          >
            {/* Title Section with buttons below on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 md:w-1/2 text-center md:text-left mb-6 md:mb-0 mt-6 md:mt-0 w-full"
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-blue-300"
                    : "from-gray-900 to-blue-700"
                } bg-clip-text text-transparent leading-tight pb-1 sm:pb-2 px-4 sm:px-0`}
              >
                Turn Every Book into Lasting Knowledge.
              </h1>

              <p
                className={`text-lg sm:text-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6 px-4 sm:px-0`}
              >
                Your AI-powered vault to instantly summarise, personalise, and
                connect insights across books.
              </p>

              {/* Placeholder for product demo/animation */}
              <div className="mb-6 w-full max-w-md mx-auto md:mx-0">
                {/* Remove this placeholder text div */}
              </div>

              {/* Desktop-only buttons below title */}
              <div className="hidden md:flex flex-row gap-4 justify-start md:mt-4">
                <button
                  onClick={() =>
                    window.open("https://www.tryknowledgevault.xyz", "_blank")
                  }
                  className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors text-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center"
                >
                  <span>Try It Free</span>
                  <svg
                    className="ml-2 h-5 w-5"
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
                <button
                  onClick={() =>
                    document
                      .querySelector(".how-it-works-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`px-6 py-3 ${
                    isDarkMode
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 hover:text-blue-600"
                  } transition-colors text-lg font-medium flex items-center`}
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>How It Works</span>
                </button>
              </div>

              {/* Add microcopy under CTA */}
              <div className="hidden md:block text-sm text-gray-400 mt-2">
                No credit card required.
              </div>
            </motion.div>

            {/* Hero Image with increased bottom margin on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="md:w-1/2 relative w-full order-2 md:order-none mb-10 sm:mb-6 md:mb-0"
            >
              <div
                className={`relative overflow-hidden rounded-xl shadow-2xl ${
                  isDarkMode
                    ? "shadow-blue-500/10 border-gray-800/60"
                    : "shadow-blue-500/10 border-gray-200"
                } border`}
              >
                {/* Scrollable container for Knowledge Vault detailed screenshot */}
                <div className="relative h-[350px] md:h-[400px] overflow-hidden">
                  <div className="absolute inset-0 overflow-y-auto touch-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <img
                      src={KnowledgeVaultDetailed}
                      alt="Knowledge Vault detailed view"
                      className="w-full object-cover object-top"
                    />

                    {/* Gradient overlay to indicate scrollable content */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white/70 animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${
                    isDarkMode ? "from-black/40" : "from-transparent"
                  } to-transparent rounded-xl pointer-events-none`}
                ></div>
              </div>

              {/* Floating feature badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-5 bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg border border-blue-500/30 text-white text-xs sm:text-sm font-medium"
              >
                AI Generated Summaries
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile-only CTA Buttons */}
          <div className="md:hidden w-full max-w-xl mx-auto mt-2 flex flex-col sm:flex-row gap-3 justify-center items-center mb-8 px-4">
            <button
              onClick={() =>
                window.open("https://www.tryknowledgevault.xyz", "_blank")
              }
              className="w-full px-5 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors text-base font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center"
            >
              <span>Try It Free</span>
              <svg
                className="ml-2 h-5 w-5"
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
            <button
              onClick={() =>
                document
                  .querySelector(".how-it-works-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-full px-5 py-3 flex items-center justify-center ${
                isDarkMode
                  ? "text-white hover:text-blue-300"
                  : "text-gray-800 hover:text-blue-600"
              } transition-colors text-base font-medium`}
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>How It Works</span>
            </button>
            {/* Add mobile microcopy */}
            <div className="text-sm text-gray-400 w-full text-center mt-2">
              No credit card required.
            </div>
          </div>

          {/* Features Section - Modified to be more compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-lg flex flex-col items-center benefits-section px-2 sm:px-0 mt-6 md:mt-0"
          ></motion.div>

          <ScrollIndicator />
        </div>

        {/* How It Works Section */}
        <div
          className={`how-it-works-section relative py-24 sm:py-32 ${
            isDarkMode
              ? "border-t border-gray-800/50"
              : "border-t border-gray-200/50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center mb-20">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-blue-300"
                    : "from-gray-900 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Get started in 3 simple steps
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Steps on left, content on right layout */}
            <StepsLayout />
          </div>
        </div>

        {/* Feature Breakdown Section */}
        <div
          id="features"
          className={`feature-breakdown-section relative py-24 sm:py-32 ${
            isDarkMode
              ? "border-t border-gray-800/50"
              : "border-t border-gray-200/50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center mb-20">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-blue-300"
                    : "from-gray-900 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Reap the Rewards
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Zig-zag layout for feature cards */}
            <div className="space-y-36">
              {[
                {
                  icon: faWandMagicSparkles,
                  title: "Save time with instant book summaries",
                  description:
                    "Generate comprehensive AI summaries of any book in seconds. Our AI analyses the content and creates detailed summaries capturing the book's core ideas and message.",
                  reverse: false,
                },
                {
                  icon: faLightbulb,
                  title: "Personalise your book summaries so they're more, you",
                  description:
                    "AI can be great. But let's be real, it's not you. And you know better. You can fully customise your book summaries to make them reflect your own thoughts and ideas.",
                  reverse: true,
                },
                {
                  icon: faBookOpen,
                  title: "Find exactly what you need, and quickly",
                  description:
                    "Navigate your knowledge vault with ease. Search for specific ideas, quotes, or notes. And get instant results. This enables you to connect ideas across different books.",
                  reverse: false,
                },
                {
                  icon: faSearch,
                  title: "Personal AI Assistant",
                  description:
                    "Ask questions about your books and get instant, accurate answers. Your AI assistant knows all the books in your Knowledge Vault and can connect ideas in unique ways.",
                  comingSoon: true,
                  reverse: true,
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-6 md:gap-10 items-center`}
                >
                  {/* Feature icon and content */}
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div
                        className={`w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl`}
                      >
                        <FontAwesomeIcon icon={feature.icon} />
                      </div>
                      <h3
                        className={`text-xl sm:text-2xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      {feature.comingSoon && (
                        <div className="inline-flex px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } text-base leading-relaxed`}
                    >
                      {feature.description}
                    </p>
                    <div className="space-y-3 pt-3">
                      {[1, 2].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-[10px] text-blue-400"
                            />
                          </div>
                          <p className="text-gray-400 text-sm">
                            {idx === 0 &&
                              item === 1 &&
                              "Search and summarise any book in seconds"}
                            {idx === 0 &&
                              item === 2 &&
                              "Synthesise key takeaways, quotes, and notes in one click"}

                            {idx === 1 &&
                              item === 1 &&
                              "Add (or remove)additional notes and thoughts to your summaries"}
                            {idx === 1 &&
                              item === 2 &&
                              "Make direct edits to AI generated content"}

                            {idx === 2 &&
                              item === 1 &&
                              "Search and filters that adapt in real time, as your book list evolves"}
                            {idx === 2 &&
                              item === 2 &&
                              "Connect insights across everything you've read"}

                            {idx === 3 &&
                              item === 1 &&
                              "Ask follow-up questions about specific concepts"}
                            {idx === 3 &&
                              item === 2 &&
                              "Connects related ideas across your entire book collection"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature illustration/image */}
                  <div className="md:w-1/2">
                    <div
                      className={`${
                        isDarkMode
                          ? "bg-gray-900/70 border-gray-800/70 hover:bg-gray-800/70 hover:border-gray-700/70"
                          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      } backdrop-blur-sm rounded-xl border transition-all duration-200 shadow-xl overflow-hidden`}
                    >
                      {idx === 0 ? (
                        <div className="bg-black">
                          <img
                            src={AIGenGIF}
                            alt="Save time with instant book summaries"
                            className="w-full h-auto"
                          />
                        </div>
                      ) : idx === 1 ? (
                        <div className="bg-black">
                          <img
                            src={EditingGIF}
                            alt="Personalise your book summaries"
                            className="w-full h-auto"
                          />
                        </div>
                      ) : idx === 2 ? (
                        <div className="bg-black">
                          <img
                            src={InstantlyFindGif}
                            alt="Find exactly what you need"
                            className="w-full h-auto"
                          />
                        </div>
                      ) : idx === 3 ? (
                        <div className="bg-black">
                          <img
                            src={AIAgentImage}
                            alt="Personal AI assistant"
                            className="w-full h-auto"
                          />
                        </div>
                      ) : (
                        <p
                          className={`text-center text-sm p-3 sm:p-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Feature illustration {idx + 1}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="border-t border-gray-800/50 bg-black relative overflow-hidden">
          <TwitterTestimonials />
        </div>

        {/* Final CTA Section with enhanced visibility */}
        <div
          className={`border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-200/50"
          } bg-gradient-to-t from-blue-900/20 to-transparent py-24 sm:py-32`}
        >
          <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 sm:space-y-10"
            >
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white to-blue-300"
                    : "from-gray-900 to-blue-600"
                } bg-clip-text text-transparent`}
              >
                Ready to Supercharge Your Knowledge?
              </h2>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open("https://www.tryknowledgevault.xyz", "_blank")
                }
                className={`w-full max-w-sm mx-auto px-8 py-4 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors font-medium text-base sm:text-lg flex items-center justify-center`}
              >
                <span>Try It Free</span>
                <svg
                  className="ml-2 h-5 w-5"
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
              </motion.button>

              {/* Add microcopy under CTA */}
              <div className="text-sm text-gray-400 mt-4">
                No credit card required.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
