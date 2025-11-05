import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAPI, interviewAPI } from '../services/api';
import Layout from '../components/Layout/Layout';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  Trophy,
  Clock,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    recentQuizzes: 0,
    upcomingInterviews: 0,
    averageScore: 0,
    totalInterviews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [quizResults, interviews] = await Promise.all([
        quizAPI.getResults(),
        interviewAPI.getAll()
      ]);

      const recentQuizzes = quizResults.data.slice(0, 5);
      const upcomingInterviews = interviews.data.filter(
        interview => new Date(interview.date) > new Date()
      );

      setStats({
        recentQuizzes: recentQuizzes.length,
        upcomingInterviews: upcomingInterviews.length,
        averageScore: user?.stats?.averageScore || 0,
        totalInterviews: user?.stats?.totalInterviews || 0
      });

      // Combine recent activity
      const activity = [
        ...recentQuizzes.map(quiz => ({
          type: 'quiz',
          title: `Completed ${quiz.quiz.title}`,
          score: `${quiz.percentage}%`,
          date: quiz.createdAt,
          status: quiz.percentage >= 70 ? 'success' : 'warning'
        })),
        ...interviews.data.slice(0, 3).map(interview => ({
          type: 'interview',
          title: `${interview.company} - ${interview.role}`,
          status: interview.status.toLowerCase(),
          date: interview.date
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Take Practice Test',
      description: 'Start a new quiz to test your skills',
      icon: BookOpen,
      link: '/practice',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Interview',
      description: 'Record your interview experience',
      icon: Plus,
      link: '/interviews/add',
      color: 'bg-green-500'
    },
    {
      title: 'Upload Resume',
      description: 'Update your resume',
      icon: FileText,
      link: '/resume',
      color: 'bg-purple-500'
    },
    {
      title: 'View Reports',
      description: 'Check your progress',
      icon: BarChart3,
      link: '/reports',
      color: 'bg-orange-500'
    }
  ];

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Here's what's happening with your placement preparation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent Quizzes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.recentQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Upcoming Mock</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">Oct 28</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Latest Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">My Interviews</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalInterviews}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              {recentActivity.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'warning' ? 'bg-yellow-500' :
                          activity.status === 'completed' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {activity.title}
                          </p>
                          {activity.score && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">Score: {activity.score}</p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">No recent activity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Start taking quizzes to see your activity here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;