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
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { useWaitlistSubmission } from "../hooks/useWaitlistSubmission";
import FluidOrbWithThemes from "./FluidOrbWithThemes";
import { useInView } from "react-intersection-observer";
import HeroImage from "../assets/generic-marketing-digital-nomad.png";
import MikeImage from "../assets/mike.png";
import JosephKimImage from "../assets/joseph-kim.png";
import SamMeyerImage from "../assets/sam-meyer.png";

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
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          {description}
        </p>

        {/* New Feature Detail */}
        <div className="flex flex-col gap-4 mt-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ delay: 0.3 + item * 0.1, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-xs text-blue-400"
                />
              </div>
              <p className="text-gray-400">
                {index === 0 &&
                  item === 1 &&
                  "Summarise any book in seconds with AI"}
                {index === 0 &&
                  item === 2 &&
                  "Extract key insights and actionable takeaways"}
                {index === 0 && item === 3 && "Save hours of note taking time"}

                {index === 1 &&
                  item === 1 &&
                  "Organise all your books in one place"}
                {index === 1 &&
                  item === 2 &&
                  "Seamlessly update your books and content"}
                {index === 1 && item === 3 && "Recall information with ease"}

                {index === 2 &&
                  item === 1 &&
                  "Find exactly what you need with with dynamic search and filters"}
                {index === 2 &&
                  item === 2 &&
                  "Filter by categories, topics, or custom tags"}
                {index === 2 &&
                  item === 3 &&
                  "Connect insights across different books"}
              </p>
            </motion.div>
          ))}
        </div>
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
        {/* Video Container with SaaS-like styling */}
        <div className="w-full relative rounded-xl overflow-hidden shadow-2xl group transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/20 feature-float">
          {/* Video Overlay for style */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-transparent z-10 pointer-events-none group-hover:from-blue-900/40 transition-all duration-300"></div>

          {/* Decorative Elements */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
          </div>

          {/* Video Element */}
          <div className="relative rounded-xl overflow-hidden border border-gray-700/60 group-hover:border-blue-500/30 transition-all duration-300">
            <div
              style={{
                position: "relative",
                paddingBottom: "56.69291338582677%",
                height: 0,
              }}
            >
              <iframe
                src={
                  index === 0
                    ? "https://www.loom.com/embed/790ee971c6d94a5ebe1c08577e92ad3a?sid=83b487fc-d7bb-4953-9e51-8c4f015aa731"
                    : index === 1
                    ? "https://www.loom.com/embed/c9cf500365f94e60936c03d45ade8c67?sid=9b2cdb74-7310-4f28-9004-ad2e4fc1d673"
                    : "https://www.loom.com/embed/9659718219644fedaf5ed3e3ba3411cf?sid=abd57314-25be-47e6-bc2e-241d4be8cfed"
                }
                frameBorder="0"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            </div>
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
          {isLoading ? "Processing..." : "Sign Up Now"}
        </button>
      </div>
    </form>
  );
};

