import React from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Filter } from 'lucide-react';

export default function SearchPage() {
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
                        <span className="text-xl font-bold">Search Medicines</span>
                        <div className="w-24"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-6 max-w-7xl mx-auto">
                {/* Search Header */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="relative group mb-6">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
                            <Search className="w-6 h-6 text-gray-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Search for medicines, substitutes, or symptoms..."
                                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-400 text-lg"
                                autoFocus
                            />
                            <button className="px-6 py-3 rounded-xl gradient-medical text-white font-semibold hover:shadow-lg transition-all">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 justify-center">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10 hover:bg-white/5 transition-colors">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                        <button className="px-4 py-2 rounded-full glass-dark border border-white/10 hover:bg-white/5 transition-colors">
                            Generic
                        </button>
                        <button className="px-4 py-2 rounded-full glass-dark border border-white/10 hover:bg-white/5 transition-colors">
                            Branded
                        </button>
                    </div>
                </div>

                {/* Results Placeholder */}
                <div className="text-center text-gray-400 mt-20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <Search className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Searching</h3>
                    <p>Enter a medicine name to see detailed information and substitutes.</p>
                </div>
            </div>
        </main>
    );
}
