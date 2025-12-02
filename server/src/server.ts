import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Medicord API',
        version: '1.0.0',
        status: 'active',
        endpoints: {
            medicines: '/api/medicines',
            substitutes: '/api/substitutes',
            interactions: '/api/interactions',
            chat: '/api/chat',
            auth: '/api/auth',
            users: '/api/users',
        },
    });
});

// Import routes
import medicineRoutes from './routes/medicine.routes';
import substituteRoutes from './routes/substitute.routes';
import interactionRoutes from './routes/interaction.routes';
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import reminderRoutes from './routes/reminder.routes';

// Use routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/substitutes', substituteRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Medicord API Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
});

export default app;
