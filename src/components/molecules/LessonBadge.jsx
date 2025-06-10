import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const LessonBadge = ({ difficultyColor, icon, difficultyLabel, type }) => {
  return (
    <div className={`bg-gradient-to-r ${difficultyColor} px-4 py-2 text-white text-sm font-medium flex items-center space-x-2`}>
      {icon && <ApperIcon name={icon} size={16} />}
      <span>{difficultyLabel} • {type}</span>
    </div>
  );
};

export default LessonBadge;