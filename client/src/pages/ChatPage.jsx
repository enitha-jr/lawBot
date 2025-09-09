import { useState, useRef, useEffect } from 'react';

function ChatPage() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Hello! I\'m LegalBot Pro, your AI-powered legal assistant. I can help you with legal research, document analysis, case law references, and general legal questions. How can I assist you today?',
            timestamp: new Date(Date.now() - 60000)
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: 'Thank you for your question. Based on legal precedents and current regulations, I can provide you with comprehensive guidance. This is a demo response - in the actual implementation, this would connect to your legal AI service.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const quickActions = [
        "Contract Review",
        "Legal Research",
        "Case Law Analysis", 
        "Document Drafting",
        "Compliance Check",
        "Patent Search"
    ];

    const recentChats = [
        { id: 1, title: "Contract Review - NDA", date: "Today", active: true },
        { id: 2, title: "Employment Law Query", date: "Yesterday", active: false },
        { id: 3, title: "Intellectual Property", date: "2 days ago", active: false },
        { id: 4, title: "Corporate Compliance", date: "1 week ago", active: false },
    ];

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex overflow-hidden">
            {/* Sidebar */}
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col`}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {!sidebarCollapsed && (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.75V17h2v10.75c5.16-1.01 9-5.2 9-10.75V7l-10-5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-white font-bold text-lg">LegalBot Pro</h1>
                                    <p className="text-white/60 text-xs">AI Legal Assistant</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {!sidebarCollapsed && (
                    <>
                        {/* New Chat Button */}
                        <div className="p-4">
                            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>New Consultation</span>
                            </button>
                        </div>

                        {/* Recent Chats */}
                        <div className="flex-1 overflow-y-auto px-4">
                            <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">Recent Conversations</h3>
                            <div className="space-y-2">
                                {recentChats.map(chat => (
                                    <div key={chat.id} className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${chat.active ? 'bg-blue-600/20 border border-blue-500/30' : 'hover:bg-white/5'}`}>
                                        <h4 className="text-white font-medium text-sm truncate">{chat.title}</h4>
                                        <p className="text-white/50 text-xs mt-1">{chat.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">JD</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium text-sm">John Doe</p>
                                    <p className="text-white/50 text-xs">Senior Partner</p>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Legal Consultation</h2>
                            <p className="text-white/60 mt-1">AI-powered legal assistance • Secure & Confidential</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white/60 text-sm">Online</span>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-4xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-4`}>
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
                                    {message.type === 'user' ? (
                                        <span className="text-white font-semibold text-sm">JD</span>
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.75V17h2v10.75c5.16-1.01 9-5.2 9-10.75V7l-10-5z"/>
                                        </svg>
                                    )}
                                </div>
                                
                                {/* Message Content */}
                                <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-6 py-4 rounded-2xl ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'} shadow-lg`}>
                                        <p className="text-base leading-relaxed">{message.content}</p>
                                    </div>
                                    <span className="text-white/50 text-xs mt-2">{formatTime(message.timestamp)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.75V17h2v10.75c5.16-1.01 9-5.2 9-10.75V7l-10-5z"/>
                                    </svg>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                    <div className="px-8 py-4">
                        <h3 className="text-white/80 font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputValue(action)}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white p-3 rounded-xl transition-all duration-200 text-sm font-medium"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-6">
                    <div className="relative">
                        <textarea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about law, legal procedures, or case analysis..."
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 pr-16 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 resize-none min-h-[60px] max-h-32"
                            rows="1"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="absolute right-3 bottom-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-white/40 text-xs mt-3 text-center">
                        Press Enter to send • Shift+Enter for new line • All conversations are encrypted and confidential
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;