import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { quizAPI } from '../services/api';
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Target,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';

const Reports = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    strongAreas: [],
    weakAreas: []
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await quizAPI.getResults();
      const results = response.data;
      setQuizResults(results);

      // Calculate statistics
      if (results.length > 0) {
        const totalQuizzes = results.length;
        const averageScore = Math.round(
          results.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes
        );
        const bestScore = Math.max(...results.map(r => r.percentage));
        const totalTime = results.reduce((sum, result) => sum + result.timeTaken, 0);

        setStats({
          totalQuizzes,
          averageScore,
          bestScore,
          totalTime: Math.round(totalTime / 60), // Convert to minutes
          strongAreas: ['Data Structures', 'Algorithms'],
          weakAreas: ['System Design', 'Database']
        });
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-600 mt-2">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(stats.averageScore)}`}>
                  {stats.averageScore}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(stats.bestScore)}`}>
                  {stats.bestScore}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTime}m</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Quiz Results */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Quiz Results</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {quizResults.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {quizResults.slice(0, 10).map((result, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {result.quiz.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {result.quiz.category} • {result.quiz.difficulty}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(result.createdAt).toLocaleDateString()}
                            </span>
                            <span>
                              <Clock className="w-4 h-4 inline mr-1" />
                              {Math.round(result.timeTaken / 60)}m
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(result.percentage)} ${getScoreColor(result.percentage)}`}>
                            {result.percentage}%
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.correctAnswers}/{result.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No quiz results yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Take some quizzes to see your performance reports
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="space-y-6">
            {/* Strengths */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Strong Areas
              </h3>
              <div className="space-y-3">
                {stats.strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{area}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">85%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Areas for Improvement
              </h3>
              <div className="space-y-3">
                {stats.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{area}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm text-orange-600 font-medium">45%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommendations
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">
                    Focus on System Design topics to improve overall performance
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    Great progress in Data Structures! Keep practicing
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    Try taking more timed quizzes to improve speed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;