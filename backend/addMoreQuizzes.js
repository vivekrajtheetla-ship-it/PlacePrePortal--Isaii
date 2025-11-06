import mongoose from 'mongoose';
import Quiz from './models/Quiz.js';
import dotenv from 'dotenv';

dotenv.config();

const additionalQuizzes = [
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

const addMoreQuizzes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placementpre');
    console.log('Connected to MongoDB');

    // Insert additional quizzes
    const insertedQuizzes = await Quiz.insertMany(additionalQuizzes);
    console.log(`Added ${insertedQuizzes.length} new quiz categories:`);
    
    insertedQuizzes.forEach((quiz, index) => {
      console.log(`${index + 1}. ${quiz.title} (${quiz.difficulty} - ${quiz.duration} mins)`);
    });

    console.log('\n🎉 Successfully added 3 new quiz categories!');
    console.log('\nNew quiz categories available:');
    console.log('📊 Data Structures & Algorithms - Advanced coding concepts');
    console.log('🗄️  Database Management & SQL - Database and SQL knowledge');
    console.log('💻 Operating Systems & Networks - System fundamentals');
    
    console.log('\nTotal quiz categories now: 7');
    console.log('Total questions available: 36+');

    process.exit(0);
  } catch (error) {
    console.error('Error adding new quizzes:', error);
    process.exit(1);
  }
};

// Run the script
addMoreQuizzes();