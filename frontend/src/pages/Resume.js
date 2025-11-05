import { useState, useEffect } from 'react';
import { uploadAPI } from '../services/api';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import { Upload, FileText, Download, Trash2, Eye, CheckCircle, AlertCircle } from 'lucide-react';

const Resume = () => {
  const [hasResume, setHasResume] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkExistingResume();
  }, []);

  const checkExistingResume = async () => {
    try {
      const response = await uploadAPI.getResume();
      if (response.status === 200) {
        setHasResume(true);
        setResumeInfo({ filename: 'resume.pdf' }); // You can enhance this to get actual filename
      }
    } catch (error) {
      // No resume found, which is fine for 404, but log other errors
      if (error.response?.status !== 404) {
        setMessage(`Error checking existing resume: ${error.response?.data?.message || 'Please try again'}`);
      }
      setHasResume(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setMessage('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size must be less than 5MB.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await uploadAPI.uploadResume(formData);

      if (response.data) {
        setHasResume(true);
        setResumeInfo({ filename: response.data.filename });
        setMessage('Resume uploaded successfully!');
        // Clear the file input
        event.target.value = '';
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await uploadAPI.deleteResume();
      setHasResume(false);
      setResumeInfo(null);
      setMessage('Resume deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete resume. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload and manage your resume for job applications
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${message.includes('successfully')
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}>
            <div className="flex items-center">
              {message.includes('successfully') ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {hasResume ? 'Update Resume' : 'Upload Resume'}
            </h2>

            {!hasResume ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Upload your resume
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button loading={uploading} className="cursor-pointer">
                    Choose File
                  </Button>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">{resumeInfo?.filename || 'resume.pdf'}</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Uploaded successfully</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="danger" onClick={handleDeleteResume}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Upload a new version</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-update"
                  />
                  <label htmlFor="resume-update">
                    <Button variant="outline" loading={uploading} className="cursor-pointer">
                      Replace File
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              AI Suggestions
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Resume Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep it to 1-2 pages maximum</li>
                  <li>• Use action verbs to describe achievements</li>
                  <li>• Quantify your accomplishments with numbers</li>
                  <li>• Tailor your resume for each job application</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Improvement Areas</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Add more technical skills</li>
                  <li>• Include project descriptions</li>
                  <li>• Add relevant certifications</li>
                  <li>• Update contact information</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Strengths</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Clear formatting and structure</li>
                  <li>• Relevant work experience</li>
                  <li>• Good education background</li>
                  <li>• Professional summary included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;