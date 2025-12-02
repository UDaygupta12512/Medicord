import express from 'express';
import { protect } from '../middleware/auth';
import {
    createReminder,
    getUserReminders,
    updateReminder,
    deleteReminder,
    toggleReminderStatus,
    getUpcomingReminders,
} from '../controllers/reminder.controller';

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @route   POST /api/reminders
// @desc    Create a new reminder
// @access  Private
router.post('/', createReminder);

// @route   GET /api/reminders
// @desc    Get all reminders for the authenticated user
// @access  Private
router.get('/', getUserReminders);

// @route   GET /api/reminders/upcoming
// @desc    Get upcoming reminders for the current day and time
// @access  Private
router.get('/upcoming', getUpcomingReminders);

// @route   PUT /api/reminders/:id
// @desc    Update a reminder
// @access  Private
router.put('/:id', updateReminder);

// @route   DELETE /api/reminders/:id
// @desc    Delete a reminder
// @access  Private
router.delete('/:id', deleteReminder);

// @route   PATCH /api/reminders/:id/toggle
// @desc    Toggle reminder active status
// @access  Private
router.patch('/:id/toggle', toggleReminderStatus);

export default router;
