import React from 'react';

type Column<T> = {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
};

function Table<T extends { id: string | number }>({ data, columns }: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm text-slate-600 bg-white">
                <thead className="bg-slate-50 text-slate-700 font-medium uppercase text-xs border-b border-slate-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                {columns.map((col, idx) => (
                                    <td key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(item)
                                            : (item[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-400">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
