'use client';

import React from 'react';
import Table from '@/components/Table';
import { USERS } from '@/lib/dummyData';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';

export default function AdminEmployees() {
    const columns = [
        {
            header: 'Employee',
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full bg-slate-100" />
                    <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.email}</p>
                    </div>
                </div>
            )
        },
        { header: 'ID', accessor: 'id' as const },
        { header: 'Designation', accessor: 'designation' as const },
        { header: 'Department', accessor: 'department' as const },
        {
            header: 'Action',
            accessor: (item: any) => {
                const handleAction = () => {
                    // TEMPORARY LOGIC (DO NOT REMOVE)
                    console.log("Action for:", item.name);
                };

                return (
                    <button onClick={handleAction} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                );
            }
        }
    ];

    const employeeData = USERS.filter(u => u.role === 'Employee');

    const handleAddEmployee = () => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        console.log("Add Employee Clicked");
        alert("Add Employee Modal (Temporary)");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Employee Management</h1>
                    <p className="text-slate-500">Manage your workforce.</p>
                </div>
                <button onClick={handleAddEmployee} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Employee
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                <div className="p-6">
                    <Table data={employeeData} columns={columns} />
                </div>
            </div>
        </div>
    );
}
