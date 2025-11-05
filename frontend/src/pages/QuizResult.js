import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import { Trophy, Clock, Target, TrendingUp, Home, RotateCcw } from 'lucide-react';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, quiz } = location.state || {};

  if (!result || !quiz) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">No result data found</h2>
          <Button onClick={() => navigate('/practice')} className="mt-4">
            Back to Practice
          </Button>
        </div>
      </Layout>
    );
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent Work!';
    if (percentage >= 80) return 'Great Job!';
    if (percentage >= 70) return 'Good Performance!';
    if (percentage >= 60) return 'Keep Practicing!';
    return 'Need More Practice!';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Results: {quiz.title}
          </h1>
          <p className="text-gray-600">
            Here's a detailed breakdown of your performance
          </p>
        </div>

        {/* Score Overview */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.percentage)}`}>
              {result.score}/{result.totalQuestions}
            </div>
            <div className={`text-3xl font-semibold mb-4 ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <p className="text-xl text-gray-600">
              {getScoreMessage(result.percentage)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">✕</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {result.totalQuestions - result.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(result.timeTaken)}
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Performance Analysis
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Accuracy Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.percentage >= 80 ? 'bg-green-500' :
                      result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-gray-900">{result.percentage}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Speed</span>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {Math.round(result.timeTaken / result.totalQuestions)}s per question
                </div>
                <div className="text-sm text-gray-600">Average time</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Difficulty Level</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {quiz.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recommendations
          </h2>

          <div className="space-y-4">
            {result.percentage < 70 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h3>
                <p className="text-yellow-700 text-sm">
                  Consider reviewing the topics covered in this quiz and practicing similar questions.
                </p>
              </div>
            )}

            {result.percentage >= 70 && result.percentage < 90 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Good Progress!</h3>
                <p className="text-blue-700 text-sm">
                  You're doing well! Try more challenging questions to further improve your skills.
                </p>
              </div>
            )}

            {result.percentage >= 90 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Excellent Performance!</h3>
                <p className="text-green-700 text-sm">
                  Outstanding work! You've mastered this topic. Consider trying harder difficulty levels.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/practice')}
            variant="outline"
            className="flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice More
          </Button>
          
          <Button
            onClick={() => navigate('/reports')}
            className="flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View All Results
          </Button>
          
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default QuizResult;