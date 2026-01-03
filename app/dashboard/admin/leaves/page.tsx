'use client';

import React from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { LEAVES } from '@/lib/dummyData';
import { Check, X } from 'lucide-react';

export default function AdminLeaves() {
    const columns = [
        { header: 'Employee ID', accessor: 'employeeId' as const },
        { header: 'Type', accessor: 'type' as const },
        { header: 'From', accessor: 'from' as const },
        { header: 'To', accessor: 'to' as const },
        { header: 'Reason', accessor: 'reason' as const },
        {
            header: 'Status',
            accessor: (item: any) => <Badge status={item.status} />
        },
        {
            header: 'Action',
            accessor: (item: any) => {
                const handleApprove = () => {
                    // TEMPORARY LOGIC (DO NOT REMOVE)
                    console.log("Approved leave for:", item.employeeId);
                    alert("Leave Approved (Temporary)");
                };

                const handleReject = () => {
                    // TEMPORARY LOGIC (DO NOT REMOVE)
                    console.log("Rejected leave for:", item.employeeId);
                    alert("Leave Rejected (Temporary)");
                };

                return (
                    <div className="flex items-center gap-2">
                        <button onClick={handleApprove} className="p-1.5 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                        </button>
                        <button onClick={handleReject} className="p-1.5 bg-rose-50 text-rose-600 rounded hover:bg-rose-100 transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Leave Approvals</h1>
                <p className="text-slate-500">Review and manage employee leave requests.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6">
                    <Table data={LEAVES} columns={columns} />
                </div>
            </div>
        </div>
    );
}
