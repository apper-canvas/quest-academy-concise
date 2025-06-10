import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/molecules/Card';
import SettingsToggle from '@/components/molecules/SettingsToggle';

const SettingsCategory = ({ title, options, onToggle, initialDelay = 0 }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: initialDelay }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <h2 className="text-xl font-heading text-white">{title}</h2>
      </div>
      <div className="p-6 space-y-6">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SettingsToggle option={option} onToggle={onToggle} />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default SettingsCategory;