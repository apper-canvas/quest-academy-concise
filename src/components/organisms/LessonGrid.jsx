import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';
import LessonBadge from '@/components/molecules/LessonBadge';
import LessonProgressIndicator from '@/components/molecules/LessonProgressIndicator';
import Button from '@/components/atoms/Button';

const LessonCard = ({ lesson, index, getDifficultyColor, getLessonIcon, getDifficultyLabel, navigate }) => (
  <Card
    key={lesson.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate(`/lesson/${lesson.id}`)}
    className="shadow-3d cursor-pointer group hover:shadow-hover transition-all duration-300"
  >
    <LessonBadge
      difficultyColor={getDifficultyColor(lesson.difficulty)}
      icon={getLessonIcon ? getLessonIcon(lesson.type) : null}
      difficultyLabel={getDifficultyLabel(lesson.difficulty)}
      type={lesson.type}
    />

    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-secondary transition-colors">
        {lesson.title}
      </h3>
      <p className="text-gray-600 mb-4 text-sm">
        {lesson.description}
      </p>

      <LessonProgressIndicator
        completed={lesson.completed}
        score={lesson.score}
      />
    </div>
  </Card>
);


const LessonGrid = ({ lessons, loading, error, getDifficultyColor, getLessonIcon, getDifficultyLabel, navigate, subject }) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center"
      >
        <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Try Again
        </Button>
      </Card>
    );
  }

  if (lessons.length === 0) {
    const iconName = subject === 'math' ? 'Calculator' : 'BookOpen';
    const noLessonsText = subject === 'math' ? 'No Math lessons yet' : 'No Reading lessons yet';
    const noLessonsDescription = subject === 'math'
      ? 'New lessons are being prepared for you! Check back soon for exciting math adventures.'
      : 'New stories and reading adventures are being prepared! Check back soon for magical reading journeys.';

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
          <ApperIcon name={iconName} className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-6 text-2xl font-heading text-gray-800">{noLessonsText}</h3>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          {noLessonsDescription}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson, index) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          index={index}
          getDifficultyColor={getDifficultyColor}
          getLessonIcon={getLessonIcon}
          getDifficultyLabel={getDifficultyLabel}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

export default LessonGrid;