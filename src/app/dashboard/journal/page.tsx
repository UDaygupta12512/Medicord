'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, BookHeart, Save, Droplets, Moon, Smile, Meh, Frown, Angry, Zap } from 'lucide-react';

export default function JournalPage() {
    const [mood, setMood] = useState('neutral');
    const [sleep, setSleep] = useState(7);
    const [water, setWater] = useState(4);
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        // In a real app, this would save to the backend
        alert('Journal entry saved!');
        setNotes('');
        setMood('neutral');
    };

    const moods = [
        { id: 'happy', icon: Smile, color: 'text-green-400', label: 'Happy' },
        { id: 'energetic', icon: Zap, color: 'text-yellow-400', label: 'Energetic' },
        { id: 'neutral', icon: Meh, color: 'text-gray-400', label: 'Neutral' },
        { id: 'sad', icon: Frown, color: 'text-blue-400', label: 'Sad' },
        { id: 'stressed', icon: Angry, color: 'text-red-400', label: 'Stressed' },
    ];

    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <BookHeart className="w-8 h-8 text-pink-500" />
                            Health Journal
                        </h1>
                        <p className="text-gray-400">Track your daily well-being and symptoms.</p>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Entry Form */}
                    <div className="glass-dark p-6 rounded-2xl border border-white/10 space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">How are you feeling?</h2>
                            <div className="flex justify-between gap-2">
                                {moods.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMood(m.id)}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${mood === m.id
                                                ? 'bg-white/10 border border-white/20 scale-105'
                                                : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <m.icon className={`w-8 h-8 ${m.color}`} />
                                        <span className="text-xs text-gray-400">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-blue-400">
                                    <Moon className="w-5 h-5" />
                                    <span className="font-medium">Sleep</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold">{sleep}</span>
                                    <span className="text-gray-400 mb-1">hours</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="12"
                                    step="0.5"
                                    value={sleep}
                                    onChange={(e) => setSleep(parseFloat(e.target.value))}
                                    className="w-full mt-4 accent-blue-500"
                                />
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                                    <Droplets className="w-5 h-5" />
                                    <span className="font-medium">Water</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold">{water}</span>
                                    <span className="text-gray-400 mb-1">glasses</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => setWater(Math.max(0, water - 1))}
                                        className="flex-1 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => setWater(water + 1)}
                                        className="flex-1 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Notes & Symptoms</h2>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Describe any symptoms or thoughts..."
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full py-4 rounded-xl gradient-medical font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Entry
                        </button>
                    </div>

                    {/* Recent Entries */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">Recent Entries</h2>

                        <div className="glass-dark p-6 rounded-2xl border border-white/10 space-y-4">
                            {[
                                { date: 'Today, 9:00 AM', mood: 'Energetic', sleep: 7.5, water: 2, notes: 'Feeling great after a morning run.' },
                                { date: 'Yesterday, 10:30 PM', mood: 'Tired', sleep: 6, water: 5, notes: 'Headache in the evening.' },
                                { date: 'Nov 29, 8:00 AM', mood: 'Neutral', sleep: 8, water: 1, notes: 'Normal day.' },
                            ].map((entry, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm text-gray-400">{entry.date}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium bg-white/10 ${entry.mood === 'Energetic' ? 'text-yellow-400' :
                                                entry.mood === 'Tired' ? 'text-blue-400' : 'text-gray-400'
                                            }`}>
                                            {entry.mood}
                                        </span>
                                    </div>
                                    <p className="text-white mb-3">{entry.notes}</p>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Moon className="w-3 h-3" /> {entry.sleep}h
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Droplets className="w-3 h-3" /> {entry.water}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
