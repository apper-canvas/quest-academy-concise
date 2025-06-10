import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const LessonProgressIndicator = ({ completed, score }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {completed ? (
          <>
            <ApperIcon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Completed</span>
          </>
        ) : (
          <>
            <ApperIcon name="Play" size={16} className="text-secondary" />
            <span className="text-sm text-secondary font-medium">Start</span>
          </>
        )}
      </div>
      {score !== undefined && (
        <div className="flex items-center space-x-1">
          <ApperIcon name="Star" size={16} className="text-accent fill-current" />
          <span className="text-sm font-medium text-gray-700">{score}%</span>
        </div>
      )}
    </div>
  );
};

export default LessonProgressIndicator;