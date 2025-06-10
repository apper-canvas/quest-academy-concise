import React from 'react';
import { motion } from 'framer-motion';
import ProgressStatCard from '@/components/molecules/ProgressStatCard';

const OverallProgressStats = ({ progress, initialDelay = 0 }) => {
  if (!progress) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: initialDelay }}
      className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
    >
      <ProgressStatCard
        value={progress.lessonsCompleted}
        label="Lessons"
        colorClass="bg-white shadow-lg"
        valueClassName="text-primary"
      />
      <ProgressStatCard
        value={progress.totalScore}
        label="Total Score"
        colorClass="bg-white shadow-lg"
        valueClassName="text-secondary"
      />
      <ProgressStatCard
        value={progress.mathLevel}
        label="Math Level"
        colorClass="bg-white shadow-lg"
        valueClassName="text-accent"
      />
      <ProgressStatCard
        value={progress.readingLevel}
        label="Reading Level"
        colorClass="bg-white shadow-lg"
        valueClassName="text-info"
      />
      <ProgressStatCard
        value={progress.streakDays}
        label="Day Streak"
        colorClass="bg-white shadow-lg"
        valueClassName="text-success"
      />
    </motion.div>
  );
};

export default OverallProgressStats;