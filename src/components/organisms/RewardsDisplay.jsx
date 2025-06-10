import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import RewardBadge from '@/components/molecules/RewardBadge';

const RewardsDisplay = ({ rewards }) => {
  const navigate = useNavigate();

  const getBadgeColor = (type) => {
    switch (type) {
      case 'badge': return 'from-accent to-yellow-500';
      case 'achievement': return 'from-primary to-pink-500';
      case 'milestone': return 'from-secondary to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (rewards.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="Gift" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-6 text-2xl font-heading text-gray-800">No rewards yet</h3>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          Complete lessons and score well to earn your first badges and achievements!
        </p>
        <Button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Start Learning
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {rewards.map((reward, index) => (
        <RewardBadge
          key={reward.id}
          reward={reward}
          index={index}
          badgeColor={getBadgeColor(reward.type)}
        />
      ))}
    </div>
  );
};

export default RewardsDisplay;