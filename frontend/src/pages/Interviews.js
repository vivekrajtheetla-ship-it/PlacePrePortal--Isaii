import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';
import { 
  Plus, 
  Calendar, 
  Building, 
  MapPin, 
  DollarSign, 
  Star,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await interviewAPI.getAll();
      setInterviews(response.data);
    } catch (error) {
      setError('Failed to load interviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview experience?')) {
      try {
        await interviewAPI.delete(id);
        setInterviews(interviews.filter(interview => interview._id !== id));
      } catch (error) {
        setError('Failed to delete interview. Please try again.');
      }
    }
  };

  const handleView = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleEdit = (interview) => {
    // For now, we'll show an alert. In a real app, you'd open an edit modal or navigate to edit page
    alert(`Edit functionality for ${interview.company} interview will be implemented. For now, you can delete and create a new entry.`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interview Experiences
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Track and manage your interview experiences
            </p>
          </div>
          <Link to="/interviews/add">
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Interviews List */}
        {interviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Interview Experiences Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start tracking your interview experiences to help others and improve your own preparation.
              </p>
              <Link to="/interviews/add">
                <Button>Add Your First Experience</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {interview.company}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {interview.role}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(interview.date)}
                    </div>
                    {interview.location && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        {interview.location}
                      </div>
                    )}
                    {interview.package && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {interview.package}
                      </div>
                    )}
                    {interview.feedback?.rating && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Star className="w-4 h-4 mr-2" />
                        {interview.feedback.rating}/5
                      </div>
                    )}
                  </div>

                  {/* Experience Preview */}
                  {interview.experience?.overall && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {interview.experience.overall.substring(0, 120)}
                      {interview.experience.overall.length > 120 && '...'}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(interview)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(interview)}
                        className="flex items-center space-x-1"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(interview._id)}
                        className="flex items-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {interviews.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Total Interviews
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {interviews.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Success Rate
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {interviews.length > 0 
                  ? Math.round((interviews.filter(i => i.status === 'Selected').length / interviews.length) * 100)
                  : 0
                }%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Average Rating
              </h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {(() => {
                  const ratedInterviews = interviews.filter(i => i.feedback?.rating && typeof i.feedback.rating === 'number');
                  return ratedInterviews.length > 0
                    ? (ratedInterviews.reduce((sum, i) => sum + i.feedback.rating, 0) / ratedInterviews.length).toFixed(1)
                    : 'N/A';
                })()}
              </p>
            </div>
          </div>
        )}

        {/* Interview Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Interview Details"
          size="lg"
        >
          {selectedInterview && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Company</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedInterview.company}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Role</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedInterview.role}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Date</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formatDate(selectedInterview.date)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInterview.status)}`}>
                    {selectedInterview.status}
                  </span>
                </div>
                {selectedInterview.location && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedInterview.location}</p>
                  </div>
                )}
                {selectedInterview.package && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Package</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedInterview.package}</p>
                  </div>
                )}
                {selectedInterview.duration && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedInterview.duration} minutes</p>
                  </div>
                )}
                {selectedInterview.feedback?.rating && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rating</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedInterview.feedback.rating}/5</p>
                  </div>
                )}
              </div>
              
              {selectedInterview.experience?.overall && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Overall Experience</h4>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedInterview.experience.overall}</p>
                </div>
              )}
              
              {selectedInterview.experience?.questions && selectedInterview.experience.questions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Questions Asked</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedInterview.experience.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedInterview.experience?.tips && selectedInterview.experience.tips.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tips & Advice</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedInterview.experience.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedInterview.feedback?.comments && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Feedback</h4>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedInterview.feedback.comments}</p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Interviews;