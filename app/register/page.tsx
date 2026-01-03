'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<'employee' | 'admin'>('employee');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TEMPORARY LOGIC (DO NOT REMOVE)
        setTimeout(() => {
            setIsLoading(false);
            alert("Account created successfully (temporary)");
            router.push('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 border border-slate-100">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-200">
                        <span className="font-bold text-xl">D</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join Dayflow HRMS today</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl mb-4">
                        <button
                            type="button"
                            onClick={() => setRole('employee')}
                            className={`flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${role === 'employee'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${role === 'admin'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Admin / HR
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    {role === 'employee' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="EMP-001"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98] mt-4"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                Create Account <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
