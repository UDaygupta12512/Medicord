'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Settings, User, Shield, Moon, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Settings className="w-8 h-8 text-gray-400" />
                            Settings
                        </h1>
                        <p className="text-gray-400">Manage your account and preferences.</p>
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

                <div className="max-w-3xl space-y-8">
                    {/* Profile Section */}
                    <section className="glass-dark p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Profile Information
                        </h2>
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 rounded-full gradient-medical flex items-center justify-center text-2xl font-bold">
                                U
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                        <input type="text" defaultValue="User Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                                        <input type="email" defaultValue="user@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50" />
                                    </div>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm font-medium transition-colors">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="glass-dark p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-purple-400" />
                            App Preferences
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Moon className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-medium">Dark Mode</div>
                                        <div className="text-sm text-gray-400">Toggle dark theme</div>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <div className="font-medium">Language</div>
                                        <div className="text-sm text-gray-400">English (US)</div>
                                    </div>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Change</button>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="glass-dark p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            Security
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-left">
                                <span className="font-medium">Change Password</span>
                                <span className="text-gray-400 text-sm">Last changed 3 months ago</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-left">
                                <span className="font-medium">Two-Factor Authentication</span>
                                <span className="text-green-400 text-sm">Enabled</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
