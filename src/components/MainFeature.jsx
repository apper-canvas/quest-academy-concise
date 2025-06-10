import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from './ApperIcon';
import { progressService, rewardService } from '../services';

export default function MainFeature() {
  const [progress, setProgress] = useState(null);
  const [recentRewards, setRecentRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [progressData, rewardsData] = await Promise.all([
          progressService.getAll(),
          rewardService.getAll()
        ]);
        
        setProgress(progressData[0] || {
          mathLevel: 0,
          readingLevel: 0,
          totalScore: 0,
          streakDays: 0,
          lessonsCompleted: 0
        });
        
        // Get 3 most recent rewards
        const recent = rewardsData
          .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
          .slice(0, 3);
        setRecentRewards(recent);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-3d p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-3d overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
        <h2 className="text-2xl font-heading mb-2">Your Learning Journey</h2>
        <p className="text-white/90">Track your progress and see how far you've come!</p>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 bg-primary/5 rounded-xl"
          >
            <div className="text-2xl font-bold text-primary mb-1">{progress?.lessonsCompleted || 0}</div>
            <div className="text-sm text-gray-600">Lessons</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 bg-secondary/5 rounded-xl"
          >
            <div className="text-2xl font-bold text-secondary mb-1">{progress?.mathLevel || 0}</div>
            <div className="text-sm text-gray-600">Math Level</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 bg-accent/5 rounded-xl"
          >
            <div className="text-2xl font-bold text-accent mb-1">{progress?.readingLevel || 0}</div>
            <div className="text-sm text-gray-600">Reading Level</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 bg-success/5 rounded-xl"
          >
            <div className="text-2xl font-bold text-success mb-1">{progress?.streakDays || 0}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 bg-info/5 rounded-xl"
          >
            <div className="text-2xl font-bold text-info mb-1">{progress?.totalScore || 0}</div>
            <div className="text-sm text-gray-600">Total Score</div>
          </motion.div>
        </div>

        {/* Recent Rewards */}
        {recentRewards.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {recentRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 flex items-center space-x-2 bg-gradient-to-r from-accent to-yellow-500 text-white px-3 py-2 rounded-full text-sm"
                >
                  <ApperIcon name={reward.icon} size={16} />
                  <span className="font-medium">{reward.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/math')}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary to-pink-500 text-white rounded-xl shadow-lg hover:shadow-hover transition-all"
          >
            <ApperIcon name="Calculator" size={24} />
            <div className="text-left">
              <div className="font-semibold">Continue Math</div>
              <div className="text-white/80 text-sm">Practice numbers and counting</div>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/reading')}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-secondary to-green-500 text-white rounded-xl shadow-lg hover:shadow-hover transition-all"
          >
            <ApperIcon name="BookOpen" size={24} />
            <div className="text-left">
              <div className="font-semibold">Continue Reading</div>
              <div className="text-white/80 text-sm">Discover new words and stories</div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}