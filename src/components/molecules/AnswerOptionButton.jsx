import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const AnswerOptionButton = ({ option, selected, showFeedback, isCorrectAnswer, onClick, disabled }) => {
  const baseClasses = "p-4 rounded-xl border-2 text-left transition-all duration-300";
  const circleBaseClasses = "w-6 h-6 rounded-full border-2 flex items-center justify-center";

  const getButtonClasses = () => {
    if (selected) {
      if (showFeedback) {
        return isCorrectAnswer ? 'border-success bg-success/10 text-success' : 'border-error bg-error/10 text-error';
      }
      return 'border-primary bg-primary/10 text-primary';
    }
    if (showFeedback && isCorrectAnswer) {
      return 'border-success bg-success/10 text-success';
    }
    return 'border-gray-200 hover:border-primary/50 hover:bg-primary/5';
  };

  const getCircleClasses = () => {
    if (selected) {
      if (showFeedback) {
        return isCorrectAnswer ? 'border-success bg-success' : 'border-error bg-error';
      }
      return 'border-primary bg-primary';
    }
    if (showFeedback && isCorrectAnswer) {
      return 'border-success bg-success';
    }
    return 'border-gray-300';
  };

  const showIcon = (selected && showFeedback) || (showFeedback && isCorrectAnswer);
  const iconName = ((selected && isCorrectAnswer) || isCorrectAnswer) ? "Check" : "X";

  return (
    <Button
      onClick={() => onClick(option)}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${getButtonClasses()}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`${circleBaseClasses} ${getCircleClasses()}`}>
          {showIcon && (
            <ApperIcon name={iconName} size={12} className="text-white" />
          )}
        </div>
        <span className="font-medium">{option}</span>
      </div>
    </Button>
  );
};

export default AnswerOptionButton;