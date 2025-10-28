import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import authServices from '../services/authService';
import { setAuth } from '../store/authSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        dispatch(setAuth({}));
    }, [dispatch]);

    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setIsLoading(true);
        const response = await authServices.login({ username, password });
        if (response) {
            dispatch(setAuth(response));
            navigate('/');
        } else {
            setError(true);
        }
        setIsLoading(false);
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-[#1a2b3c]">
            {/* Left Side - Branding */}
            <div className="flex-1 flex flex-col justify-center items-center p-16 relative overflow-hidden bg-gradient-to-br from-[#1a2b3c] via-[#223548] to-[#1f3a56]">
                {/* Floating Shapes */}
                <div className="absolute top-10 left-10 w-28 h-28 bg-blue-700/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-700/20 rounded-full blur-2xl animate-pulse delay-500"></div>

                <div className="relative z-10 text-center max-w-md">
                    <div className="mb-12">
                        <div className="relative mx-auto w-28 h-28 mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl rotate-6 opacity-80 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-5 flex items-center justify-center shadow-2xl">
                                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.75V17h2v10.75c5.16-1.01 9-5.2 9-10.75V7l-10-5zM12 4.18L19 7.82v9.18c0 4.25-2.71 7.49-7 8.35V15h2v-2h-4v2h2v2.35C6.71 16.49 4 13.25 4 9V7.82l8-3.64z"/>
                                    <path d="M9 10h6v2H9z"/>
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-5xl font-black text-white mb-4">LegalBot</h1>
                        <p className="text-blue-200/80">AI-powered Legal Assistant</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="space-y-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">AI Legal Research</h3>
                                <p className="text-white/60 text-sm">Comprehensive case & document analysis</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Secure & Confidential</h3>
                                <p className="text-white/60 text-sm">Bank-level encryption for all your legal data</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Fast Results</h3>
                                <p className="text-white/60 text-sm">Instant answers to complex legal queries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-[600px] flex items-center justify-center p-16 bg-[#162338]/50 backdrop-blur-xl border-l border-white/10">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-white">Welcome Back</h2>
                        <p className="text-white/60 text-lg">Sign in to access your legal assistant</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Username */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white/90">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-[#223548]/50 text-white placeholder-white/40 border border-white/20 focus:border-blue-500 focus:bg-[#223548]/70 transition"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-3 relative">
                        <label className="block text-sm font-semibold text-white/90">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-[#223548]/50 text-white placeholder-white/40 border border-white/20 focus:border-blue-500 focus:bg-[#223548]/70 transition"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-center font-medium">Invalid credentials. Try again.</p>}

                    {/* Submit */}
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-bold hover:scale-105 transition-transform disabled:opacity-50"
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
