import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Firefly from "../components/Firefly";
import ContactBG from "../assets/background/contact-background.png";
import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  document.title = "Thadthon | Contact";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#1a1b26] overflow-hidden">
      {/* Background Container */}
      <div
        className="
          absolute inset-0
          bg-cover bg-no-repeat
          before:content-['']
          before:absolute
          before:inset-0
          before:bg-gradient-to-b
          before:from-[#1a1b26]/30
          before:to-[#1a1b26]/70
          before:pointer-events-none
        "
        style={{
          backgroundImage: `url(${ContactBG})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          transform: "scale(1.1)",
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* Radial Gradient Overlay */}
        <div
          className="
            absolute inset-0
            opacity-80
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(26,27,38,0.2) 0%, rgba(26,27,38,0.6) 100%)",
          }}
        />
      </div>

      {/* Optional Blur for Mobile */}
      <div
        className="
          absolute inset-0
          backdrop-blur-[1px]
          sm:backdrop-blur-none
          pointer-events-none
        "
      />

      <Firefly />

      {/* Main Content Container */}
      <div className="relative w-full h-full overflow-auto">
        <motion.div
          className="
            min-h-screen
            flex flex-col
            items-center
            justify-center
            px-4 sm:px-6 lg:px-8
            py-16 sm:py-20 lg:py-24
          "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div
            className="
              max-w-3xl w-full
              text-center space-y-6 mb-12
              px-4 sm:px-6 lg:px-8
            "
            variants={itemVariants}
          >
            <h1
              className="
              text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              font-bold text-yellow-300
              mb-6
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
            "
            >
              Get In Touch
            </h1>
            <p
              className="
              text-gray-300
              text-sm md:text-base lg:text-lg xl:text-xl
              max-w-2xl mx-auto
              leading-relaxed
              drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
            "
            >
              Feel free to reach out with any questions, project ideas, or to
              simply connect. Use the form below to send a message, and I'll
              respond as soon as possible.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="w-full max-w-xl mx-auto px-4"
            variants={itemVariants}
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
