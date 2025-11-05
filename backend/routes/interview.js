import express from 'express';
import Interview from '../models/Interview.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/interview
// @desc    Get user's interviews
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/interview
// @desc    Add new interview experience
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const interview = new Interview({
      ...req.body,
      user: req.user._id
    });
    
    await interview.save();
    
    // Update user stats
    const user = await User.findById(req.user._id);
    user.stats.totalInterviews += 1;
    await user.save();
    
    res.status(201).json({
      message: 'Interview experience added successfully',
      interview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/interview/:id
// @desc    Get interview by ID
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/interview/:id
// @desc    Update interview
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.json({
      message: 'Interview updated successfully',
      interview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/interview/:id
// @desc    Delete interview
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/interview/public/experiences
// @desc    Get public interview experiences (anonymized)
// @access  Private
router.get('/public/experiences', authenticate, async (req, res) => {
  try {
    const { company, role, type } = req.query;
    let filter = {};
    
    if (company) filter.company = new RegExp(company, 'i');
    if (role) filter.role = new RegExp(role, 'i');
    if (type) filter.type = type;
    
    const interviews = await Interview.find(filter)
      .select('company role type date package experience feedback -user')
      .sort({ date: -1 })
      .limit(50);
    
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;