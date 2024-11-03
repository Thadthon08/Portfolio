// StatsItem.tsx
import { motion } from "framer-motion";

const StatsItem = ({ label, value, variants }: any) => (
  <motion.div
    variants={variants}
    className="flex justify-between items-center p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-700/30"
  >
    <span className="text-gray-300 text-sm sm:text-base lg:text-lg">
      {label}:
    </span>
    <span className="text-yellow-300 font-bold text-base sm:text-lg lg:text-xl">
      {value}
    </span>
  </motion.div>
);

export default StatsItem;
