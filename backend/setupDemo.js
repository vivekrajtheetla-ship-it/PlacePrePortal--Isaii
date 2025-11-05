import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Quiz from './models/Quiz.js';
import Interview from './models/Interview.js';
import dotenv from 'dotenv';

dotenv.config();

// Sample user data
const createDemoUser = async () => {
  const hashedPassword = await bcrypt.hash('demo123', 10);
  return {
    name: 'Demo User',
    email: 'demo@placementprep.com',
    password: hashedPassword,
    role: 'student',
    profile: {
      phone: '+91 9876543210',
      college: 'Demo University',
      branch: 'Computer Science',
      year: '2024',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
    },
    stats: {
      totalQuizzes: 0,
      averageScore: 0,
      totalInterviews: 0
    }
  };
};

// Sample quiz data
const sampleQuizzes = [
  {
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and data types.",
    category: "Coding Challenge",
    difficulty: "Easy",
    duration: 15,
    questions: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        correctAnswer: 0,
        explanation: "The 'var' keyword is used to declare variables in JavaScript.",
        difficulty: "Easy",
        topic: "Variables"
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: 1,
        explanation: "The push() method adds one or more elements to the end of an array.",
        difficulty: "Easy",
        topic: "Arrays"
      },
      {
        question: "What does '===' operator do in JavaScript?",
        options: ["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"],
        correctAnswer: 2,
        explanation: "The '===' operator checks for strict equality, comparing both value and type.",
        difficulty: "Medium",
        topic: "Operators"
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: 2,
        explanation: "JavaScript uses 'number' for all numeric values, not separate 'float' type.",
        difficulty: "Easy",
        topic: "Data Types"
      },
      {
        question: "What is the output of: console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correctAnswer: 2,
        explanation: "This is a known quirk in JavaScript where typeof null returns 'object'.",
        difficulty: "Medium",
        topic: "Types"
      }
    ]
  },
  {
    title: "Aptitude Test - Quantitative",
    description: "Basic mathematical and logical reasoning questions commonly asked in placement tests.",
    category: "Aptitude Test",
    difficulty: "Medium",
    duration: 20,
    questions: [
      {
        question: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
        options: ["75 km/hr", "80 km/hr", "85 km/hr", "90 km/hr"],
        correctAnswer: 1,
        explanation: "Speed = Distance/Time = 60 km / (45/60) hr = 60 × (60/45) = 80 km/hr",
        difficulty: "Medium",
        topic: "Speed and Distance"
      },
      {
        question: "What is 15% of 240?",
        options: ["32", "36", "38", "42"],
        correctAnswer: 1,
        explanation: "15% of 240 = (15/100) × 240 = 0.15 × 240 = 36",
        difficulty: "Easy",
        topic: "Percentage"
      },
      {
        question: "In a sequence 2, 6, 18, 54, ?, what is the next number?",
        options: ["108", "162", "216", "324"],
        correctAnswer: 1,
        explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162",
        difficulty: "Medium",
        topic: "Number Series"
      },
      {
        question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
        options: ["8", "10", "12", "15"],
        correctAnswer: 1,
        explanation: "If boys:girls = 3:2 and boys = 15, then girls = (2/3) × 15 = 10",
        difficulty: "Medium",
        topic: "Ratio and Proportion"
      }
    ]
  },
  {
    title: "HR & Behavioral Assessment",
    description: "Common HR questions to assess your personality, communication skills, and cultural fit.",
    category: "HR & Behavioral",
    difficulty: "Easy",
    duration: 10,
    questions: [
      {
        question: "What is your greatest strength?",
        options: [
          "Problem-solving and analytical thinking",
          "Team collaboration and communication",
          "Adaptability and learning agility",
          "Leadership and decision-making"
        ],
        correctAnswer: 0,
        explanation: "All options are valid strengths. Choose based on the role requirements and provide specific examples.",
        difficulty: "Easy",
        topic: "Self Assessment"
      },
      {
        question: "How do you handle stress and pressure?",
        options: [
          "I break down tasks into smaller, manageable parts",
          "I ignore the pressure and hope it goes away",
          "I get overwhelmed and can't function properly",
          "I blame others for creating stressful situations"
        ],
        correctAnswer: 0,
        explanation: "Breaking down tasks shows good stress management and organizational skills.",
        difficulty: "Easy",
        topic: "Stress Management"
      },
      {
        question: "Why do you want to work for our company?",
        options: [
          "Because I need a job and you're hiring",
          "I'm impressed by your company's innovation and growth opportunities",
          "The salary and benefits package is attractive",
          "It's close to my home"
        ],
        correctAnswer: 1,
        explanation: "Show genuine interest in the company's mission, values, and growth opportunities.",
        difficulty: "Easy",
        topic: "Company Interest"
      }
    ]
  },
  {
    title: "System Design Basics",
    description: "Fundamental concepts of system design and architecture for software engineering roles.",
    category: "System Design",
    difficulty: "Hard",
    duration: 25,
    questions: [
      {
        question: "What is the primary purpose of load balancing?",
        options: [
          "To increase security",
          "To distribute incoming requests across multiple servers",
          "To reduce database size",
          "To improve code quality"
        ],
        correctAnswer: 1,
        explanation: "Load balancing distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed.",
        difficulty: "Medium",
        topic: "Load Balancing"
      },
      {
        question: "Which database type is best suited for handling large amounts of unstructured data?",
        options: ["SQL databases", "NoSQL databases", "In-memory databases", "Graph databases"],
        correctAnswer: 1,
        explanation: "NoSQL databases are designed to handle large volumes of unstructured or semi-structured data.",
        difficulty: "Medium",
        topic: "Databases"
      },
      {
        question: "What is the main advantage of microservices architecture?",
        options: [
          "Easier to develop initially",
          "Better scalability and maintainability",
          "Requires less infrastructure",
          "Simpler deployment process"
        ],
        correctAnswer: 1,
        explanation: "Microservices allow independent scaling, development, and deployment of different parts of an application.",
        difficulty: "Hard",
        topic: "Architecture"
      }
    ]
  }
];

