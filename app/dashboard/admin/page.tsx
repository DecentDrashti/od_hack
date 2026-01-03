import React from 'react';
import StatCard from '@/components/StatCard';
import { Users, Calendar, AlertCircle, DollarSign, ArrowRight } from 'lucide-react';
import { STATISTICS } from '@/lib/dummyData';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500">Overview of company HR metrics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Employees"
                    value={STATISTICS.admin.totalEmployees}
                    icon={Users}
                    description="Across 4 departments"
                />
                <StatCard
                    title="Pending Leaves"
                    value={STATISTICS.admin.pendingLeaves}
                    icon={Calendar}
                    description="Requires approval"
                />
                <StatCard
                    title="On Leave Today"
                    value={STATISTICS.admin.onLeaveToday}
                    icon={AlertCircle}
                    description="3 Sick, 1 Planned"
                />
                <StatCard
                    title="Total Payroll"
                    value={STATISTICS.admin.totalPayroll}
                    icon={DollarSign}
                    description="For April 2024"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Actions */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Actions</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">Leave Requests</p>
                                    <p className="text-sm text-slate-500">5 pending requests</p>
                                </div>
                            </div>
                            <Link href="/dashboard/admin/leaves" className="px-4 py-2 bg-white text-slate-600 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                Review
                            </Link>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">New Onboarding</p>
                                    <p className="text-sm text-slate-500">2 candidates ready</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white text-slate-600 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats / Charts placeholder */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center items-center text-center">
                    <div className="w-full h-32 bg-slate-50 rounded-lg flex items-center justify-center mb-4 border border-slate-100 border-dashed">
                        <span className="text-slate-400 text-sm">Attendance Trend Chart Placeholder</span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-xs">
                        Overall attendance is holding steady at 92% this month.
                    </p>
                </div>
            </div>
        </div>
    );
}
