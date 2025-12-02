'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';

export default function RemindersPage() {
    const reminders = [
        { id: 1, title: 'Morning Meds', time: '08:00 AM', days: 'Daily', active: true },
        { id: 2, title: 'Drink Water', time: 'Every 2 hours', days: 'Daily', active: true },
        { id: 3, title: 'Doctor Appointment', time: '10:00 AM', days: 'Dec 5', active: false },
    ];

    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Bell className="w-8 h-8 text-yellow-500" />
                            Reminders
                        </h1>
                        <p className="text-gray-400">Manage your notifications and alerts.</p>
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

                <div className="flex justify-end mb-6">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-medical font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                        <Plus className="w-4 h-4" />
                        New Reminder
                    </button>
                </div>

                <div className="space-y-4">
                    {reminders.map((reminder) => (
                        <div key={reminder.id} className="glass-dark p-6 rounded-2xl border border-white/10 flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reminder.active ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/20 text-gray-500'
                                    }`}>
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${!reminder.active && 'text-gray-500'}`}>{reminder.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span>{reminder.time}</span>
                                        <span>•</span>
                                        <span>{reminder.days}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={reminder.active} readOnly className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
