import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SettingsToggle = ({ option, onToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <ApperIcon name={option.icon} size={20} className="text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{option.title}</h3>
          <p className="text-gray-600 text-sm">{option.description}</p>
        </div>
      </div>
      <Button
        onClick={() => onToggle(option.id)}
        whileTap={{ scale: 0.95 }}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
          option.enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <motion.div
          animate={{ x: option.enabled ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
        />
      </Button>
    </div>
  );
};

export default SettingsToggle;