import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Technical', 'HR', 'Managerial', 'Group Discussion'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: Number, // in minutes
  package: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Selected', 'Rejected'],
    default: 'Scheduled'
  },
  experience: {
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true
    },
    questions: [String],
    tips: [String],
    overall: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Interview', interviewSchema);