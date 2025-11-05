# PlacementPrep - Complete MERN Interview Preparation Platform

A comprehensive web application built with the MERN stack to help students prepare for placement interviews through practice tests, resume management, and interview experience sharing.

## 🚀 Features

### ✅ **Authentication & User Management**
- Secure JWT-based authentication
- User registration and login
- Profile management with skills and education details

### ✅ **Practice Tests & Quizzes**
- **4 Sample Quiz Categories:**
  - JavaScript Fundamentals (Easy - 15 mins)
  - Aptitude Test - Quantitative (Medium - 20 mins)
  - HR & Behavioral Assessment (Easy - 10 mins)
  - System Design Basics (Hard - 25 mins)
- Real-time quiz taking with timer
- Instant results and explanations
- Performance tracking and analytics

### ✅ **Interview Management**
- Add and manage interview experiences
- View detailed interview information in modal
- Track interview status (Selected/Rejected/Pending)
- Rate and provide feedback
- Statistics dashboard (Success rate, Average rating)

### ✅ **Resume Management**
- Upload resume (PDF, DOC, DOCX)
- File validation and size limits
- AI-powered suggestions and tips
- Resume analysis and feedback

### ✅ **Modern UI/UX**
- Dark theme with glassmorphism effects
- Responsive design for all devices
- Beautiful gradient buttons and animations
- Smooth transitions and hover effects
- Error boundaries for graceful error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **bcrypt** - Password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd placementprep
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Set up demo data (includes sample user, quizzes, and interviews)
npm run setup-demo

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the frontend development server
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Demo Credentials

After running `npm run setup-demo`, you can login with:
- **Email:** demo@placementprep.com
- **Password:** demo123

## 📚 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup-demo` - Set up complete demo data
- `npm run seed` - Seed only quiz data

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎮 How to Use

### 1. **Registration/Login**
- Create a new account or use demo credentials
- Complete your profile with education and skills

### 2. **Take Practice Tests**
- Navigate to Practice page
- Choose from 4 different quiz categories
- Complete quizzes within time limits
- View detailed results and explanations

### 3. **Manage Interviews**
- Add your interview experiences
- View detailed information in modal popups
- Track your interview performance
- Get insights from statistics

### 4. **Resume Management**
- Upload your resume in supported formats
- Get AI-powered suggestions for improvement
- Manage and update your resume

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placementpre
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Frontend Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 📊 Sample Data

The demo setup includes:
- **1 Demo User** with complete profile
- **4 Practice Quizzes** across different categories
- **3 Sample Interview Experiences** with detailed information
- **Realistic Data** for testing all features

## 🎨 UI Features

### Modern Design Elements
- **Gradient Buttons** with hover animations
- **Glassmorphism Effects** on cards and modals
- **Dark Theme** throughout the application
- **Responsive Grid Layouts** for all screen sizes
- **Loading States** and error handling
- **Smooth Transitions** and micro-interactions

### Accessibility
- **Keyboard Navigation** support
- **Screen Reader** friendly
- **Color Contrast** compliance
- **Focus Management** in modals

## 🚀 Production Deployment

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend is production-ready
cd backend
npm start
```

### Deployment Checklist
- ✅ Environment variables configured
- ✅ MongoDB connection secured
- ✅ JWT secrets updated
- ✅ CORS configured for production domain
- ✅ File upload limits set
- ✅ Error logging implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vivek Raj T**

---

**Ready for Production** ✨ - Clean code, comprehensive features, and modern UI/UX!