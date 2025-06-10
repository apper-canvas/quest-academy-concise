import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { lessonService, rewardService, progressService } from '../services';

export default function Lesson() {
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

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
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
      // Add celebration particles effect
      createCelebrationEffect();
    }
  };

  const createCelebrationEffect = () => {
    // Simple celebration effect - in a real app, you might use a library like react-confetti
    toast.success('🎉 Correct! Well done!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      className: "text-center font-medium"
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.content.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      completeLesson();
    }
  };

  const completeLesson = async () => {
    const correctAnswers = userAnswers.filter(answer => answer.correct).length;
    const score = Math.round((correctAnswers / lesson.content.questions.length) * 100);
    setFinalScore(score);

    try {
      // Update lesson progress
      await lessonService.update(lesson.id, { 
        completed: true, 
        score: score 
      });

      // Award rewards if score is good
      if (score >= 70) {
        const newReward = {
          id: Date.now().toString(),
          type: 'badge',
          name: `${lesson.subject} Champion`,
          icon: lesson.subject === 'math' ? 'Calculator' : 'BookOpen',
          unlockedAt: new Date().toISOString()
        };
        await rewardService.create(newReward);
        
        // Update progress
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
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setLessonComplete(false);
    setFinalScore(0);
  };

  const handleExit = () => {
    navigate(lesson.subject === 'math' ? '/math' : '/reading');
  };

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lesson not found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find this lesson.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (lessonComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-3d text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ApperIcon 
              name={finalScore >= 70 ? "Trophy" : "Target"} 
              size={64} 
              className={`mx-auto mb-6 ${finalScore >= 70 ? 'text-accent' : 'text-primary'}`} 
            />
          </motion.div>
          
          <h2 className="text-3xl font-heading text-gray-800 mb-4">
            {finalScore >= 70 ? 'Excellent Work!' : 'Good Effort!'}
          </h2>
          
          <div className="mb-6">
            <div className="text-4xl font-bold text-primary mb-2">{finalScore}%</div>
            <p className="text-gray-600">
              You got {userAnswers.filter(a => a.correct).length} out of {lesson.content.questions.length} questions correct!
            </p>
          </div>

          {finalScore >= 70 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-accent/10 rounded-lg p-4 mb-6"
            >
              <ApperIcon name="Star" size={24} className="text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">You earned a new badge!</p>
            </motion.div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleRestart}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={handleExit}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = lesson.content.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lesson.content.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-white to-primary/10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-primary/10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExit}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="ArrowLeft" size={20} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">{lesson.title}</h1>
            </div>
            <div className="text-sm font-medium text-gray-600">
              {currentQuestion + 1} of {lesson.content.questions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-3d p-8"
          >
            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading text-gray-800 mb-4">
                {question.question}
              </h2>
              {question.image && (
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                    <ApperIcon name={question.image} size={64} className="text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Answers */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedAnswer === option
                      ? showFeedback
                        ? isCorrect
                          ? 'border-success bg-success/10 text-success'
                          : 'border-error bg-error/10 text-error'
                        : 'border-primary bg-primary/10 text-primary'
                      : showFeedback && option === question.correctAnswer
                      ? 'border-success bg-success/10 text-success'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option
                        ? showFeedback
                          ? isCorrect
                            ? 'border-success bg-success'
                            : 'border-error bg-error'
                          : 'border-primary bg-primary'
                        : showFeedback && option === question.correctAnswer
                        ? 'border-success bg-success'
                        : 'border-gray-300'
                    }`}>
                      {((selectedAnswer === option && showFeedback) || 
                        (showFeedback && option === question.correctAnswer)) && (
                        <ApperIcon 
                          name={
                            (selectedAnswer === option && isCorrect) || 
                            (option === question.correctAnswer) 
                              ? "Check" 
                              : "X"
                          } 
                          size={12} 
                          className="text-white" 
                        />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Action Button */}
            <div className="text-center">
              {!showFeedback ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  Submit Answer
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-medium shadow-lg hover:bg-secondary/90 transition-colors"
                >
                  {currentQuestion < lesson.content.questions.length - 1 ? 'Next Question' : 'Finish Lesson'}
                </motion.button>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-xl text-center ${
                    isCorrect 
                      ? 'bg-success/10 text-success' 
                      : 'bg-error/10 text-error'
                  }`}
                >
                  <ApperIcon 
                    name={isCorrect ? "CheckCircle" : "XCircle"} 
                    size={24} 
                    className="mx-auto mb-2" 
                  />
                  <p className="font-medium">
                    {isCorrect 
                      ? "Excellent! That's correct!" 
                      : `Not quite right. The correct answer is: ${question.correctAnswer}`
                    }
                  </p>
                  {question.explanation && (
                    <p className="mt-2 text-sm opacity-80">{question.explanation}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}