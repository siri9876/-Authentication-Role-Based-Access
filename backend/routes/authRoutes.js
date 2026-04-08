const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  signup,
  login,
  getMe,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// Validation rules
const signupValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['Admin', 'Recruiter', 'Delivery Manager', 'Finance/HR Ops'])
    .withMessage('Invalid role selected'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', authMiddleware, getMe);

// Admin only routes
router.get('/users', authMiddleware, requireRole('Admin'), getAllUsers);
router.patch('/users/:id/toggle-status', authMiddleware, requireRole('Admin'), toggleUserStatus);
router.delete('/users/:id', authMiddleware, requireRole('Admin'), deleteUser);

module.exports = router;
