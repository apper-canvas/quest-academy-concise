import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { lessonService } from '../services';

export default function MathWorld() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const allLessons = await lessonService.getAll();
        const mathLessons = allLessons.filter(lesson => lesson.subject === 'math');
        setLessons(mathLessons);
      } catch (err) {
        setError(err.message || 'Failed to load lessons');
        toast.error('Failed to load Math lessons');
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'from-green-400 to-green-600';
      case 2: return 'from-yellow-400 to-orange-500';
      case 3: return 'from-orange-500 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-primary/20 via-white to-pink-100 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
      <div className="min-h-full bg-gradient-to-br from-primary/20 via-white to-pink-100 p-6">
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

  if (lessons.length === 0) {
    return (
      <div className="min-h-full bg-gradient-to-br from-primary/20 via-white to-pink-100 p-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Calculator" className="w-24 h-24 text-gray-300 mx-auto" />
            </motion.div>
            <h3 className="mt-6 text-2xl font-heading text-gray-800">No Math lessons yet</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              New lessons are being prepared for you! Check back soon for exciting math adventures.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/20 via-white to-pink-100">
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
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-2xl flex items-center justify-center"
            >
              <ApperIcon name="Calculator" size={32} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-heading text-gray-800">Math Castle</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the magical Math Castle! Choose a lesson to start your mathematical adventure.
          </p>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-3d cursor-pointer group hover:shadow-hover transition-all duration-300"
            >
              {/* Difficulty Badge */}
              <div className={`bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)} px-4 py-2 text-white text-sm font-medium`}>
                {getDifficultyLabel(lesson.difficulty)} • {lesson.type}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {lesson.description}
                </p>

                {/* Progress */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {lesson.completed ? (
                      <>
                        <ApperIcon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm text-success font-medium">Completed</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Play" size={16} className="text-primary" />
                        <span className="text-sm text-primary font-medium">Start</span>
                      </>
                    )}
                  </div>
                  {lesson.score && (
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Star" size={16} className="text-accent fill-current" />
                      <span className="text-sm font-medium text-gray-700">{lesson.score}%</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}