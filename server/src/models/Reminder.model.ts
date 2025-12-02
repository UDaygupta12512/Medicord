import mongoose, { Document, Schema } from 'mongoose';

export interface IReminder extends Document {
    user: mongoose.Types.ObjectId;
    medicine: mongoose.Types.ObjectId;
    medicineName: string;
    dosage: string;
    frequency: {
        timesPerDay: number;
        times: string[]; // e.g., ['08:00', '14:00', '20:00']
    };
    startDate: Date;
    endDate?: Date;
    daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
    isActive: boolean;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReminderSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        medicine: {
            type: Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true,
        },
        medicineName: {
            type: String,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        frequency: {
            timesPerDay: {
                type: Number,
                required: true,
                min: 1,
                max: 10,
            },
            times: [{
                type: String,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            }],
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        daysOfWeek: [{
            type: Number,
            min: 0,
            max: 6,
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster querying
ReminderSchema.index({ user: 1, isActive: 1 });
ReminderSchema.index({ user: 1, medicine: 1 });

const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);
export default Reminder;
