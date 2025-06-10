import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { rewardService, progressService } from '../services';

export default function MyRewards() {
  const [rewards, setRewards] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rewardsData, progressData] = await Promise.all([
          rewardService.getAll(),
          progressService.getAll()
        ]);
        setRewards(rewardsData);
        setProgress(progressData[0] || {
          mathLevel: 0,
          readingLevel: 0,
          totalScore: 0,
          streakDays: 0,
          lessonsCompleted: 0
        });
      } catch (err) {
        setError(err.message || 'Failed to load rewards');
        toast.error('Failed to load rewards data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getBadgeColor = (type) => {
    switch (type) {
      case 'badge': return 'from-accent to-yellow-500';
      case 'achievement': return 'from-primary to-pink-500';
      case 'milestone': return 'from-secondary to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10 p-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-500 rounded-2xl flex items-center justify-center"
            >
              <ApperIcon name="Trophy" size={32} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-heading text-gray-800">My Rewards</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Look at all the amazing badges and achievements you've earned on your learning journey!
          </p>
        </motion.div>

        {/* Progress Stats */}
        {progress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-primary mb-1">{progress.lessonsCompleted}</div>
              <div className="text-sm text-gray-600">Lessons</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-secondary mb-1">{progress.totalScore}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-accent mb-1">{progress.mathLevel}</div>
              <div className="text-sm text-gray-600">Math Level</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-info mb-1">{progress.readingLevel}</div>
              <div className="text-sm text-gray-600">Reading Level</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-success mb-1">{progress.streakDays}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </motion.div>
        )}

        {/* Rewards Grid */}
        {rewards.length === 0 ? (
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Start Learning
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-3d hover:shadow-hover transition-all duration-300"
              >
                {/* Badge Header */}
                <div className={`bg-gradient-to-r ${getBadgeColor(reward.type)} p-4 text-white text-center`}>
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}