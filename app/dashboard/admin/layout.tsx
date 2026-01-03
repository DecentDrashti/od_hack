'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { USERS } from '@/lib/dummyData';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = USERS.find(u => u.role === 'Admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                role="admin"
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
            />
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'md:ml-20'}`}>
                <Navbar
                    userName={admin?.name || 'Admin'}
                    userRole="HR Manager"
                    avatarUrl={admin?.avatar || ''}
                    toggleSidebar={toggleSidebar}
                />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
