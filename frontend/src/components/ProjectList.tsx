import CatVoice from "../assets/project/catvoice.png";
import SUTAttendance from "../assets/project/sutattendance.png";
import SoftwareKey from "../assets/project/softwarekey.png";
import MachineVision from "../assets/project/machine_vision.png";
import Card from "./Card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projectList = [
  {
    id: 1,
    title: "SUT Online Attendance System",
    image: SUTAttendance,
    link: "https://sut-online-attendance-system-v1.vercel.app/",
    description:
      "An online attendance system enabling students to check in via QR code and teachers to monitor attendance through a web interface.",
  },
  {
    id: 2,
    title: "Key Software Online",
    image: SoftwareKey,
    link: "#",
    description:
      "A website for selling software keys, developed as a project in the Software Engineering course.",
  },
  {
    id: 3,
    title: "Cat's Voice",
    image: CatVoice,
    link: "https://cat-s-voice-i9uz.vercel.app/",
    description:
      "A project focused on finding homes for cats and dogs, developed as part of the Advanced Web Application course. This website was cloned from The Voice Foundation's site for educational purposes.",
  },
  {
    id: 4,
    title: "Bell Pepper Sorting Machine Vision",
    image: MachineVision,
    link: "https://www.youtube.com/watch?v=C9ESb0XkbXk",
    description:
      "The Bell Pepper Sorting Machine Vision project focuses on using machine vision techniques to detect and categorize various types of bell peppers. This involves identifying specific characteristics required for sorting.",
  },
];

function ProjectList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-3/4 mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-yellow-500 mb-8"
      >
        My Projects
      </motion.h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projectList.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="group p-6 h-full hover:shadow-xl transition-shadow duration-300">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <motion.h3
                      className="text-xl font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <ExternalLink className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-gray-300 line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                </div>
              </a>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProjectList;
