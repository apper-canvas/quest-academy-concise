import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/molecules/PageHeader';
import LessonGrid from '@/components/organisms/LessonGrid';
import { lessonService } from '@/services';

export default function ReadingLandPage() {
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
        const readingLessons = allLessons.filter(lesson => lesson.subject === 'reading');
        setLessons(readingLessons);
      } catch (err) {
        setError(err.message || 'Failed to load lessons');
        toast.error('Failed to load Reading lessons');
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, []);

  const getLessonIcon = (type) => {
    switch (type) {
      case 'phonics': return 'Volume2';
      case 'sight-words': return 'Eye';
      case 'comprehension': return 'Brain';
      default: return 'BookOpen';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'from-green-400 to-emerald-500';
      case 2: return 'from-blue-400 to-cyan-500';
      case 3: return 'from-purple-400 to-indigo-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-secondary/20 via-white to-green-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Reading Forest"
          description="Welcome to the enchanted Reading Forest! Discover stories, learn new words, and become a reading champion."
          icon="BookOpen"
          iconBgColor="bg-gradient-to-br from-secondary to-green-500"
          iconAnimation={{ rotate: [0, 5, -5, 0] }}
        />

        <LessonGrid
          lessons={lessons}
          loading={loading}
          error={error}
          getDifficultyColor={getDifficultyColor}
          getLessonIcon={getLessonIcon}
          getDifficultyLabel={getDifficultyLabel}
          navigate={navigate}
          subject="reading"
        />
      </div>
    </div>
  );
}