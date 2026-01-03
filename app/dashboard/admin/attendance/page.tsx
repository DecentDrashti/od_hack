'use client';

import React from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { ATTENDANCE } from '@/lib/dummyData';
import { CalendarDays } from 'lucide-react';

export default function AdminAttendance() {
    const columns = [
        { header: 'Employee ID', accessor: 'employeeId' as const },
        { header: 'Date', accessor: 'date' as const },
        { header: 'Check In', accessor: 'checkIn' as const },
        { header: 'Check Out', accessor: 'checkOut' as const },
        {
            header: 'Status',
            accessor: (item: any) => <Badge status={item.status} />
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Attendance Overview</h1>
                <p className="text-slate-500">Monitor daily employee attendance.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays className="w-5 h-5" />
                        <span className="font-medium">Daily Logs</span>
                    </div>
                    <input
                        type="date"
                        className="p-2 border border-slate-200 rounded-lg text-sm"
                        onChange={(e) => {
                            // TEMPORARY LOGIC (DO NOT REMOVE)
                            console.log("Date selected:", e.target.value);
                        }}
                    />
                </div>
                <div className="p-6">
                    <Table data={ATTENDANCE} columns={columns} />
                </div>
            </div>
        </div>
    );
}
