import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionContent from '@/components/molecules/QuestionContent';
import AnswerOptionButton from '@/components/molecules/AnswerOptionButton';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';

const LessonQuizMain = ({
  question,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  questionCount
}) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.question}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            <QuestionContent questionText={question.question} image={question.image} />

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {question.options.map((option, index) => (
                <AnswerOptionButton
                  key={index}
                  option={option}
                  selected={selectedAnswer === option}
                  showFeedback={showFeedback}
                  isCorrectAnswer={option === question.correctAnswer}
                  onClick={onAnswerSelect}
                  disabled={showFeedback}
                />
              ))}
            </div>

            <div className="text-center">
              {!showFeedback ? (
                <Button
                  onClick={onSubmitAnswer}
                  disabled={!selectedAnswer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNextQuestion}
                  className="px-8 py-3 bg-secondary text-white rounded-xl font-medium shadow-lg hover:bg-secondary/90 transition-colors"
                >
                  {isLastQuestion ? 'Finish Lesson' : 'Next Question'}
                </Button>
              )}
            </div>

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
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LessonQuizMain;