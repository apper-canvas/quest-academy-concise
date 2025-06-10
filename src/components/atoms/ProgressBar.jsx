import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
      />
    </div>
  );
};

export default ProgressBar;