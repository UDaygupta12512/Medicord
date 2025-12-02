import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    medicine: mongoose.Types.ObjectId;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    notHelpful: number;
    verified: boolean;
    sideEffectsExperienced?: string[];
    effectiveness?: number;
    easeOfUse?: number;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
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
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        helpful: {
            type: Number,
            default: 0,
        },
        notHelpful: {
            type: Number,
            default: 0,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        sideEffectsExperienced: [String],
        effectiveness: {
            type: Number,
            min: 1,
            max: 5,
        },
        easeOfUse: {
            type: Number,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure one review per user per medicine
ReviewSchema.index({ user: 1, medicine: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', ReviewSchema);
