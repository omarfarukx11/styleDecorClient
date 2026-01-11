import React from "react"; // Removed useState/useEffect as whileInView handles timing
import { motion } from "framer-motion";
import { FaPaintBrush, FaLayerGroup, FaMagic, FaCouch } from "react-icons/fa";

const FeatureBanner = () => {
  // Variant for the parent to stagger the children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.1 
      },
    },
  };

  const slideUpVariants = {
    hidden: { y: 60, opacity: 0 }, 
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const imageSlideInVariants = {
    hidden: { x: 80, opacity: 0, scale: 0.95 }, 
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 } 
    },
  };

  const features = [
    {
      icon: <FaPaintBrush />,
      title: "Theme & Vision Builder",
      desc: "Create stunning event concepts with a drag-and-drop builder. Choose themes, add elements, and match your brand identity.",
    },
    {
      icon: <FaLayerGroup />,
      title: "Layout & Space Planner",
      desc: "Design floor plans with ease. Add seating charts, stage placements, and decor zones for a perfect event flow.",
    },
    {
      icon: <FaMagic />,
      title: "Vibe & Lighting System",
      desc: "Enhance atmosphere with fully customizable lighting plans. Add mood boards, color palettes, and advanced styling options.",
    },
    {
      icon: <FaCouch />,
      title: "Furniture & Decor Library",
      desc: "Maintain aesthetic consistency with a centralized system for props and furniture. Apply changes globally for a cohesive look.",
    },
  ];

  return (
    <section className="bg-secondary text-base-200 py-24 px-6 lg:px-20 overflow-hidden">
      {/* initial="hidden" sets the starting state.
          whileInView="visible" triggers animation when scrolled into view.
          viewport={{ once: true, amount: 0.2 }} ensures it only happens once 
          and triggers when 20% of the section is visible.
      */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-[1980px] mx-auto"
      >
        
        {/* TOP HEADER SECTION */}
        <div className="text-center mb-20 space-y-6">
          <motion.span 
            variants={slideUpVariants}
            className="inline-block px-6 py-1 rounded-full text-sm font-medium uppercase tracking-widest"
          >
            Tailored Decoration Features
          </motion.span>
          
          <motion.h2 
            variants={slideUpVariants}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Craft Your Dream Event with Ease <br /> 
            Professional Decorator Tools
          </motion.h2>
          
          <motion.p 
            variants={slideUpVariants}
            className="text-xl text-base-200/50 max-w-3xl mx-auto"
          >
            Discover StyleDecor's powerful design tools. Build, visualize, and harmonize every detail—like a design expert—without needing technical skills.
          </motion.p>
        </div>

        {/* BOTTOM GRID SECTION */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Features List */}
          <div className="lg:col-span-5 space-y-12">
            {features.map((item, index) => (
              <motion.div 
                key={index}
                variants={slideUpVariants}
                className="flex gap-6 group"
              >
                <div className="shrink-0 w-12 h-12 bg-info rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight italic">
                    {item.title}
                  </h3>
                  <p className="text-base-200/60 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Visual Mockup Area */}
          <motion.div 
            variants={imageSlideInVariants}
            className="lg:col-span-7 relative"
          >
            <div className="bg-white p-4 rounded-xl border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop" 
                alt="Decor Dashboard" 
                className="rounded-xl w-full h-auto"
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default FeatureBanner;