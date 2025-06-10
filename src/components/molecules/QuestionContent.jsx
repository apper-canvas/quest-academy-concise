import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const QuestionContent = ({ questionText, image }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-heading text-gray-800 mb-4">
        {questionText}
      </h2>
      {image && (
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
            <ApperIcon name={image} size={64} className="text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContent;