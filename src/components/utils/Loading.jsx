import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-progress"
        initial={{ width: 0 }}
        animate={{ width: "100%", transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } }}
      />
    </div>
  );
};

export default Loading;
