import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/molecules/Card';
import ProfileInfo from '@/components/molecules/ProfileInfo';
import ActionTile from '@/components/molecules/ActionTile';

const ProfileManagement = ({ initialDelay = 0 }) => {
  const handleChangeAvatar = () => console.log('Change Avatar clicked'); // Placeholder
  const handleResetProgress = () => console.log('Reset Progress clicked'); // Placeholder

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: initialDelay }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-r from-secondary to-accent p-4">
        <h2 className="text-xl font-heading text-white">Profile</h2>
      </div>
      <div className="p-6 space-y-6">
        <ProfileInfo name="Learning Explorer" age="7" icon="User" />
        
        <div className="grid md:grid-cols-2 gap-4">
          <ActionTile
            onClick={handleChangeAvatar}
            icon="Palette"
            iconColor="text-primary"
            label="Change Avatar"
          />
          <ActionTile
            onClick={handleResetProgress}
            icon="RotateCcw"
            iconColor="text-secondary"
            label="Reset Progress"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfileManagement;