'use client';

import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Camera, Save, X } from 'lucide-react';
import { USERS } from '@/lib/dummyData';

export default function EmployeeProfile() {
    const user = USERS.find(u => u.id === 'EMP001');
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatar(url);
        }
    };

    const handleSave = () => {
        // TEMPORARY LOGIC (DO NOT REMOVE)
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6 gap-6">
                        <div className="relative group">
                            <img
                                src={avatar}
                                alt={user?.name}
                                className={`w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white object-cover ${isEditing ? 'cursor-pointer hover:opacity-90' : ''}`}
                                onClick={handleImageClick}
                            />
                            {isEditing && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={handleImageClick}
                                >
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex-1 pt-2">
                            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                            <p className="text-slate-500 font-medium">{user?.designation} • {user?.department}</p>
                        </div>

                        {isEditing ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors flex items-center"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-indigo-200"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">

                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Personal Information
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                    {isEditing ? (
                                        <input type="text" defaultValue={user?.name} className="w-full mt-1 p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                                    ) : (
                                        <p className="font-medium text-slate-800">{user?.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <p className="font-medium text-slate-800">{user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        {isEditing ? (
                                            <input type="text" defaultValue="+1 (555) 123-4567" className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                                        ) : (
                                            <p className="font-medium text-slate-800">+1 (555) 123-4567</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {isEditing ? (
                                            <input type="text" defaultValue="123 Tech Park, Silicon Valley, CA" className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                                        ) : (
                                            <p className="font-medium text-slate-800">123 Tech Park, Silicon Valley, CA</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employment Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-500" />
                                Employment Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Employee ID</label>
                                    <p className="font-medium text-slate-800">{user?.id}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</label>
                                    <p className="font-medium text-slate-800">{user?.department}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Designation</label>
                                    <p className="font-medium text-slate-800">{user?.designation}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date of Joining</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <p className="font-medium text-slate-800">{user?.joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
