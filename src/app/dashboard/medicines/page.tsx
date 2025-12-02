'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Pill, Plus, Search } from 'lucide-react';

export default function MedicinesPage() {
    const medicines = [
        { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', remaining: 12 },
        { id: 2, name: 'Vitamin D', dosage: '1000IU', frequency: 'Once daily', remaining: 45 },
        { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', remaining: 20 },
    ];

    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Pill className="w-8 h-8 text-blue-500" />
                            My Medicines
                        </h1>
                        <p className="text-gray-400">Manage your prescriptions and supplements.</p>
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

                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-medical font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                        <Plus className="w-4 h-4" />
                        Add Medicine
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicines.map((med) => (
                        <div key={med.id} className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                    <Pill className="w-6 h-6" />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${med.remaining < 15 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                    }`}>
                                    {med.remaining} left
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{med.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{med.dosage}</p>

                            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
                                <span>{med.frequency}</span>
                                <button className="text-blue-400 hover:text-blue-300">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
