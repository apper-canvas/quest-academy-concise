import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const HeroSection = ({ title, description, icon, iconColor, iconAnimationDelay = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {icon && (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: iconAnimationDelay }}
          className="inline-block mb-4"
        >
          <ApperIcon name={icon} size={48} className={iconColor} />
        </motion.div>
      )}
      <h1 className="text-4xl md:text-5xl font-heading text-gray-800 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default HeroSection;