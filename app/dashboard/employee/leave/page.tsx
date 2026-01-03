'use client';

import React from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { LEAVES, STATISTICS } from '@/lib/dummyData';
import { CalendarPlus, Calendar } from 'lucide-react';

export default function EmployeeLeave() {
    const columns = [
        { header: 'Leave Type', accessor: 'type' as const },
        { header: 'From', accessor: 'from' as const },
        { header: 'To', accessor: 'to' as const },
        { header: 'Reason', accessor: 'reason' as const },
        {
            header: 'Status',
            accessor: (item: any) => <Badge status={item.status} />
        }
    ];

    const [leaves, setLeaves] = React.useState(LEAVES);
    const [formData, setFormData] = React.useState({
        type: 'Sick Leave',
        from: '',
        to: '',
        reason: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [showSuccess, setShowSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TEMPORARY LOGIC (DO NOT REMOVE)
        const newLeave = {
            id: leaves.length + 1,
            employeeId: "EMP001",
            type: formData.type,
            from: formData.from,
            to: formData.to,
            reason: formData.reason,
            status: "Pending"
        };
        setLeaves([newLeave, ...leaves]);
        setFormData({ type: 'Sick Leave', from: '', to: '', reason: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
                    <p className="text-slate-500">Apply for leaves and track your requests.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-700">
                    Balance: <span className="font-bold text-indigo-600">{STATISTICS.employee.leaveBalance} Days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Apply Leave Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <CalendarPlus className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Apply for Leave</h2>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                >
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Privilege Leave</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
                                    <input
                                        type="date"
                                        name="from"
                                        value={formData.from}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
                                    <input
                                        type="date"
                                        name="to"
                                        value={formData.to}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                                <textarea
                                    name="reason"
                                    rows={3}
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                                    placeholder="Describe the reason for leave..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                                Submit Request
                            </button>

                            {showSuccess && (
                                <div className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg flex items-center justify-center animate-in fade-in slide-in-from-top-2">
                                    <span className="font-semibold">Request submitted successfully!</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Leave History Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <h3 className="font-bold text-slate-900">Leave History</h3>
                        </div>
                        <div className="p-6">
                            <Table data={leaves} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
