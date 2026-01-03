import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, LogOut, User, Settings, Lock, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ChangePasswordModal from './ChangePasswordModal';

type NavbarProps = {
    userName: string;
    userRole: string;
    avatarUrl: string;
    toggleSidebar: () => void;
};

const Navbar = ({ userName, userRole, avatarUrl, toggleSidebar }: NavbarProps) => {
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfile = () => {
        if (isNotificationOpen) setIsNotificationOpen(false);
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleNotification = () => {
        if (isProfileOpen) setIsProfileOpen(false);
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleMyProfile = () => {
        // TODO: Navigate to profile page API
        router.push('/dashboard/employee/profile');
        setIsProfileOpen(false);
    };

    const handleSignOut = async () => {
        setIsProfileOpen(false);

        // TEMPORARY LOGIC (DO NOT REMOVE)
        alert("Signed out successfully (temporary)");
        router.push('/login');
    };

    const handleNotificationClick = async () => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        console.log("Notification clicked");
    };

    const handleMarkAllRead = async () => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        setNotificationCount(0);
    };

    const handleChangePasswordClick = () => {
        setIsProfileOpen(false);
        setIsChangePasswordOpen(true);
    };

    return (
        <>
            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />

            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">

                {/* Sidebar Toggle (Mobile & Desktop) */}
                <div className="flex md:hidden items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 mr-4 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center w-96 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {/* Notification Dropdown */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={toggleNotification}
                            className={`relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all ${isNotificationOpen ? 'text-indigo-600 bg-indigo-50' : ''}`}
                        >
                            <Bell className="w-5 h-5" />
                            {notificationCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                            )}
                        </button>

                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-2 border-b border-slate-50 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                                    {notificationCount > 0 && (
                                        <button
                                            onClick={handleMarkAllRead}
                                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>
                                <div className="py-2">
                                    {[
                                        { text: "Leave request approved", time: "2 hours ago", icon: "✅" },
                                        { text: "Attendance marked successfully", time: "5 hours ago", icon: "⏰" },
                                        { text: "Payroll updated for this month", time: "1 day ago", icon: "💰" }
                                    ].map((notif, idx) => (
                                        <button
                                            key={idx}
                                            onClick={handleNotificationClick}
                                            className="w-full px-4 py-3 hover:bg-slate-50 flex items-start gap-3 transition-colors text-left"
                                        >
                                            <span className="text-xl">{notif.icon}</span>
                                            <div>
                                                <p className="text-sm text-slate-800 font-medium">{notif.text}</p>
                                                <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-px bg-slate-200 mx-2"></div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={toggleProfile}
                            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-full pr-4 transition-colors"
                        >
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-semibold text-slate-800 leading-tight">{userName}</p>
                                <p className="text-xs text-slate-500 font-medium">{userRole}</p>
                            </div>
                            <img
                                src={avatarUrl}
                                alt={userName}
                                className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm"
                            />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-slate-50 md:hidden">
                                    <p className="text-sm font-semibold text-slate-800">{userName}</p>
                                    <p className="text-xs text-slate-500">{userRole}</p>
                                </div>

                                <button
                                    onClick={handleMyProfile}
                                    className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    My Profile
                                </button>
                                <button
                                    onClick={() => console.log("Settings clicked")}
                                    className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    Account Settings
                                </button>
                                <button
                                    onClick={handleChangePasswordClick}
                                    className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                >
                                    <Lock className="w-4 h-4" />
                                    Change Password
                                </button>
                                <div className="my-1 border-t border-slate-50"></div>
                                <button
                                    onClick={() => console.log("Help clicked")}
                                    className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Need Help?
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
