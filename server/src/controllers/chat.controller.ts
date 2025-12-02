import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI health advisor
const SYSTEM_PROMPT = `You are Medicord AI, an intelligent healthcare assistant specializing in medicine information. 

Your role is to:
1. Provide accurate, educational information about medicines
2. Explain side effects, dosages, and interactions in simple language
3. Help users understand medical terminology
4. Always emphasize that your advice is educational, not a substitute for professional medical advice
5. Encourage users to consult healthcare professionals for personalized medical advice
6. Be empathetic, clear, and concise

Important guidelines:
- Never diagnose conditions or prescribe medications
- Always include disclaimers about consulting healthcare professionals
- Provide evidence-based information
- Use simple, non-technical language when possible
- If unsure, recommend consulting a doctor

Remember: You are an educational tool, not a replacement for medical professionals.`;

// @desc    Chat with AI health advisor
// @route   POST /api/chat
// @access  Public
export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message, conversationHistory } = req.body;

        if (!message) {
            res.status(400).json({
                success: false,
                message: 'Message is required',
            });
            return;
        }

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            res.status(503).json({
                success: false,
                message: 'AI service is not configured. Please add OPENAI_API_KEY to environment variables.',
            });
            return;
        }

        // Prepare messages for OpenAI
        const messages: any[] = [
            { role: 'system', content: SYSTEM_PROMPT },
        ];

        // Add conversation history if provided
        if (conversationHistory && Array.isArray(conversationHistory)) {
            messages.push(...conversationHistory);
        }

        // Add current message
        messages.push({ role: 'user', content: message });

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

        res.status(200).json({
            success: true,
            message: aiResponse,
            conversationId: completion.id,
            disclaimer: 'This information is for educational purposes only. Always consult a healthcare professional for medical advice.',
        });
    } catch (error: any) {
        console.error('OpenAI API Error:', error);

        // Handle specific OpenAI errors
        if (error.status === 401) {
            res.status(503).json({
                success: false,
                message: 'AI service authentication failed. Please check API key configuration.',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error communicating with AI service',
            error: error.message,
        });
    }
};

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        // In a production app, you would store chat history in the database
        // For now, we'll return a placeholder response
        res.status(200).json({
            success: true,
            message: 'Chat history feature coming soon',
            data: [],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching chat history',
            error: error.message,
        });
    }
};
