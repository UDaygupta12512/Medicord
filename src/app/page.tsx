import Link from 'next/link';
import { Search, Pill, Brain, Shield, Users, Sparkles, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center">
                                <Pill className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Medicord</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
                            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                            <Link href="/search" className="px-6 py-2 rounded-full gradient-medical text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-blue-500/30 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300">AI-Powered Healthcare Companion</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Your Intelligent
                            <br />
                            <span className="text-gradient">Medicine Companion</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Discover detailed medicine information, find affordable substitutes, check drug interactions,
                            and get AI-powered health advice — all in one place.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                                <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
                                    <Search className="w-6 h-6 text-gray-400 ml-4" />
                                    <input
                                        type="text"
                                        placeholder="Search for any medicine..."
                                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-gray-400 text-lg"
                                    />
                                    <Link href="/search" className="px-6 py-3 rounded-xl gradient-medical text-white font-semibold hover:shadow-lg transition-all">
                                        Search
                                    </Link>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-3">
                                Try: "Paracetamol", "Ibuprofen", "Amoxicillin"
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                { number: '50K+', label: 'Medicines' },
                                { number: '1M+', label: 'Users' },
                                { number: '99.9%', label: 'Accuracy' },
                                { number: '24/7', label: 'AI Support' },
                            ].map((stat, index) => (
                                <div key={index} className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                                    <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Powerful Features for Your Health
                        </h2>
                        <p className="text-xl text-gray-400">
                            Everything you need to make informed healthcare decisions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: 'Medicine Information',
                                description: 'Search and discover detailed information about any medicine including composition, manufacturer, price, and availability.',
                                color: 'from-blue-500 to-cyan-500',
                            },
                            {
                                icon: Pill,
                                title: 'Substitute Finder',
                                description: 'Find cheaper or more available alternatives with similar composition and efficacy, ranked by similarity and ratings.',
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                icon: Brain,
                                title: 'AI Health Advisor',
                                description: 'Get instant answers about side effects, dosages, and drug interactions from our AI-powered chatbot.',
                                color: 'from-purple-500 to-pink-500',
                            },
                            {
                                icon: Shield,
                                title: 'Interaction Checker',
                                description: 'Check for potential drug interactions and contraindications when taking multiple medicines.',
                                color: 'from-orange-500 to-red-500',
                            },
                            {
                                icon: Users,
                                title: 'Community Reviews',
                                description: 'Read real experiences from other users and share your own insights about medicines.',
                                color: 'from-cyan-500 to-blue-500',
                            },
                            {
                                icon: Star,
                                title: 'Personalized Dashboard',
                                description: 'Save favorites, track prescriptions, set dosage reminders, and manage your health journey.',
                                color: 'from-yellow-500 to-orange-500',
                            },
                        ].map((feature, index) => {
                            const linkMap: { [key: string]: string } = {
                                'Medicine Information': '/search',
                                'Substitute Finder': '/substitutes',
                                'AI Health Advisor': '/chat',
                                'Interaction Checker': '/interactions',
                                'Community Reviews': '#',
                                'Personalized Dashboard': '/dashboard'
                            };

                            return (
                                <Link
                                    href={linkMap[feature.title] || '#'}
                                    key={index}
                                    className="group relative glass-dark rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 block"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur transition duration-300"
                                        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>

                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                                    <div className="mt-6 flex items-center text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Learn more <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            How Medicord Works
                        </h2>
                        <p className="text-xl text-gray-400">
                            Simple, fast, and intelligent
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Search Medicine',
                                description: 'Enter the medicine name or describe your symptoms. Our AI will help you find what you need.',
                            },
                            {
                                step: '02',
                                title: 'Get Insights',
                                description: 'View detailed information, substitutes, interactions, and AI-generated explanations.',
                            },
                            {
                                step: '03',
                                title: 'Make Decisions',
                                description: 'Compare options, read reviews, and make informed healthcare decisions with confidence.',
                            },
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                <div className="glass-dark rounded-2xl p-8 border border-white/10 h-full">
                                    <div className="text-6xl font-bold text-gradient mb-6 opacity-50">{step.step}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8 text-blue-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="glass-dark rounded-3xl p-12 border border-white/10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Trusted by Healthcare Professionals
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                            Our data is verified and sourced from trusted medical databases including OpenFDA, RxNorm, and leading pharmaceutical sources.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Verified Data', 'HIPAA Compliant', 'AI-Powered', 'Always Updated'].map((badge, index) => (
                                <div key={index} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-white font-semibold">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative glass-dark rounded-3xl p-12 border border-white/20">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Join thousands of users making smarter healthcare decisions
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/search" className="px-8 py-4 rounded-full gradient-medical text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all">
                                    Start Searching
                                </Link>
                                <Link href="/chat" className="px-8 py-4 rounded-full glass border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all">
                                    Try AI Advisor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg gradient-medical flex items-center justify-center">
                                    <Pill className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">Medicord</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your AI-powered medicine companion for smarter healthcare decisions.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
                                <li><Link href="/substitutes" className="hover:text-white transition-colors">Substitutes</Link></li>
                                <li><Link href="/chat" className="hover:text-white transition-colors">AI Advisor</Link></li>
                                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2025 Medicord. All rights reserved. This is for educational purposes only.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
