import React from 'react';
import { motion } from 'framer-motion';

const ProgressStatCard = ({ value, label, colorClass }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`text-center p-4 rounded-xl ${colorClass}`}
    >
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
};

export default ProgressStatCard;