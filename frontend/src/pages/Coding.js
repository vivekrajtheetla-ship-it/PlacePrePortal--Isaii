import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';
import { 
  Code, 
  Play, 
  Clock, 
  Trophy, 
  Filter,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Coding = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    difficulty: 'all',
    category: 'all',
    status: 'all'
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'arrays', label: 'Arrays & Strings' },
    { value: 'linkedlist', label: 'Linked Lists' },
    { value: 'trees', label: 'Trees & Graphs' },
    { value: 'dp', label: 'Dynamic Programming' },
    { value: 'sorting', label: 'Sorting & Searching' },
    { value: 'math', label: 'Math & Logic' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
  ];

  // Sample coding problems
  const sampleProblems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'arrays',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      acceptance: 49.2,
      submissions: 1234567,
      likes: 15234,
      companies: ['Google', 'Amazon', 'Microsoft'],
      status: 'solved',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      category: 'linkedlist',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      acceptance: 72.1,
      submissions: 987654,
      likes: 12456,
      companies: ['Facebook', 'Apple', 'Netflix'],
      status: 'attempted',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      category: 'trees',
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
      acceptance: 74.3,
      submissions: 756432,
      likes: 9876,
      companies: ['Google', 'Microsoft', 'Adobe'],
      status: 'unsolved',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 4,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      category: 'dp',
      description: 'Given a string s, return the longest palindromic substring in s.',
      acceptance: 32.8,
      submissions: 654321,
      likes: 11234,
      companies: ['Amazon', 'Microsoft', 'Uber'],
      status: 'unsolved',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 5,
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      category: 'arrays',
      description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      acceptance: 35.4,
      submissions: 432109,
      likes: 8765,
      companies: ['Google', 'Facebook', 'Apple'],
      status: 'unsolved',
      timeComplexity: 'O(log(m+n))',
      spaceComplexity: 'O(1)'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProblems(sampleProblems);
      setLoading(false);
    }, 1000);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'attempted': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />;
    }
  };

  const filteredProblems = problems.filter(problem => {
    if (filter.difficulty !== 'all' && problem.difficulty !== filter.difficulty) return false;
    if (filter.category !== 'all' && problem.category !== filter.category) return false;
    if (filter.status !== 'all' && problem.status !== filter.status) return false;
    return true;
  });

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Coding Challenges</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Practice coding problems from top tech companies
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Problems Solved</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">42</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">78%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Time</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">24m</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ranking</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">#1,247</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filter.difficulty}
                onChange={(e) => setFilter(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filter.category}
                onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Problems ({filteredProblems.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            {filteredProblems.map((problem) => (
              <div key={problem.id} className="p-6 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Status Icon */}
                    <div className="mt-1">
                      {getStatusIcon(problem.status)}
                    </div>

                    {/* Problem Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                          {problem.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {problem.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{problem.likes.toLocaleString()}</span>
                        </div>
                        <div>
                          Acceptance: {problem.acceptance}%
                        </div>
                        <div>
                          {problem.submissions.toLocaleString()} submissions
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Time: {problem.timeComplexity}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Space: {problem.spaceComplexity}</span>
                        </div>
                      </div>

                      {/* Companies */}
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Companies:</span>
                        {problem.companies.slice(0, 3).map((company, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-dark-600 text-xs text-gray-700 dark:text-gray-300 rounded"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="ml-4">
                    <Button className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span>Solve</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No problems found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Coding;