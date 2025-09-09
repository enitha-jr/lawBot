import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import InputField from '../components/InputField'
import authServices from '../services/authService';
import { setAuth } from '../store/authSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { handleSubmit, register } = useForm();
    useEffect(() => {
        dispatch(setAuth({}))
    }, [dispatch])
    
    const [error, setError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        setIsLoading(true)
        
        const response = await authServices.login({ username, password })
        if (response) {
            dispatch(setAuth(response))
            navigate('/')
        } else {
            setError(true)
        }
        setIsLoading(false)
    }

    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex overflow-hidden w-screen">
            {/* Left Side - Branding/Info Panel */}
            <div className="flex-1 relative flex flex-col justify-center items-center p-16 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0l-2 2-2-2v4h4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0L4 2 2 0v4h4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-24 w-24 h-24 bg-purple-400/10 rounded-full blur-lg animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-indigo-400/10 rounded-full blur-md animate-pulse delay-500"></div>
                
                <div className="relative z-10 text-center max-w-lg">
                    {/* Large Logo */}
                    <div className="mb-12">
                        <div className="relative mx-auto w-32 h-32 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 rounded-3xl rotate-6 opacity-80 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 flex items-center justify-center shadow-2xl">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.75V17h2v10.75c5.16-1.01 9-5.2 9-10.75V7l-10-5zM12 4.18L19 7.82v9.18c0 4.25-2.71 7.49-7 8.35V15h2v-2h-4v2h2v2.35C6.71 16.49 4 13.25 4 9V7.82l8-3.64z"/>
                                    <path d="M9 10h6v2H9z"/>
                                </svg>
                            </div>
                        </div>
                        
                        <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
                            LegalBot
                        </h1>
                        
                        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-8"></div>
                    </div>
                    
                    {/* Feature List */}
                    <div className="space-y-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-xl">AI-Powered Legal Research</h3>
                                <p className="text-white/60">Advanced algorithms for comprehensive case analysis</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-xl">Secure & Confidential</h3>
                                <p className="text-white/60">Bank-level encryption for all your legal data</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-xl">Lightning Fast Results</h3>
                                <p className="text-white/60">Get instant answers to complex legal questions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-[600px] flex items-center justify-center p-16 bg-black/20 backdrop-blur-xl border-l border-white/10">
                <div className="w-full max-w-md space-y-8">
                    {/* Form Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-white/60 text-lg">Sign in to access your legal assistant</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-8">
                        {/* Username Field */}
                        <div className="group space-y-3">
                            <label className="block text-sm font-semibold text-white/90 ml-2 uppercase tracking-wider">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <svg className="h-6 w-6 text-white/40 group-focus-within:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                                    placeholder="Enter your username"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/5 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group space-y-3">
                            <label className="block text-sm font-semibold text-white/90 ml-2 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <svg className="h-6 w-6 text-white/40 group-focus-within:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-16 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center group/toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-6 w-6 text-white/40 hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 text-white/40 hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/5 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-500/10 border-2 border-red-400/30 backdrop-blur-sm rounded-2xl p-5 text-center animate-shake">
                                <div className="flex items-center justify-center space-x-3">
                                    <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-red-200 font-semibold text-lg">Invalid credentials. Please try again.</span>
                                </div>
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isLoading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl hover:shadow-blue-500/25 group text-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="relative">
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                    <span className="text-xl">Authenticating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-3">
                                    <span className="text-xl">Sign In to Dashboard</span>
                                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-6">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-white/60 uppercase tracking-wider">Secure Connection Established</span>
                        </div>
                        <p className="text-white/40 text-sm">
                            Protected by enterprise-grade security • All data encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage