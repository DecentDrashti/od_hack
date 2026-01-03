'use client';

import React from 'react';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import { PAYROLL } from '@/lib/dummyData';
import { Wallet, Download, DollarSign } from 'lucide-react';

export default function EmployeePayroll() {
    const columns = [
        { header: 'Month', accessor: 'month' },
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
            accessor: () => (
                <button className="p-2 hover:bg-slate-100 rounded-lg text-indigo-600 transition-colors">
                    <Download className="w-4 h-4" />
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Payroll</h1>
                <p className="text-slate-500">View your salary slips and payment history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg shadow-indigo-200">
                    <p className="text-indigo-100 font-medium mb-1">Last Salary Credited</p>
                    <div className="flex items-center gap-1 mb-4">
                        <span className="text-3xl font-bold">$6,000</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs">April</span>
                    </div>
                    <div className="text-sm text-indigo-100 opacity-80">Credited on May 1st, 2024</div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-slate-400" />
                    <h3 className="font-bold text-slate-900">Salary History</h3>
                </div>
                <div className="p-6">
                    <Table data={PAYROLL} columns={columns} />
                </div>
            </div>
        </div>
    );
}
