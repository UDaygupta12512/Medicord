import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Pill,
    Calendar,
    Bell,
    Settings,
    LogOut,
    BookHeart
} from 'lucide-react';

export default function Sidebar() {
    // We can use usePathname to highlight the active link if we want, 
    // but for now let's just stick to the structure.

    return (
        <aside className="w-64 glass-dark border-r border-white/10 hidden md:flex flex-col fixed h-full">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-medical flex items-center justify-center">
                        <Pill className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Medicord</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                    Overview
                </Link>
                <Link href="/dashboard/medicines" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Pill className="w-5 h-5" />
                    My Medicines
                </Link>
                <Link href="/dashboard/schedule" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Calendar className="w-5 h-5" />
                    Schedule
                </Link>
                <Link href="/dashboard/journal" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <BookHeart className="w-5 h-5" />
                    Health Journal
                </Link>
                <Link href="/dashboard/reminders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    Reminders
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
            </nav>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
