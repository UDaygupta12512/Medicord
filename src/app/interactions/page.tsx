'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function InteractionCheckerPage() {
    const [medicines, setMedicines] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [interactions, setInteractions] = useState<any[] | null>(null);

    const handleAddMedicine = () => {
        if (inputValue.trim() && !medicines.includes(inputValue.trim())) {
            setMedicines([...medicines, inputValue.trim()]);
            setInputValue('');
            setInteractions(null); // Reset results when list changes
        }
    };

    const handleRemoveMedicine = (med: string) => {
        setMedicines(medicines.filter(m => m !== med));
        setInteractions(null);
    };

    const checkInteractions = () => {
        // Mock interaction check logic
        if (medicines.length < 2) return;

        // Simulate API call/processing
        setTimeout(() => {
            // Mock result: Randomly generate an interaction for demo purposes
            // In a real app, this would query an API
            const hasInteraction = Math.random() > 0.5;
            if (hasInteraction) {
                setInteractions([
                    {
                        severity: 'high',
                        title: 'Potential Serious Interaction',
                        description: `Interaction found between ${medicines[0]} and ${medicines[1] || 'others'}. May cause increased drowsiness or other side effects.`,
                        recommendation: 'Consult your doctor before taking these together.'
                    }
                ]);
            } else {
                setInteractions([]);
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                        <span className="text-xl font-bold">Interaction Checker</span>
                        <div className="w-24"></div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Check Drug Interactions</h1>
                    <p className="text-gray-400">Add two or more medicines to check for potential interactions and contraindications.</p>
                </div>

                {/* Input Section */}
                <div className="glass-dark rounded-2xl p-8 border border-white/10 mb-8">
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddMedicine()}
                            placeholder="Enter medicine name (e.g., Aspirin)"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <button
                            onClick={handleAddMedicine}
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add
                        </button>
                    </div>

                    {/* Medicine List */}
                    <div className="flex flex-wrap gap-3 mb-8 min-h-[50px]">
                        {medicines.length === 0 && (
                            <p className="text-gray-500 italic w-full text-center">No medicines added yet.</p>
                        )}
                        {medicines.map((med, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                                <span>{med}</span>
                                <button onClick={() => handleRemoveMedicine(med)} className="text-gray-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={checkInteractions}
                        disabled={medicines.length < 2}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${medicines.length < 2
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'gradient-medical text-white hover:shadow-lg'
                            }`}
                    >
                        Check Interactions
                    </button>
                </div>

                {/* Results Section */}
                {interactions !== null && (
                    <div className="animate-slide-up">
                        {interactions.length > 0 ? (
                            interactions.map((interaction, index) => (
                                <div key={index} className="glass-dark rounded-2xl p-8 border border-red-500/30 bg-red-500/5 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{interaction.title}</h3>
                                            <p className="text-gray-300 mb-4">{interaction.description}</p>
                                            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                                                <span className="font-semibold text-red-400">Recommendation:</span>
                                                <span className="text-gray-300 ml-2">{interaction.recommendation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="glass-dark rounded-2xl p-8 border border-green-500/30 bg-green-500/5 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No Interactions Found</h3>
                                <p className="text-gray-400">
                                    Based on our database, there are no known interactions between these medicines.
                                    However, always consult your healthcare provider.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
