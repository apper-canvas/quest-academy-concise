import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const ProfileInfo = ({ name, age, icon }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
        <ApperIcon name={icon} size={24} className="text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">Age: {age} years old</p>
      </div>
    </div>
  );
};

export default ProfileInfo;