import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-white flex flex-col">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                        <span className="text-xl font-bold">AI Health Advisor</span>
                        <div className="w-24"></div>
                    </div>
                </div>
            </nav>

            {/* Chat Area */}
            <div className="flex-1 pt-24 pb-24 px-4 max-w-4xl mx-auto w-full flex flex-col">
                <div className="flex-1 space-y-6 overflow-y-auto">
                    {/* Welcome Message */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center flex-shrink-0">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="glass-dark border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                            <p className="text-gray-200">
                                Hello! I'm your AI Health Advisor. I can help you understand your medicines, check for interactions, or answer general health questions. How can I assist you today?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 w-full bg-gray-900/80 backdrop-blur-xl border-t border-white/10 p-4">
                <div className="max-w-4xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Ask about a medicine or health concern..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <button className="absolute right-2 top-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </main>
    );
}
