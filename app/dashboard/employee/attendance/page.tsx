'use client';

import React from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { ATTENDANCE } from '@/lib/dummyData';
import { Clock, MapPin } from 'lucide-react';

export default function EmployeeAttendance() {
    const columns = [
        { header: 'Date', accessor: 'date' },
        { header: 'Check In', accessor: 'checkIn' },
        { header: 'Check Out', accessor: 'checkOut' },
        {
            header: 'Status',
            accessor: (item: any) => <Badge status={item.status} />
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
                    <p className="text-slate-500">Track your daily attendance and work hours.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check In Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Check In</h2>
                    <p className="text-slate-500 text-sm mb-4">You haven't checked in yet today.</p>
                    <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                        Check In Now
                    </button>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>Office Location Detected</span>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                        <p className="text-emerald-600 text-sm font-medium mb-1">Present Days</p>
                        <p className="text-2xl font-bold text-emerald-800">18</p>
                    </div>
                    <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                        <p className="text-rose-600 text-sm font-medium mb-1">Absences</p>
                        <p className="text-2xl font-bold text-rose-800">2</p>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                        <p className="text-amber-600 text-sm font-medium mb-1">Late Arrivals</p>
                        <p className="text-2xl font-bold text-amber-800">1</p>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <p className="text-blue-600 text-sm font-medium mb-1">Total Hours</p>
                        <p className="text-2xl font-bold text-blue-800">142h</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="font-bold text-slate-900">Attendance History</h3>
                </div>
                <div className="p-6">
                    <Table data={ATTENDANCE} columns={columns} />
                </div>
            </div>
        </div>
    );
}
