import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Button from '@/components/atoms/Button';

const LessonNavigationHeader = ({ lessonTitle, currentQuestionIndex, totalQuestions, progress, onExit }) => {
  return (
    <div className="bg-white shadow-sm border-b-2 border-primary/10">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              onClick={onExit}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={20} className="text-gray-600" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">{lessonTitle}</h1>
          </div>
          <div className="text-sm font-medium text-gray-600">
            {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
        
        <ProgressBar progress={progress} className="mt-4" />
      </div>
    </div>
  );
};

export default LessonNavigationHeader;