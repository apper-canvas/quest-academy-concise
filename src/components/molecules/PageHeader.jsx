import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PageHeader = ({ title, description, icon, iconBgColor, iconAnimation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        {icon && (
          <motion.div
            animate={iconAnimation || { rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className={`w-16 h-16 ${iconBgColor || 'bg-gradient-to-br from-gray-600 to-gray-800'} rounded-2xl flex items-center justify-center`}
          >
            <ApperIcon name={icon} size={32} className="text-white" />
          </motion.div>
        )}
        <h1 className="text-4xl md:text-5xl font-heading text-gray-800">{title}</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default PageHeader;