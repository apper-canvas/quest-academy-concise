import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/molecules/PageHeader';
import LessonGrid from '@/components/organisms/LessonGrid';
import { lessonService } from '@/services';

export default function MathWorldPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const allLessons = await lessonService.getAll();
        const mathLessons = allLessons.filter(lesson => lesson.subject === 'math');
        setLessons(mathLessons);
      } catch (err) {
        setError(err.message || 'Failed to load lessons');
        toast.error('Failed to load Math lessons');
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'from-green-400 to-green-600';
      case 2: return 'from-yellow-400 to-orange-500';
      case 3: return 'from-orange-500 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/20 via-white to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Math Castle"
          description="Welcome to the magical Math Castle! Choose a lesson to start your mathematical adventure."
          icon="Calculator"
          iconBgColor="bg-gradient-to-br from-primary to-pink-500"
          iconAnimation={{ rotate: [0, 5, -5, 0] }}
        />

        <LessonGrid
          lessons={lessons}
          loading={loading}
          error={error}
          getDifficultyColor={getDifficultyColor}
          getDifficultyLabel={getDifficultyLabel}
          navigate={navigate}
          subject="math"
        />
      </div>
    </div>
  );
}