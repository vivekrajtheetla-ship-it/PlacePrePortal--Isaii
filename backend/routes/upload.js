import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/resumes';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.user._id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @route   POST /api/upload/resume
// @desc    Upload resume
// @access  Private
router.post('/resume', authenticate, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Delete old resume if exists
    const user = await User.findById(req.user._id);
    if (user.profile.resume) {
      const oldFilePath = path.join(process.cwd(), user.profile.resume);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    
    // Update user profile with new resume path
    const resumePath = `uploads/resumes/${req.file.filename}`;
    user.profile.resume = resumePath;
    await user.save();
    
    res.json({
      message: 'Resume uploaded successfully',
      filename: req.file.filename,
      path: resumePath
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/upload/resume
// @desc    Get user's resume
// @access  Private
router.get('/resume', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.profile.resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    
    const filePath = path.join(process.cwd(), user.profile.resume);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found' });
    }
    
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/upload/resume
// @desc    Delete user's resume
// @access  Private
router.delete('/resume', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.profile.resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    
    const filePath = path.join(process.cwd(), user.profile.resume);
    
    // Delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Remove from user profile
    user.profile.resume = '';
    await user.save();
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;