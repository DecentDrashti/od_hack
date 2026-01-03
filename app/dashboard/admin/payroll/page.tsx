'use client';

import React, { useState } from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { PAYROLL } from '@/lib/dummyData';
import { Download, Edit } from 'lucide-react';

export default function AdminPayroll() {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRunPayroll = async () => {
        setIsProcessing(true);

        // TEMPORARY LOGIC (DO NOT REMOVE)
        setTimeout(() => {
            setIsProcessing(false);
        }, 1500);
    };

    const handleEdit = (id: number) => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        console.log(`Editing payroll for ID: ${id}`);
    };

    const handleDownload = (id: number) => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        console.log(`Downloading payslip for ID: ${id}`);
    };

    const columns = [
        { header: 'Employee ID', accessor: 'employeeId' as const },
        { header: 'Month', accessor: 'month' as const },
        { header: 'Basic', accessor: (item: any) => `$${item.basic}` },
        { header: 'Allowances', accessor: (item: any) => `$${item.allowances}` },
        { header: 'Deductions', accessor: (item: any) => `$${item.deductions}` },
        { header: 'Net Salary', accessor: (item: any) => <span className="font-bold text-slate-900">${item.net}</span> },
        {
            header: 'Status',
            accessor: (item: any) => <Badge status={item.status} />
        },
        {
            header: 'Action',
            accessor: (item: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDownload(item.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-indigo-600 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Payroll Management</h1>
                    <p className="text-slate-500">Manage salaries and generate payslips.</p>
                </div>
                <button
                    onClick={handleRunPayroll}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                    {isProcessing ? 'Processing...' : 'Run Payroll'}
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6">
                    <Table data={PAYROLL} columns={columns} />
                </div>
            </div>
        </div>
    );
}
