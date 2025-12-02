'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

export default function SchedulePage() {
    const schedule = [
        { time: '08:00 AM', med: 'Amoxicillin', dose: '500mg', status: 'taken' },
        { time: '09:00 AM', med: 'Vitamin D', dose: '1000IU', status: 'taken' },
        { time: '01:00 PM', med: 'Ibuprofen', dose: '400mg', status: 'pending' },
        { time: '08:00 PM', med: 'Amoxicillin', dose: '500mg', status: 'pending' },
    ];

    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Calendar className="w-8 h-8 text-green-500" />
                            Schedule
                        </h1>
                        <p className="text-gray-400">Track your medication timeline.</p>
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

                <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold">Today, Dec 1</h2>
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">Day</button>
                            <button className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400 text-sm font-medium">Week</button>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {schedule.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 group">
                                <div className="w-24 text-right text-gray-400 font-mono text-sm">{item.time}</div>
                                <div className="relative flex-1">
                                    <div className="absolute left-0 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-700 border-2 border-gray-900 group-hover:bg-blue-500 transition-colors"></div>
                                    <div className="ml-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-white">{item.med}</h3>
                                            <p className="text-sm text-gray-400">{item.dose}</p>
                                        </div>
                                        {item.status === 'taken' ? (
                                            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                                <CheckCircle2 className="w-5 h-5" />
                                                Taken
                                            </div>
                                        ) : (
                                            <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm font-medium transition-colors">
                                                Mark as Taken
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
