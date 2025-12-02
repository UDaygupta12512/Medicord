'use client';

import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Pill,
    Calendar,
    Bell,
    Settings,
    LogOut,
    Plus,
    Clock,
    CheckCircle2
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Welcome back, User</h1>
                        <p className="text-gray-400">Here's your health overview for today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                            <Bell className="w-5 h-5 text-gray-400" />
                        </button>
                        <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center font-bold">
                            U
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-dark p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                                <Pill className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold">12</span>
                        </div>
                        <h3 className="text-gray-400">Active Medicines</h3>
                    </div>
                    <div className="glass-dark p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold">85%</span>
                        </div>
                        <h3 className="text-gray-400">Adherence Rate</h3>
                    </div>
                    <div className="glass-dark p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                                <Clock className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-gray-400">Pending Today</h3>
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="glass-dark rounded-2xl border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Today's Schedule</h2>
                        <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                            <Plus className="w-4 h-4" />
                            Add Reminder
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { time: '08:00 AM', med: 'Amoxicillin', dose: '500mg', taken: true },
                            { time: '01:00 PM', med: 'Vitamin D', dose: '1000IU', taken: false },
                            { time: '08:00 PM', med: 'Amoxicillin', dose: '500mg', taken: false },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-mono text-gray-400">{item.time}</div>
                                    <div>
                                        <div className="font-semibold text-white">{item.med}</div>
                                        <div className="text-sm text-gray-500">{item.dose}</div>
                                    </div>
                                </div>
                                <button className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${item.taken
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-600 hover:border-green-500 hover:text-green-500'
                                    }`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
