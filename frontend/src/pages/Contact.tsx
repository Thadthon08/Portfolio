import React from "react";
import { motion } from "framer-motion";
import Firefly from "../components/Firefly";
import ContactBG from "../assets/background/contact-background.png";
import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
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
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#1a1b26] overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
              rgba(26, 27, 38, 0.2) 0%,
              rgba(26, 27, 38, 0.6) 100%
            ),
            url(${ContactBG})
        `,
          filter: "brightness(0.85)",
        }}
      />
      <Firefly />

      <motion.div
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-3xl w-full text-center space-y-6 mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-300 mb-6">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Feel free to reach out with any questions, project ideas, or to
            simply connect. Use the form below to send a message, and I'll
            respond as soon as possible.
          </p>
        </motion.div>

        <ContactForm />
      </motion.div>
    </div>
  );
};

export default Contact;
