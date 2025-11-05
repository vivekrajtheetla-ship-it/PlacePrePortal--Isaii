import mongoose from 'mongoose';
import Interview from './models/Interview.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleInterviews = [
  {
    company: "Google",
    role: "Software Engineer",
    date: new Date('2024-01-15'),
    status: "Selected",
    location: "Bangalore, India",
    package: "₹25 LPA",
    rating: 5,
    type: "On-site",
    experience: `The interview process was comprehensive and well-structured. It consisted of 4 rounds:

1. Online Coding Round: Two medium-level algorithmic problems on arrays and dynamic programming. Completed both in 90 minutes.

2. Technical Round 1: Deep dive into data structures. Discussed time complexity of various operations, implemented a LRU cache from scratch.

3. Technical Round 2: System design round. Asked to design a URL shortener like bit.ly. Discussed scalability, database design, and caching strategies.

4. Behavioral Round: Questions about past projects, leadership experience, and cultural fit. Very friendly and conversational.

The interviewers were knowledgeable and provided hints when I was stuck. Overall, a great experience!`,
    feedback: "Excellent problem-solving skills and clear communication. Strong technical foundation."
  },
  {
    company: "Microsoft",
    role: "Software Development Engineer",
    date: new Date('2024-02-20'),
    status: "Rejected",
    location: "Hyderabad, India",
    package: "₹22 LPA",
    rating: 3,
    type: "Virtual",
    experience: `The interview was conducted virtually and had 3 rounds:

1. Coding Round: One easy and one medium problem. The easy one was about string manipulation, and the medium was a tree traversal problem. I solved both but took longer than expected.

2. Technical Discussion: Questions about OOP concepts, design patterns, and my previous projects. The interviewer seemed satisfied with my answers.

3. Final Round: Mix of technical and behavioral questions. Asked about handling pressure, team conflicts, and a challenging coding problem involving graphs.

Unfortunately, I couldn't optimize the graph solution completely, which might have been the deciding factor.`,
    feedback: "Good technical knowledge but needs improvement in problem-solving speed and optimization."
  },
  {
    company: "Amazon",
    role: "SDE-1",
    date: new Date('2024-03-10'),
    status: "Pending",
    location: "Chennai, India",
    package: "₹20 LPA",
    rating: 4,
    type: "On-site",
    experience: `Currently in the final stages of the interview process. Completed 3 out of 4 rounds:

1. Online Assessment: Two coding problems - one on arrays and another on linked lists. Both were medium difficulty. Completed successfully.

2. Technical Round 1: Focus on Amazon's Leadership Principles. Discussed past projects with emphasis on customer obsession and ownership.

3. Technical Round 2: System design and coding. Asked to design a basic e-commerce cart system and implement a function to find the shortest path in a weighted graph.

Waiting for the final round which will be with the hiring manager. Fingers crossed!`,
    feedback: "Strong alignment with leadership principles. Good technical skills demonstrated."
  }
];

const seedInterviews = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placementpre');
    console.log('Connected to MongoDB');

    // Find the first user to assign interviews to
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first.');
      process.exit(1);
    }

    // Add user ID to sample interviews
    const interviewsWithUser = sampleInterviews.map(interview => ({
      ...interview,
      user: user._id
    }));

    // Clear existing interviews for this user
    await Interview.deleteMany({ user: user._id });
    console.log('Cleared existing interviews');

    // Insert sample interviews
    const insertedInterviews = await Interview.insertMany(interviewsWithUser);
    console.log(`Inserted ${insertedInterviews.length} sample interviews for user: ${user.name}`);

    console.log('Sample interview data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding interview data:', error);
    process.exit(1);
  }
};

// Run the seeder
seedInterviews();