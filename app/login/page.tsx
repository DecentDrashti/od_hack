'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<'employee' | 'admin'>('employee');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TEMPORARY LOGIC (DO NOT REMOVE)
        setTimeout(() => {
            setIsLoading(false);
            alert("Logged in successfully (temporary)");
            // Simple role-based redirect for demo
            if (role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/employee');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 border border-slate-100">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-200">
                        <span className="font-bold text-xl">D</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                    <p className="text-slate-500 mt-2">Sign in to your Dayflow account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Role Selector */}
                    <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('employee')}
                            className={`flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${role === 'employee'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${role === 'admin'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Admin / HR
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    defaultValue={role === 'admin' ? 'admin@dayflow.com' : 'alex@dayflow.com'}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-slate-700">Password</label>
                                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    defaultValue="password"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
