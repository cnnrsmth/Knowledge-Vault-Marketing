import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faQuoteLeft,
  faPencil,
  faBrain,
  faLightbulb,
  faSearch,
  faWandMagicSparkles,
  faUserGear,
  faHome,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
      left: calc(100% - 100px);
      opacity: 0;
    }
  }
`;

const ScrollIndicator = () => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
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
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon,
  title,
  description,
  isReversed,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-12 items-center max-w-6xl mx-auto px-4 py-20`}
    >
      <div className="flex-1">
        <div className="text-blue-500 text-5xl mb-6">
          <FontAwesomeIcon
            icon={icon}
            className="transform transition-transform group-hover:scale-110"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50 transform transition-all hover:scale-105 hover:border-blue-500/50">
        <div className="aspect-video bg-gray-900/50 rounded-lg"></div>
      </div>
    </motion.div>
  );
};

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Add the keyframes to the page */}
      <style>{glowingBorderKeyframes}</style>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-conic from-blue-500/5 via-transparent to-transparent opacity-30" />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl flex flex-col justify-between h-[70vh]"
        >
          {/* Title Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Knowledge Vault
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Effortlessly connect insights across your all the books you've
              read, and grow your wisdom with every read.
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-lg flex flex-col items-center"
          >
            <span className="text-sm uppercase tracking-wider font-medium text-blue-400/80 mb-8">
              Key Benefits
            </span>

            {/* Book Features Icons */}
            <div className="flex justify-center gap-16 mb-8">
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
                  className="group flex flex-col items-center gap-3 cursor-pointer"
                  onClick={() => {
                    document
                      .getElementById(item.sectionId)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="relative">
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full group-hover:bg-blue-500/10 transition-all duration-300" />

                    {/* Icon Container */}
                    <div className="relative h-16 w-16 flex items-center justify-center bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-3xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-400/90 group-hover:text-white transition-colors duration-300">
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
            className="flex flex-col items-center"
          >
            <span className="text-sm pb-8 text-gray-500">
              Be the first to know when we launch
            </span>
            <div className="flex gap-2 w-full max-w-md relative mb-8">
              <div className="relative flex w-full gap-2">
                <div className="relative flex-1">
                  {/* Glowing border beam effect */}
                  <div
                    className="absolute h-[2px] w-[200px] top-0 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 overflow-hidden"
                    style={{
                      animation: "borderBeam 8s ease-in-out infinite",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 backdrop-blur-sm"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap backdrop-blur-sm">
                  Join Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>

      {/* Feature Sections with subtle gradient backgrounds */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 pointer-events-none" />

        <div className="relative">
          {/* Feature sections remain the same but with added visual separators */}
          <div
            id="instant-summaries"
            className="border-t border-gray-800/50 backdrop-blur-sm"
          >
            <FeatureSection
              icon={faWandMagicSparkles}
              title="AI Book Summaries: Your Content, Captured Instantly"
              description="Get clear, concise summaries of every book you consume. Includes imagery, key learnings, quotes, and detailed notes, all generated by AI to save you time and effort."
            />
          </div>

          <div id="knowledge-vault" className="border-t border-gray-800">
            <FeatureSection
              icon={faBookOpen}
              title="Your Knowledge Vault: A Home for All Your Book Summaries"
              description="Never lose track of what you've read again. Store all your book summaries, key takeaways, quotes and notes in a sleek Vault. Keep your learning journey all in one place."
              isReversed
            />
          </div>

          <div id="ask-vault" className="border-t border-gray-800">
            <FeatureSection
              icon={faLightbulb}
              title="Ask Your Vault: Connect Ideas Across Your Content"
              description="Use AI-powered chat to ask questions and uncover insights hidden across your content. Connect themes, ideas, and concepts across all the books you've consumed, like having a smart personal assistant for your knowledge."
            />
          </div>

          <div id="dynamic-search" className="border-t border-gray-800">
            <FeatureSection
              icon={faSearch}
              title="Dynamic Search & Smart Filters: Find What Matters Fast"
              description="Effortlessly navigate your Vault with powerful search and filters. Whether you're looking for detailed notes, key quotes that resonate, or the most impactful takeaways, find exactly what you need — fast."
              isReversed
            />
          </div>

          <div id="personalized-home" className="border-t border-gray-800">
            <FeatureSection
              icon={faHome}
              title="A Personalized Home for Your Knowledge"
              description="Make Knowledge Vault your own with a fully customizable UI. Choose layouts, preferences, and themes that suit your style, so you feel at home."
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
              Join thousands of learners who are capturing and connecting their
              knowledge more effectively.
            </p>
            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-2 w-full max-w-md relative mb-8">
                <div className="relative flex w-full gap-2">
                  <div className="relative flex-1">
                    {/* Glowing border beam effect */}
                    <div
                      className="absolute h-[2px] w-[200px] top-0 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 overflow-hidden"
                      style={{
                        animation: "borderBeam 8s ease-in-out infinite",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 backdrop-blur-sm"
                    />
                  </div>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap backdrop-blur-sm">
                    Join Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