// Testimonial Carousel Component
const TestimonialCarousel: React.FC = () => {
  const testimonials = [
    {
      name: "Mike Albertson",
      role: "Non-Fiction Reader",
      text: "I've decided to unsubscribe from Blinkist. This is has everything I need without overcomplicating things",
      image: MikeImage,
      stars: 5,
    },
    {
      name: "Samantha Meyer",
      role: "Busy Mum",
      text: "I love quotes. Knowledge Vault helps me find the quotes I need quickly and easily.",
      image: SamMeyerImage,
      stars: 5,
    },
    {
      name: "Joseph Kim",
      role: "Digital Nomad",
      text: "Cool app. It's much nicer to spend your time learning new knowledge, rather than spending hours browsing social media.",
      image: JosephKimImage,
      stars: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Render star ratings
  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            What Our Users Are Saying
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Testimonial Cards */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
                        {/* Image Column */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center">
                          <div className="relative mb-4">
                            <span className="absolute -top-3 -left-3 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-lg z-10">
                              {testimonial.role}
                            </span>
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="w-full lg:w-2/3">
                          <div className="flex mb-4">
                            {renderStars(testimonial.stars)}
                          </div>

                          <div className="relative">
                            {/* Large quote mark */}
                            <div className="absolute -top-10 -left-6 text-blue-200/20 pointer-events-none">
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                            </div>
                            <p className="text-gray-200 text-lg md:text-xl font-medium mb-6 pl-3 leading-relaxed">
                              {testimonial.text}
                            </p>
                          </div>

                          <div className="mt-4">
                            <p className="font-medium text-white text-lg">
                              {testimonial.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-blue-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <button
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + testimonials.length) % testimonials.length
                )
              }
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIndex((activeIndex + 1) % testimonials.length)
              }
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
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
            className="text-center w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between min-h-[60vh] sm:h-[70vh] mt-16 sm:mt-0 gap-8"
          >
            {/* Title and Content Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:w-1/2 text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent px-2 sm:px-0 leading-tight pb-2">
                Turn Every Book Into Lasting Knowledge
              </h1>

              {/* Added CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-start pt-4">
                <button
                  onClick={() =>
                    document
                      .querySelector(".benefits-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563eb] rounded-lg text-white transition-colors text-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  Learn More
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.tryknowledgevault.xyz", "_blank")
                  }
                  className="px-6 py-3 bg-transparent border border-gray-700 hover:border-blue-500/50 rounded-lg text-white transition-colors text-lg font-medium hover:bg-gray-800/30"
                >
                  Sign Up Now
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="md:w-1/2 relative"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-blue-500/10 border border-gray-800/60">
                <img
                  src={HeroImage}
                  alt="Digital Nomad using Knowledge Vault"
                  className="w-full h-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent rounded-xl"></div>
              </div>

              {/* Floating feature badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-5 -left-5 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-blue-500/30 text-white text-sm font-medium"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -top-5 -right-5 bg-purple-600/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-purple-500/30 text-white text-sm font-medium"
              >
                AI-Powered Summaries
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Section - Modified to be more compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-lg flex flex-col items-center benefits-section px-2 sm:px-0 mt-12 md:mt-0"
          ></motion.div>

          <ScrollIndicator />
        </div>

        {/* Feature Sections */}
        <div className="relative">
          {/* Replace gradient with solid dark background */}
          <div className="absolute inset-0 bg-black pointer-events-none" />

          <div className="relative">
            {/* Feature sections with enhanced styling */}
            <div
              id="instant-summaries"
              className="border-t border-gray-800/50 relative overflow-hidden"
            >
              {/* Feature glow effect */}
              <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full filter blur-[100px] opacity-60 pointer-events-none"></div>

              <FeatureSection
                icon={faWandMagicSparkles}
                title="Instant Book Summaries That Save You Time"
                description="Get clear, concise summaries of every book you consume."
                isFirstSection={true}
                index={0}
              />
            </div>

            <div
              id="knowledge-vault"
              className="border-t border-gray-800 relative overflow-hidden"
            >
              {/* Feature glow effect */}
              <div className="absolute top-1/2 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-60 pointer-events-none"></div>

              <FeatureSection
                icon={faBookOpen}
                title="All Your Book Summaries, Organised in One Place"
                description="Never lose track of what you've read again."
                isReversed
                index={1}
              />
            </div>

            <div
              id="dynamic-search"
              className="border-t border-gray-800 relative overflow-hidden"
            >
              {/* Feature glow effect */}
              <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full filter blur-[100px] opacity-60 pointer-events-none"></div>

              <FeatureSection
                icon={faSearch}
                title="Instantly Find What Matters"
                description="Effortlessly navigate with powerful search and filters. "
                index={2}
              />
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="border-t border-gray-800/50 bg-black relative overflow-hidden">
          <TestimonialCarousel />
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
                className="px-8 py-4 bg-blue-600 text-white text-lg md:text-xl font-bold rounded-lg shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Sign Up, I Dare You
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
