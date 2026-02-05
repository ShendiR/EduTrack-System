import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react'; // Instalo lucide-react nese se ke

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7247/api/auth/login', {
                email: email,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', 'Admin');
                window.location.href = '/';
            }
        } catch (err) {
            setError(err.response?.data || "Email ose Password i gabuar!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden">
            {/* Background Decorations - Per t'iu pershtatur stilit te resortit */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-50"></div>

            <div className="w-full max-w-md p-4 z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[32px] p-10">
                    {/* Logo & Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-serif italic text-[#D4A373] mb-2 tracking-tight">
                            Elite Resort
                        </h1>
                        <p className="text-slate-400 font-medium text-sm uppercase tracking-[3px]">
                            Management System
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl text-center font-medium animate-in fade-in zoom-in duration-300">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail size={20} />
                                </span>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock size={20} />
                                </span>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Hyr në Sistem
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-400 text-xs font-medium">
                        © 2026 Elite Resort System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;