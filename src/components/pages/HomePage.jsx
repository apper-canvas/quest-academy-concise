import React from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import HomeWorldSelection from '@/components/organisms/HomeWorldSelection';
import MainFeature from '@/components/organisms/MainFeature';

export default function HomePage() {
  const worlds = [
    {
      id: 'math',
      title: 'Math Castle',
      description: 'Solve puzzles and conquer numbers in the magical Math Castle!',
      icon: 'Calculator',
      color: 'from-primary to-pink-500',
      path: '/math'
    },
    {
      id: 'reading',
      title: 'Reading Forest',
      description: 'Discover stories and words in the enchanted Reading Forest!',
      icon: 'BookOpen',
      color: 'from-secondary to-green-500',
      path: '/reading'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <HeroSection
          title="Welcome to Quest Academy!"
          description="Choose your adventure and start learning! Complete lessons, earn rewards, and become the ultimate learning champion."
          icon="Sparkles"
          iconColor="text-primary"
        />

        <HomeWorldSelection worlds={worlds} />

        <MainFeature />
      </div>
    </div>
  );
}