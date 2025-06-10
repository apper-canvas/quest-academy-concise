import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import OverallProgressStats from '@/components/organisms/OverallProgressStats';
import RewardsDisplay from '@/components/organisms/RewardsDisplay';
import { rewardService, progressService } from '@/services';

export default function MyRewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rewardsData, progressData] = await Promise.all([
          rewardService.getAll(),
          progressService.getAll()
        ]);
        setRewards(rewardsData);
        setProgress(progressData[0] || {
          mathLevel: 0,
          readingLevel: 0,
          totalScore: 0,
          streakDays: 0,
          lessonsCompleted: 0
        });
      } catch (err) {
        setError(err.message || 'Failed to load rewards');
        toast.error('Failed to load rewards data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="My Rewards"
          description="Look at all the amazing badges and achievements you've earned on your learning journey!"
          icon="Trophy"
          iconBgColor="bg-gradient-to-br from-accent to-yellow-500"
          iconAnimation={{ rotate: [0, 10, -10, 0] }}
        />

        <OverallProgressStats progress={progress} initialDelay={0.2} />

        <RewardsDisplay rewards={rewards} />
      </div>
    </div>
  );
}