import express from 'express';
import Quiz from '../models/Quiz.js';
import QuizResult from '../models/QuizResult.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/quiz
// @desc    Get all quizzes
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    const quizzes = await Quiz.find(filter).select('-questions');
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz/:id
// @desc    Get quiz by ID with questions
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Remove correct answers from questions for security
    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty,
      topic: q.topic
    }));
    
    res.json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quiz/:id/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:id/submit', authenticate, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = answers.map(answer => {
      const question = quiz.questions.id(answer.questionId);
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        timeTaken: answer.timeTaken || 0
      };
    });
    
    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    // Save result
    const result = new QuizResult({
      user: req.user._id,
      quiz: quiz._id,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      percentage,
      timeTaken
    });
    
    await result.save();
    
    // Update user stats
    const user = await User.findById(req.user._id);
    user.stats.totalQuizzes += 1;
    user.stats.averageScore = Math.round(
      ((user.stats.averageScore * (user.stats.totalQuizzes - 1)) + percentage) / user.stats.totalQuizzes
    );
    await user.save();
    
    res.json({
      message: 'Quiz submitted successfully',
      result: {
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        percentage,
        timeTaken
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz/results/me
// @desc    Get user's quiz results
// @access  Private
router.get('/results/me', authenticate, async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .populate('quiz', 'title category difficulty')
      .sort({ createdAt: -1 });
    
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;