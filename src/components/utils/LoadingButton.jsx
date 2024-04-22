/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const LoadingButton = ({ isLoading, onClick, children }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={isLoading}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
    >
      {isLoading ? "Loading..." : children}
    </motion.button>
  );
};

export default LoadingButton;
