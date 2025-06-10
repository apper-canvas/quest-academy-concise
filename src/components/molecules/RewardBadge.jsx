import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';

const RewardBadge = ({ reward, index, badgeColor }) => {
  return (
    <Card
      key={reward.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="overflow-hidden shadow-3d hover:shadow-hover transition-all duration-300"
    >
      {/* Badge Header */}
      <div className={`bg-gradient-to-r ${badgeColor} p-4 text-white text-center`}>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2"
        >
          <ApperIcon name={reward.icon} size={32} />
        </motion.div>
        <h3 className="font-heading text-lg">{reward.name}</h3>
        <p className="text-white/80 text-sm capitalize">{reward.type}</p>
      </div>

      {/* Badge Details */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Earned</span>
          <span>{new Date(reward.unlockedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default RewardBadge;