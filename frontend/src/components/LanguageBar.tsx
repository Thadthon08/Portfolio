// LanguageBar.tsx
import { motion } from "framer-motion";

const LanguageBar = ({ language, percentage, index, variants }: any) => (
  <motion.div variants={variants} className="space-y-1 sm:space-y-2">
    <div className="flex justify-between text-gray-300">
      <span className="text-sm sm:text-base font-medium">{language}</span>
      <span className="text-sm sm:text-base">{percentage}%</span>
    </div>
    <div className="h-2 sm:h-3 bg-gray-700/30 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: index * 0.1 }}
        className="h-full bg-yellow-400/80 rounded-full"
      />
    </div>
  </motion.div>
);

export default LanguageBar;
