'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { USERS } from '@/lib/dummyData';

export default function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = USERS.find(u => u.id === 'EMP001');
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
                role="employee"
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
            />
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'md:ml-20'}`}>
                <Navbar
                    userName={user?.name || 'Employee'}
                    userRole="Employee"
                    avatarUrl={user?.avatar || ''}
                    toggleSidebar={toggleSidebar}
                />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