const setupDemo = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placementpre');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await Interview.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const demoUser = await createDemoUser();
    const user = await User.create(demoUser);
    console.log(`Created demo user: ${user.email} (password: demo123)`);

    // Insert sample quizzes
    const insertedQuizzes = await Quiz.insertMany(sampleQuizzes);
    console.log(`Inserted ${insertedQuizzes.length} sample quizzes`);

    // Sample interview data for the demo user
    const sampleInterviews = [
      {
        user: user._id,
        company: "Google",
        role: "Software Engineer",
        date: new Date('2024-01-15'),
        status: "Selected",
        package: "₹25 LPA",
        type: "Technical",
        duration: 180,
        experience: {
          difficulty: "Hard",
          questions: [
            "Implement LRU Cache",
            "Design URL Shortener",
            "Two Sum problem variations",
            "Behavioral questions about leadership"
          ],
          tips: [
            "Practice system design concepts",
            "Be clear about your thought process",
            "Ask clarifying questions",
            "Discuss trade-offs"
          ],
          overall: "The interview process was comprehensive and well-structured. It consisted of 4 rounds: Online Coding, Technical rounds, and Behavioral. The interviewers were knowledgeable and provided hints when needed. Great experience overall!"
        },
        feedback: {
          rating: 5,
          comments: "Excellent problem-solving skills and clear communication. Strong technical foundation."
        }
      },
      {
        user: user._id,
        company: "Microsoft",
        role: "Software Development Engineer",
        date: new Date('2024-02-20'),
        status: "Rejected",
        package: "₹22 LPA",
        type: "Technical",
        duration: 120,
        experience: {
          difficulty: "Medium",
          questions: [
            "String manipulation problems",
            "Tree traversal algorithms",
            "OOP design patterns",
            "System design basics"
          ],
          tips: [
            "Focus on optimization",
            "Practice more graph algorithms",
            "Improve time complexity analysis"
          ],
          overall: "Virtual interview with 3 rounds: Coding, Technical Discussion, and Final Round. Could have performed better in the optimization part."
        },
        feedback: {
          rating: 3,
          comments: "Good technical knowledge but needs improvement in optimization and time complexity."
        }
      },
      {
        user: user._id,
        company: "Amazon",
        role: "SDE-1",
        date: new Date('2024-03-10'),
        status: "Completed",
        package: "₹20 LPA",
        type: "HR",
        duration: 90,
        experience: {
          difficulty: "Medium",
          questions: [
            "Leadership Principles scenarios",
            "Customer Obsession examples",
            "System design for e-commerce",
            "Behavioral questions"
          ],
          tips: [
            "Prepare STAR format answers",
            "Know Amazon's Leadership Principles",
            "Practice system design"
          ],
          overall: "Currently in final stages. Completed 3 rounds focusing on Leadership Principles and system design. Waiting for final round with hiring manager."
        },
        feedback: {
          rating: 4,
          comments: "Strong alignment with leadership principles. Good technical skills demonstrated."
        }
      }
    ];

    // Insert sample interviews
    const insertedInterviews = await Interview.insertMany(sampleInterviews);
    console.log(`Inserted ${insertedInterviews.length} sample interviews`);

    console.log('\n=== DEMO SETUP COMPLETE ===');
    console.log('Demo User Credentials:');
    console.log('Email: demo@placementprep.com');
    console.log('Password: demo123');
    console.log('\nYou can now:');
    console.log('1. Login with the demo credentials');
    console.log('2. Take practice quizzes');
    console.log('3. View interview experiences');
    console.log('4. Upload resume');
    console.log('5. Explore all features');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up demo:', error);
    process.exit(1);
  }
};

// Run the demo setup
setupDemo();