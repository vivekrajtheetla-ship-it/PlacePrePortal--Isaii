import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Quiz from './models/Quiz.js';
import Interview from './models/Interview.js';
import dotenv from 'dotenv';

dotenv.config();

// All quiz data (original + new)
const allQuizzes = [
  // Original Quizzes
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
  },
  // New Quizzes
  {
    title: "Data Structures & Algorithms",
    description: "Test your knowledge of fundamental data structures and algorithmic concepts essential for technical interviews.",
    category: "Coding Challenge",
    difficulty: "Hard",
    duration: 30,
    questions: [
      {
        question: "What is the time complexity of searching in a balanced Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "In a balanced BST, the height is log n, so search operations take O(log n) time.",
        difficulty: "Medium",
        topic: "Binary Search Trees"
      },
      {
        question: "Which data structure is best suited for implementing a function call stack?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: 1,
        explanation: "Stack follows LIFO (Last In First Out) principle, which matches function call behavior.",
        difficulty: "Easy",
        topic: "Stack"
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correctAnswer: 1,
        explanation: "QuickSort has O(n²) worst-case when the pivot is always the smallest or largest element.",
        difficulty: "Medium",
        topic: "Sorting Algorithms"
      },
      {
        question: "In a hash table with chaining, what happens when two keys hash to the same index?",
        options: ["One key is rejected", "The table is resized", "Both keys are stored in a linked list", "The second key overwrites the first"],
        correctAnswer: 2,
        explanation: "Chaining handles collisions by storing multiple key-value pairs in a linked list at the same index.",
        difficulty: "Medium",
        topic: "Hash Tables"
      },
      {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: ["BFS", "DFS", "Dijkstra's Algorithm", "Binary Search"],
        correctAnswer: 2,
        explanation: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph.",
        difficulty: "Hard",
        topic: "Graph Algorithms"
      },
      {
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 2,
        explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
        difficulty: "Medium",
        topic: "Sorting Algorithms"
      }
    ]
  },
  {
    title: "Database Management & SQL",
    description: "Comprehensive test covering database concepts, SQL queries, normalization, and database design principles.",
    category: "Coding Challenge",
    difficulty: "Medium",
    duration: 25,
    questions: [
      {
        question: "Which SQL command is used to retrieve data from a database?",
        options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
        correctAnswer: 1,
        explanation: "SELECT is the SQL command used to query and retrieve data from database tables.",
        difficulty: "Easy",
        topic: "SQL Basics"
      },
      {
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Dependability", "Authentication, Confidentiality, Integrity, Delivery", "Availability, Consistency, Isolation, Distribution"],
        correctAnswer: 0,
        explanation: "ACID properties ensure reliable database transactions: Atomicity, Consistency, Isolation, and Durability.",
        difficulty: "Medium",
        topic: "Database Transactions"
      },
      {
        question: "Which normal form eliminates partial dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: 1,
        explanation: "Second Normal Form (2NF) eliminates partial dependencies by ensuring all non-key attributes depend on the entire primary key.",
        difficulty: "Medium",
        topic: "Database Normalization"
      },
      {
        question: "What is the purpose of an INDEX in a database?",
        options: ["To store data", "To speed up data retrieval", "To enforce constraints", "To backup data"],
        correctAnswer: 1,
        explanation: "Indexes create a separate structure that points to data locations, significantly speeding up SELECT operations.",
        difficulty: "Easy",
        topic: "Database Optimization"
      },
      {
        question: "Which JOIN returns all records from both tables, filling with NULL where no match exists?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correctAnswer: 3,
        explanation: "FULL OUTER JOIN returns all records from both tables, with NULL values where no matching records exist.",
        difficulty: "Medium",
        topic: "SQL Joins"
      },
      {
        question: "What is a foreign key constraint used for?",
        options: ["Uniquely identifying records", "Maintaining referential integrity", "Indexing data", "Encrypting data"],
        correctAnswer: 1,
        explanation: "Foreign key constraints maintain referential integrity by ensuring values in one table correspond to valid values in another table.",
        difficulty: "Easy",
        topic: "Database Constraints"
      }
    ]
  },
  {
    title: "Operating Systems & Networks",
    description: "Test your understanding of operating system concepts, networking protocols, and system administration fundamentals.",
    category: "System Design",
    difficulty: "Medium",
    duration: 20,
    questions: [
      {
        question: "What is the main purpose of virtual memory in an operating system?",
        options: ["To increase CPU speed", "To provide more RAM than physically available", "To encrypt data", "To manage network connections"],
        correctAnswer: 1,
        explanation: "Virtual memory allows the OS to use disk space as an extension of RAM, enabling programs larger than physical memory to run.",
        difficulty: "Medium",
        topic: "Memory Management"
      },
      {
        question: "Which scheduling algorithm can cause starvation?",
        options: ["Round Robin", "First Come First Serve", "Shortest Job First", "Priority Scheduling"],
        correctAnswer: 3,
        explanation: "Priority scheduling can cause starvation when high-priority processes continuously prevent low-priority processes from executing.",
        difficulty: "Hard",
        topic: "Process Scheduling"
      },
      {
        question: "What does TCP stand for in networking?",
        options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Communication Protocol", "Technical Control Procedure"],
        correctAnswer: 1,
        explanation: "TCP (Transmission Control Protocol) is a reliable, connection-oriented protocol that ensures data delivery.",
        difficulty: "Easy",
        topic: "Network Protocols"
      },
      {
        question: "Which layer of the OSI model handles routing?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
        correctAnswer: 2,
        explanation: "The Network Layer (Layer 3) is responsible for routing packets between different networks using IP addresses.",
        difficulty: "Medium",
        topic: "OSI Model"
      },
      {
        question: "What is a deadlock in operating systems?",
        options: ["A process that runs forever", "Two or more processes waiting indefinitely for each other", "A crashed program", "A security vulnerability"],
        correctAnswer: 1,
        explanation: "Deadlock occurs when two or more processes are blocked forever, each waiting for resources held by the others.",
        difficulty: "Medium",
        topic: "Process Synchronization"
      },
      {
        question: "Which HTTP status code indicates 'Not Found'?",
        options: ["200", "301", "404", "500"],
        correctAnswer: 2,
        explanation: "HTTP status code 404 indicates that the requested resource could not be found on the server.",
        difficulty: "Easy",
        topic: "HTTP Protocol"
      }
    ]
  }
];

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
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Data Structures', 'Algorithms']
    },
    stats: {
      totalQuizzes: 0,
      averageScore: 0,
      totalInterviews: 0
    }
  };
};

