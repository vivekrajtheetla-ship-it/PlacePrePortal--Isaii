import mongoose from 'mongoose';
import Quiz from './models/Quiz.js';
import dotenv from 'dotenv';

dotenv.config();

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
      },
      {
        question: "What is the compound interest on Rs. 1000 for 2 years at 10% per annum?",
        options: ["Rs. 200", "Rs. 210", "Rs. 220", "Rs. 230"],
        correctAnswer: 1,
        explanation: "CI = P(1+r/100)^n - P = 1000(1.1)^2 - 1000 = 1210 - 1000 = Rs. 210",
        difficulty: "Hard",
        topic: "Compound Interest"
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
      },
      {
        question: "Describe a time when you had to work with a difficult team member.",
        options: [
          "I tried to understand their perspective and find common ground",
          "I complained to the manager immediately",
          "I avoided working with them as much as possible",
          "I argued with them until they agreed with me"
        ],
        correctAnswer: 0,
        explanation: "Shows emotional intelligence, conflict resolution, and teamwork skills.",
        difficulty: "Medium",
        topic: "Teamwork"
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
      },
      {
        question: "What is caching primarily used for?",
        options: [
          "Data backup",
          "Improving application performance",
          "Data encryption",
          "User authentication"
        ],
        correctAnswer: 1,
        explanation: "Caching stores frequently accessed data in fast storage to improve application response times.",
        difficulty: "Easy",
        topic: "Caching"
      },
      {
        question: "In CAP theorem, what does 'P' stand for?",
        options: ["Performance", "Partition tolerance", "Persistence", "Parallelism"],
        correctAnswer: 1,
        explanation: "CAP theorem states that distributed systems can only guarantee 2 out of 3: Consistency, Availability, and Partition tolerance.",
        difficulty: "Hard",
        topic: "Distributed Systems"
      }
    ]
  }
];

const seedQuizzes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placementpre');
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');

    // Insert sample quizzes
    const insertedQuizzes = await Quiz.insertMany(sampleQuizzes);
    console.log(`Inserted ${insertedQuizzes.length} sample quizzes`);

    console.log('Sample quiz data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding quiz data:', error);
    process.exit(1);
  }
};

// Run the seeder
seedQuizzes();