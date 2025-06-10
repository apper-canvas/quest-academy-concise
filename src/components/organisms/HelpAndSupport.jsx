import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/molecules/Card';
import ActionTile from '@/components/molecules/ActionTile';

const HelpAndSupport = ({ initialDelay = 0 }) => {
  const handleHowToPlay = () => console.log('How to Play clicked'); // Placeholder
  const handleContactUs = () => console.log('Contact Us clicked'); // Placeholder
  const handleRateApp = () => console.log('Rate App clicked'); // Placeholder

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: initialDelay }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-r from-accent to-warning p-4">
        <h2 className="text-xl font-heading text-white">Help & Support</h2>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <ActionTile
            onClick={handleHowToPlay}
            icon="HelpCircle"
            iconColor="text-info"
            label="How to Play"
            direction="column"
          />
          
          <ActionTile
            onClick={handleContactUs}
            icon="MessageCircle"
            iconColor="text-success"
            label="Contact Us"
            direction="column"
          />
          
          <ActionTile
            onClick={handleRateApp}
            icon="Star"
            iconColor="text-warning"
            label="Rate App"
            direction="column"
          />
        </div>
      </div>
    </Card>
  );
};

export default HelpAndSupport;