import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import services from "../services/services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/authSlice";
import { LuSend } from "react-icons/lu";
import { FaFileUpload, FaCheck } from "react-icons/fa";

function ChatPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const token = auth.token;

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            content:
                "Hello! I'm LegalBot, your AI-powered legal assistant. You can ask questions or upload a document for summary.",
            timestamp: new Date(Date.now() - 60000),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    const messagesEndRef = useRef(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    // Scroll chat to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    // Send message to backend
    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: "user",
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            const data = await services.getAIResponse(inputValue, uploadedFileName);
            console.log("AI Response Data:", data);
            
            const botMessage = {
                id: Date.now() + 1,
                type: "bot",
                content: data?.reply || "Sorry, I couldn’t generate a response.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            const errorMessage = {
                id: Date.now() + 2,
                type: "bot",
                content: "Something went wrong. Please try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Send on Enter key
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleFileUpload = async () => {
        if (!file) return alert("Please select a file first!");
        setIsTyping(true);
        try {
            const userMessage = {
                id: Date.now(),
                type: "user",
                content: `**File uploaded:** ${file.name}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);

            const res = await services.uploadFile(file);
            if (res?.summary) {
                const summaryMsg = {
                    id: Date.now() + 1,
                    type: "bot",
                    content: `**Summary:**\n\n${res.summary}`,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, summaryMsg]);
                setUploadedFileName(file.filename);
                setFile(null);
            }
            setIsTyping(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file");
        }
    };
    const handleLogout = () => {
        dispatch(setAuth({}));
        navigate("/login");
    };

    const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return (
        <div className="h-screen w-screen flex flex-col bg-[#1a2b3c]">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#142232] border-b border-gray-700">
                <h1 className="text-white text-xl font-semibold">
                     LegalBot ⚖️ Hello {auth.username}!
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Logout
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xl px-6 py-4 rounded-3xl shadow-lg ${m.type === "user"
                                ? "bg-gray-300 text-gray-900"
                                : "bg-gray-100 text-gray-800"
                                }`}
                        >

                            <ReactMarkdown components={{ p: "span" }}>{m.content}</ReactMarkdown>

                            <span className="text-xs text-gray-400 mt-1 block">
                                {formatTime(m.timestamp)}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start items-center space-x-3">
                        <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-6 border-t border-gray-700 bg-[#1a2b3c] flex items-center space-x-2">

                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about law or your uploaded file..."
                    className="flex-1 bg-gray-900 text-white rounded-2xl px-6 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="1"
                    disabled={isTyping}
                />

                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center disabled:opacity-50"
                >
                    <LuSend className="text-white w-5 h-5" />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <button
                    onClick={() => {
                        if (!file) fileInputRef.current.click();
                        else handleFileUpload();
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${file ? "bg-violet-500" : "bg-green-600"
                        }`}
                    disabled={isTyping}
                >
                    <FaFileUpload className="text-white w-5 h-5" />
                </button>

                {file && (
                    <span className="text-sm text-gray-300 truncate max-w-[180px]">
                        {file.name}
                    </span>
                )}
            </div>


        </div>
    );
}

export default ChatPage;