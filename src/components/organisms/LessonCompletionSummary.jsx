import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';

const LessonCompletionSummary = ({ finalScore, correctCount, totalQuestions, onRestart, onExit }) => {
  const isGreatScore = finalScore >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10 flex items-center justify-center p-6">
      <Card
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-8 shadow-3d text-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ApperIcon
            name={isGreatScore ? "Trophy" : "Target"}
            size={64}
            className={`mx-auto mb-6 ${isGreatScore ? 'text-accent' : 'text-primary'}`}
          />
        </motion.div>

        <h2 className="text-3xl font-heading text-gray-800 mb-4">
          {isGreatScore ? 'Excellent Work!' : 'Good Effort!'}
        </h2>

        <div className="mb-6">
          <div className="text-4xl font-bold text-primary mb-2">{finalScore}%</div>
          <p className="text-gray-600">
            You got {correctCount} out of {totalQuestions} questions correct!
          </p>
        </div>

        {isGreatScore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-accent/10 rounded-lg p-4 mb-6"
          >
            <ApperIcon name="Star" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">You earned a new badge!</p>
          </motion.div>
        )}

        <div className="flex space-x-3">
          <Button
            onClick={onRestart}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Try Again
          </Button>
          <Button
            onClick={onExit}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LessonCompletionSummary;