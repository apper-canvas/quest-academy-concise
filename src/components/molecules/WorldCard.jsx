import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const WorldCard = ({ world, index, onClick }) => {
  return (
    <motion.div
      key={world.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl shadow-3d cursor-pointer group"
    >
      <div className={`bg-gradient-to-br ${world.color} p-8 text-white relative`}>
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
          <ApperIcon name={world.icon} size={80} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ApperIcon name={world.icon} size={24} />
            </div>
            <h2 className="text-2xl font-heading">{world.title}</h2>
          </div>
          <p className="text-white/90 mb-6">{world.description}</p>
          <div className="flex items-center space-x-2 text-white/80">
            <span className="font-medium">Start Adventure</span>
            <ApperIcon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldCard;