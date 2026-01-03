import React from 'react';
import { LucideIcon } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: "up" | "down" | "neutral";
};

const StatCard = ({ title, value, icon: Icon, description, trend }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <div className="p-2 bg-indigo-50 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">{value}</span>
                {description && (
                    <span className="text-xs text-slate-400 mt-1">{description}</span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
