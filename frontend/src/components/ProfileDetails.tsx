import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "./Card";
import StatsItem from "./StatsItem";
import LanguageBar from "./LanguageBar";
import LoadingIndicator from "./LoadingIndicator";
import { fetchGitHubData } from "../api/githubApi";

interface LanguageUsage {
  [language: string]: number;
}

const ProfileDetails: React.FC = () => {
  const { ref: detailsRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [githubStats, setGithubStats] = useState<any>(null);
  const [languages, setLanguages] = useState<LanguageUsage | null>(null);

  useEffect(() => {
    const username = "Thadthon08";
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    fetchGitHubData(username, token)
      .then(({ githubStats, languages }) => {
        setGithubStats(githubStats);
        setLanguages(languages);
      })
      .catch((error) => console.error(error));
  }, []);

  const getLanguagePercentages = () => {
    if (!languages) return [];
    const totalBytes = Object.values(languages).reduce(
      (acc, bytes) => acc + bytes,
      0
    );
    return Object.entries(languages)
      .map(([language, bytes]) => ({
        language,
        percentage: ((bytes / totalBytes) * 100).toFixed(2),
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-4/5 mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
      <motion.div
        ref={detailsRef}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
      >
        <motion.div
          variants={itemVariants}
          exit="exit"
          className="lg:col-span-2"
        >
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-800/50 backdrop-blur">
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4 lg:mb-6"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed"
            >
              Hello, my name is Thadthon Sangkhachon, you can call me Thuch.
              I am a computer engineering student at Suranaree University of
              Technology. Currently holding a GPA of 3.61. I have skills in
              creating responsive user interfaces using HTML, CSS, and
              JavaScript, as well as integrating APIs to enhance functionality.
              My project experience includes developing a student attendance
              system and an online software key sales website, which were part
              of my SE coursework. I am passionate about creating efficient and
              innovative solutions. In my free time, I enjoy coding and
              expanding my knowledge through online learning.
            </motion.p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} exit="exit">
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-800/50 backdrop-blur h-full">
            <motion.h3
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 lg:mb-8"
            >
              GitHub Stats
            </motion.h3>
            {githubStats ? (
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <StatsItem
                  label="Total Stars Earned"
                  value={githubStats.totalStars}
                  variants={itemVariants}
                />
                <StatsItem
                  label="Public Repos"
                  value={githubStats.publicRepos}
                  variants={itemVariants}
                />
                <StatsItem
                  label="Followers"
                  value={githubStats.followers}
                  variants={itemVariants}
                />
                <StatsItem
                  label="Following"
                  value={githubStats.following}
                  variants={itemVariants}
                />
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} exit="exit">
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-800/50 backdrop-blur h-full">
            <motion.h3
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 lg:mb-8"
            >
              Most Used Languages
            </motion.h3>
            {languages ? (
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {getLanguagePercentages().map((lang, index) => (
                  <LanguageBar
                    key={lang.language}
                    language={lang.language}
                    percentage={lang.percentage}
                    index={index}
                    variants={itemVariants}
                  />
                ))}
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          exit="exit"
          className="lg:col-span-2"
        >
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-800/50 backdrop-blur">
            <img
              className="w-full h-auto"
              src={`https://skillicons.dev/icons?i=bootstrap,css,docker,figma,git,github,html,js,ts,kubernetes,linux,mongodb,mysql,netlify,nodejs,npm,postgres,react,replit,tailwind,vercel,vite,vscode,sqlite,c,go,java,materialui,postman,py`}
              alt="CodeBucks"
              loading="lazy"
            />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
