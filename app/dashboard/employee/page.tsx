'use client';

import React, { useState } from 'react';
import StatCard from '@/components/StatCard';
import { CheckCircle, Clock, Calendar, Bell } from 'lucide-react';
import { ATTENDANCE, STATISTICS } from '@/lib/dummyData';

import { useRouter } from 'next/navigation';

// import { apiRequest } from '@/lib/api';

export default function EmployeeDashboard() {
    const router = useRouter();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [attendanceHistory, setAttendanceHistory] = useState(ATTENDANCE);

    /*
    // 🔌 REAL API (UNCOMMENT TO ACTIVATE)
    // useEffect(() => {
    //     const fetchHistory = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) return;
    //             const history = await apiRequest('/api/Attendance/my-history', 'GET', null, token);
    //             setAttendanceHistory(history);
                    
    //             // Sync button state based on today's record
    //             // const today = new Date().toISOString().split('T')[0]; // Simple date check
    //             // const todayRecord = history.find(r => r.date === today);
    //             // if (todayRecord) {
    //             //    if (todayRecord.checkIn && !todayRecord.checkOut) setIsCheckedIn(true);
    //             //    if (todayRecord.checkOut) { setIsCheckedIn(false); // Disable button logic needed }
    //             // }
    //         } catch (error) {
    //             console.error('Failed to fetch history:', error);
    //         }
    //     };
    //     fetchHistory();
    // }, []);
    */

    const handleCheckIn = async () => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        setIsCheckedIn(!isCheckedIn);

        /*
        // 🔌 REAL API (UNCOMMENT TO ACTIVATE)
        try {
            const token = localStorage.getItem('token');
            if (isCheckedIn) {
                // Check Out
                await apiRequest('/api/Attendance/check-out', 'POST', null, token);
                setIsCheckedIn(false);
            } else {
                // Check In
                await apiRequest('/api/Attendance/check-in', 'POST', null, token);
                setIsCheckedIn(true);
            }
            // Refresh history
            // const history = await apiRequest('/api/Attendance/my-history', 'GET', null, token);
            // setAttendanceHistory(history);
        } catch (error) {
            console.error(error);
            // alert("Action failed"); 
        }
        */
    };

    const handleApplyLeave = () => {
        // TODO: Redirect or Open Modal
        router.push('/dashboard/employee/leave');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Alex!</p>
                </div>
                <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Attendance"
                    value={STATISTICS.employee.attendance}
                    icon={CheckCircle}
                    description="This month"
                />
                <StatCard
                    title="Leave Balance"
                    value={STATISTICS.employee.leaveBalance}
                    icon={Calendar}
                    description="Remaining days"
                />
                <StatCard
                    title="Next Holiday"
                    value="May 27"
                    icon={Clock}
                    description="Memorial Day"
                />
                <StatCard
                    title="Notifications"
                    value="3"
                    icon={Bell}
                    description="Unread messages"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity / Attendance */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recent Attendance</h2>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                    </div>
                    <div className="space-y-4">
                        {attendanceHistory.slice(0, 3).map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{record.date}</p>
                                        <p className="text-sm text-slate-500">{record.status === 'Present' ? `Checked in at ${record.checkIn}` : 'Absent'}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                    }`}>
                                    {record.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-12 -mb-12"></div>

                    <h2 className="text-lg font-bold mb-2 relative z-10">Quick Actions</h2>
                    <p className="text-indigo-100 text-sm mb-6 relative z-10">Manage your daily tasks efficiently.</p>

                    <div className="space-y-3 relative z-10">
                        <button
                            onClick={handleCheckIn}
                            className="w-full bg-white/20 hover:bg-white/30 border border-white/20 backdrop-blur-sm p-3 rounded-lg text-left transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-3" />
                                <span className="font-medium">{isCheckedIn ? "Web Check-out" : "Web Check-in"}</span>
                            </div>
                            {isCheckedIn && <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded text-white">Active</span>}
                        </button>
                        <button
                            onClick={handleApplyLeave}
                            className="w-full bg-white/20 hover:bg-white/30 border border-white/20 backdrop-blur-sm p-3 rounded-lg text-left transition-all flex items-center"
                        >
                            <Calendar className="w-5 h-5 mr-3" />
                            <span className="font-medium">Apply for Leave</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