const setupComplete = async () => {
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

    // Insert all quizzes
    const insertedQuizzes = await Quiz.insertMany(allQuizzes);
    console.log(`Inserted ${insertedQuizzes.length} quiz categories`);

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

    console.log('\n🎉 COMPLETE SETUP FINISHED! 🎉');
    console.log('\n=== DEMO CREDENTIALS ===');
    console.log('Email: demo@placementprep.com');
    console.log('Password: demo123');
    
    console.log('\n=== AVAILABLE FEATURES ===');
    console.log('📚 7 Quiz Categories with 33+ questions:');
    console.log('   🟢 JavaScript Fundamentals (Easy - 15 mins)');
    console.log('   🟡 Aptitude Test (Medium - 20 mins)');
    console.log('   🟢 HR & Behavioral (Easy - 10 mins)');
    console.log('   🔴 System Design Basics (Hard - 25 mins)');
    console.log('   🔴 Data Structures & Algorithms (Hard - 30 mins)');
    console.log('   🟡 Database Management & SQL (Medium - 25 mins)');
    console.log('   🟡 Operating Systems & Networks (Medium - 20 mins)');
    
    console.log('\n💼 3 Sample Interview Experiences');
    console.log('📄 Resume Upload & Management');
    console.log('📊 Analytics & Progress Tracking');
    console.log('🎨 Modern Dark Theme UI');
    
    console.log('\n🌐 Access the application at: http://localhost:3000');
    console.log('🔧 Backend API running at: http://localhost:5000');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up complete demo:', error);
    process.exit(1);
  }
};

// Run the complete setup
setupComplete();