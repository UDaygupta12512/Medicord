import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ArrowRight, ThumbsUp, TrendingDown } from 'lucide-react';

export default function SubstitutesPage() {
    // Mock data for substitutes
    const popularSubstitutes = [
        {
            original: 'Panadol',
            substitute: 'Paracetamol Generic',
            savings: '40%',
            rating: 4.8
        },
        {
            original: 'Viagra',
            substitute: 'Sildenafil',
            savings: '85%',
            rating: 4.9
        },
        {
            original: 'Lipitor',
            substitute: 'Atorvastatin',
            savings: '60%',
            rating: 4.7
        }
    ];

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
                        <span className="text-xl font-bold">Find Substitutes</span>
                        <div className="w-24"></div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Save Money on Your <span className="text-gradient">Medicines</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Find generic alternatives with the same active ingredients and efficacy, but at a fraction of the cost.
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
                            <Search className="w-6 h-6 text-gray-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Enter medicine name to find substitutes..."
                                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-400 text-lg"
                            />
                            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all">
                                Find
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popular Substitutes */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-8">Popular Savings</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {popularSubstitutes.map((item, index) => (
                            <div key={index} className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Original</div>
                                        <div className="font-semibold text-lg">{item.original}</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-500 mt-3" />
                                    <div className="text-right">
                                        <div className="text-sm text-green-400 mb-1">Substitute</div>
                                        <div className="font-semibold text-lg text-green-300">{item.substitute}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                                        <TrendingDown className="w-4 h-4" />
                                        <span className="font-bold">{item.savings} Cheaper</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="text-sm">{item.rating}</span>
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
