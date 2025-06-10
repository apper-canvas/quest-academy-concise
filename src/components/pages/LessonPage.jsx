import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import LessonNavigationHeader from '@/components/organisms/LessonNavigationHeader';
import LessonQuizMain from '@/components/organisms/LessonQuizMain';
import LessonCompletionSummary from '@/components/organisms/LessonCompletionSummary';
import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';
import { lessonService, rewardService, progressService } from '@/services';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonData = await lessonService.getById(id);
        setLesson(lessonData);
      } catch (err) {
        setError(err.message || 'Failed to load lesson');
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id]);

  const handleAnswerSelect = useCallback((answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  }, [showFeedback]);

  const createCelebrationEffect = useCallback(() => {
    toast.success('🎉 Correct! Well done!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      className: "text-center font-medium"
    });
  }, []);

  const handleSubmitAnswer = useCallback(() => {
    if (!selectedAnswer || !lesson) return;

    const question = lesson.content.questions[currentQuestion];
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: correct
    };
    setUserAnswers(newAnswers);

    if (correct) {
      createCelebrationEffect();
    }
  }, [selectedAnswer, lesson, currentQuestion, userAnswers, createCelebrationEffect]);

  const completeLesson = useCallback(async () => {
    const correctAnswers = userAnswers.filter(answer => answer.correct).length;
    const score = Math.round((correctAnswers / lesson.content.questions.length) * 100);
    setFinalScore(score);

    try {
      await lessonService.update(lesson.id, {
        completed: true,
        score: score
      });

      if (score >= 70) {
        const newReward = {
          id: Date.now().toString(),
          type: 'badge',
          name: `${lesson.subject} Champion`,
          icon: lesson.subject === 'math' ? 'Calculator' : 'BookOpen',
          unlockedAt: new Date().toISOString()
        };
        await rewardService.create(newReward);

        const currentProgress = await progressService.getAll();
        const progress = currentProgress[0] || {
          mathLevel: 0,
          readingLevel: 0,
          totalScore: 0,
          streakDays: 0,
          lessonsCompleted: 0
        };

        const updatedProgress = {
          ...progress,
          totalScore: progress.totalScore + score,
          lessonsCompleted: progress.lessonsCompleted + 1,
          [lesson.subject === 'math' ? 'mathLevel' : 'readingLevel']:
            progress[lesson.subject === 'math' ? 'mathLevel' : 'readingLevel'] + 1
        };

        await progressService.update('progress', updatedProgress);
      }

      setLessonComplete(true);
    } catch (error) {
      toast.error('Failed to save progress');
    }
  }, [lesson, userAnswers]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < lesson.content.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      completeLesson();
    }
  }, [currentQuestion, lesson, completeLesson]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setLessonComplete(false);
    setFinalScore(0);
  }, []);

  const handleExit = useCallback(() => {
    navigate(lesson.subject === 'math' ? '/math' : '/reading');
  }, [navigate, lesson]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10 flex items-center justify-center p-6">
        <Card
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center max-w-md"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lesson not found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find this lesson.</p>
          <Button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  if (lessonComplete) {
    return (
      <LessonCompletionSummary
        finalScore={finalScore}
        correctCount={userAnswers.filter(a => a.correct).length}
        totalQuestions={lesson.content.questions.length}
        onRestart={handleRestart}
        onExit={handleExit}
      />
    );
  }

  const question = lesson.content.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lesson.content.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10">
      <LessonNavigationHeader
        lessonTitle={lesson.title}
        currentQuestionIndex={currentQuestion}
        totalQuestions={lesson.content.questions.length}
        progress={progress}
        onExit={handleExit}
      />

      <LessonQuizMain
        question={question}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        onAnswerSelect={handleAnswerSelect}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestion === lesson.content.questions.length - 1}
        questionCount={lesson.content.questions.length}
      />
    </div>
  );
}