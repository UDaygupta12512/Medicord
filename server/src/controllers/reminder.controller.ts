import { Response } from 'express';
import Reminder from '../models/Reminder.model';
import { IAuthRequest } from '../middleware/auth';

// @desc    Create a new medication reminder
// @route   POST /api/reminders
// @access  Private
export const createReminder = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { medicine, medicineName, dosage, frequency, startDate, endDate, daysOfWeek, notes } = req.body;

        const reminder = new Reminder({
            user: userId,
            medicine,
            medicineName,
            dosage,
            frequency,
            startDate,
            endDate,
            daysOfWeek: daysOfWeek || [0, 1, 2, 3, 4, 5, 6], // Default to all days
            notes,
        });

        await reminder.save();

        res.status(201).json({
            success: true,
            data: reminder,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error creating reminder',
            error: error.message,
        });
    }
};

// @desc    Get all reminders for the authenticated user
// @route   GET /api/reminders
// @access  Private
export const getUserReminders = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { active } = req.query;
        
        const query: any = { user: userId };
        
        if (active !== undefined) {
            query.isActive = active === 'true';
        }

        const reminders = await Reminder.find(query)
            .populate('medicine', 'name genericName dosageForm strength')
            .sort({ isActive: -1, 'frequency.times': 1 });

        res.status(200).json({
            success: true,
            count: reminders.length,
            data: reminders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reminders',
            error: error.message,
        });
    }
};

// @desc    Update a reminder
// @route   PUT /api/reminders/:id
// @access  Private
export const updateReminder = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const reminderId = req.params.id;
        const updates = req.body;

        const reminder = await Reminder.findOneAndUpdate(
            { _id: reminderId, user: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!reminder) {
            res.status(404).json({
                success: false,
                message: 'Reminder not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: reminder,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error updating reminder',
            error: error.message,
        });
    }
};

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
// @access  Private
export const deleteReminder = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const reminderId = req.params.id;

        const reminder = await Reminder.findOneAndDelete({ _id: reminderId, user: userId });

        if (!reminder) {
            res.status(404).json({
                success: false,
                message: 'Reminder not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error deleting reminder',
            error: error.message,
        });
    }
};

// @desc    Toggle reminder active status
// @route   PATCH /api/reminders/:id/toggle
// @access  Private
export const toggleReminderStatus = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const reminderId = req.params.id;

        const reminder = await Reminder.findOne({ _id: reminderId, user: userId });

        if (!reminder) {
            res.status(404).json({
                success: false,
                message: 'Reminder not found',
            });
            return;
        }

        reminder.isActive = !reminder.isActive;
        await reminder.save();

        res.status(200).json({
            success: true,
            data: reminder,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error toggling reminder status',
            error: error.message,
        });
    }
};

// @desc    Get reminders for the current day and time
// @route   GET /api/reminders/upcoming
// @access  Private
export const getUpcomingReminders = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const now = new Date();
        const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const currentTime = now.toTimeString().substring(0, 5); // HH:MM format

        // Find active reminders for today
        const reminders = await Reminder.find({
            user: userId,
            isActive: true,
            startDate: { $lte: now },
                $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: now } },
            ],
            $and: [
                {
                    $or: [
                        { daysOfWeek: { $size: 0 } }, // If no specific days, assume daily
                        { daysOfWeek: currentDay },
                    ]
                }
            ],
            'frequency.times': {
                $elemMatch: { $gte: currentTime }
            }
        })
        .populate('medicine', 'name dosageForm strength')
        .sort({ 'frequency.times': 1 });

        res.status(200).json({
            success: true,
            data: reminders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching upcoming reminders',
            error: error.message,
        });
    }
};
