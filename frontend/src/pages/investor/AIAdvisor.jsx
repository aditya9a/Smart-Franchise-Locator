import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/common/Navbar";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function AIAdvisor() {
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hello! I'm your Smart Franchise Advisor. How can I help you today? You can ask about franchises in specific cities, categories, or within a budget." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const response = await api.post("/ai/chat", { message: userMsg });
            setMessages(prev => [...prev, { role: "ai", content: response.data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    const suggestions = [
        "Food franchises in Mumbai",
        "Best ROI under 20 Lakhs",
        "Fitness brands in Delhi",
        "How can I join a pool?"
    ];

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg overflow-hidden" style={{ height: "650px", borderRadius: "20px" }}>
                            {/* Chat Header */}
                            <div className="p-4 text-white d-flex align-items-center" style={{ backgroundColor: "#0f766e" }}>
                                <div className="bg-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
                                    <i className="bi bi-robot text-teal" style={{ fontSize: "24px", color: "#0f766e" }}></i>
                                </div>
                                <div>
                                    <h5 className="mb-0 fw-bold">AI Franchise Advisor</h5>
                                    <small className="opacity-75">Online | Smart Recommendations</small>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="card-body p-4 overflow-auto bg-light" style={{ height: "calc(100% - 150px)" }}>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`d-flex mb-4 ${msg.role === 'user' ? 'justify-content-end' : ''}`}>
                                        <div
                                            className={`p-3 rounded-4 shadow-sm ${msg.role === 'user' ? 'bg-teal text-white' : 'bg-white text-dark'}`}
                                            style={{
                                                maxWidth: "80%",
                                                backgroundColor: msg.role === 'user' ? "#0f766e" : "white",
                                                borderBottomRightRadius: msg.role === 'user' ? "4px" : "20px",
                                                borderBottomLeftRadius: msg.role === 'ai' ? "4px" : "20px"
                                            }}
                                        >
                                            <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="d-flex mb-3">
                                        <div className="bg-white p-3 rounded-4 shadow-sm text-muted">
                                            <div className="spinner-grow spinner-grow-sm me-1" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm me-1" role="status"></div>
                                            <div className="spinner-grow spinner-grow-sm" role="status"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggestions & Input */}
                            <div className="p-3 bg-white border-top">
                                {messages.length === 1 && (
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {suggestions.map(s => (
                                            <button
                                                key={s}
                                                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                                onClick={() => setInput(s)}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <form onSubmit={handleSend} className="d-flex gap-2">
                                    <input
                                        type="text"
                                        className="form-control rounded-pill px-4"
                                        placeholder="Ask about budget, city, or categories..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-teal rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "45px", height: "45px", backgroundColor: "#0f766e", color: "white" }}
                                        disabled={loading}
                                    >
                                        <i className="bi bi-send-fill"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Link to="/investor/dashboard" className="text-decoration-none text-muted small">
                                <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
