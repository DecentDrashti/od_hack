'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, Wallet, FileText, Settings, LogOut, CheckCircle, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

type SidebarProps = {
    role: 'employee' | 'admin';
    isOpen: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
};

const Sidebar = ({ role, isOpen, toggleSidebar, isMobile }: SidebarProps) => {
    const pathname = usePathname();

    const employeeLinks = [
        { name: 'Dashboard', href: '/dashboard/employee', icon: LayoutDashboard },
        { name: 'Attendance', href: '/dashboard/employee/attendance', icon: CheckCircle },
        { name: 'Leaves', href: '/dashboard/employee/leave', icon: CalendarDays },
        { name: 'Payroll', href: '/dashboard/employee/payroll', icon: Wallet },
        { name: 'Profile', href: '/dashboard/employee/profile', icon: Users },
    ];

    const adminLinks = [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Employees', href: '/dashboard/admin/employees', icon: Users },
        { name: 'Attendance', href: '/dashboard/admin/attendance', icon: CheckCircle },
        { name: 'Leaves', href: '/dashboard/admin/leaves', icon: CalendarDays },
        { name: 'Payroll', href: '/dashboard/admin/payroll', icon: Wallet },
    ];

    const links = role === 'admin' ? adminLinks : employeeLinks;

    // Mobile Overlay
    if (isMobile && !isOpen) return null;

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`
                bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-30 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-20'}
                ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
            `}>
                {/* Desktop Toggle Button */}
                {!isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        {isOpen ? (
                            <ChevronLeft className="w-3 h-3" />
                        ) : (
                            <ChevronRight className="w-3 h-3" />
                        )}
                    </button>
                )}

                <div className="h-16 flex items-center border-b border-slate-200 px-6">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    {isOpen && (
                        <span className="ml-3 text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap overflow-hidden">
                            Dayflow
                        </span>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 overflow-x-hidden">
                    {isOpen && (
                        <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                            Menu
                        </div>
                    )}
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    } ${!isOpen && 'justify-center'}`}
                                title={!isOpen ? link.name : ''}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'} ${isOpen ? 'mr-3' : ''}`} />
                                {isOpen && <span className="whitespace-nowrap overflow-hidden">{link.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Link
                        href="/login"
                        className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors ${!isOpen && 'justify-center'}`}
                        title={!isOpen ? 'Sign Out' : ''}
                    >
                        <LogOut className={`w-5 h-5 shrink-0 ${isOpen ? 'mr-3' : ''}`} />
                        {isOpen && <span className="whitespace-nowrap">Sign Out</span>}
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
