import React from 'react';

type BadgeProps = {
    status: string;
};

const Badge = ({ status }: BadgeProps) => {
    const getStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
            case 'paid':
            case 'present':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'pending':
            case 'half day':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'rejected':
            case 'absent':
            case 'unpaid':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles(status)}`}>
            {status}
        </span>
    );
};

export default Badge;
