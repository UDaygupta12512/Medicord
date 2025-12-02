import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatar?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    favorites: mongoose.Types.ObjectId[];
    prescriptions: {
        medicine: mongoose.Types.ObjectId;
        dosage: string;
        frequency: string;
        startDate: Date;
        endDate?: Date;
        notes?: string;
    }[];
    searchHistory: {
        query: string;
        timestamp: Date;
    }[];
    reminders: {
        medicine: mongoose.Types.ObjectId;
        time: string;
        frequency: string;
        active: boolean;
    }[];
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        avatar: String,
        phone: String,
        dateOfBirth: Date,
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        favorites: [{
            type: Schema.Types.ObjectId,
            ref: 'Medicine',
        }],
        prescriptions: [{
            medicine: {
                type: Schema.Types.ObjectId,
                ref: 'Medicine',
            },
            dosage: String,
            frequency: String,
            startDate: {
                type: Date,
                default: Date.now,
            },
            endDate: Date,
            notes: String,
        }],
        searchHistory: [{
            query: String,
            timestamp: {
                type: Date,
                default: Date.now,
            },
        }],
        reminders: [{
            medicine: {
                type: Schema.Types.ObjectId,
                ref: 'Medicine',
            },
            time: String,
            frequency: String,
            active: {
                type: Boolean,
                default: true,
            },
        }],
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
