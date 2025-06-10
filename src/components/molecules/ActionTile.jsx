import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ActionTile = ({ icon, label, onClick, iconColor, direction = 'row' }) => {
  const className = direction === 'row'
    ? "flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
    : "flex flex-col items-center space-y-2 p-4 border-2 border-gray-200 rounded-lg hover:border-info/50 hover:bg-info/5 transition-all";

  return (
    <Button
      onClick={onClick}
      whileHover={{ scale: 1.02 }} // default to row-like hover
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <ApperIcon name={icon} size={direction === 'row' ? 20 : 24} className={iconColor} />
      <span className="font-medium text-gray-700">{label}</span>
    </Button>
  );
};

export default ActionTile;