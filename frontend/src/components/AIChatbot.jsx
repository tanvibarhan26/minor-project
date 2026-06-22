import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Welcome to DataCleanse.AI. Upload your CSV and I’ll help clean your data instantly.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getAIResponse(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('clean') || q.includes('how')) return "To clean your data, just drag your CSV into the upload zone above. I'll automatically detect duplicates and missing values!";
    if (q.includes('price') || q.includes('cost')) return "We have a free Starter tier! Pro plans start at $29/mo for unlimited high-speed cleaning.";
    if (q.includes('secure') || q.includes('privacy')) return "Your data is encrypted with AES-256. We never store your raw data after processing is complete.";
    return "I'm your DataCleanse assistant. I can help you with CSV formatting, duplicate detection, and intelligent data insights. What can I do for you today?";
  };

  return (
    <div className={`ai-chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle glass-panel" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <img src="/logo.png" alt="Logo" className="chat-toggle-logo" />}
        {!isOpen && <span className="notification-dot"></span>}
      </button>

      {isOpen && (
        <div className="chatbot-window glass-panel">
          <div className="chatbot-header">
            <div className="bot-info">
              <div className="bot-avatar">
                <img src="/logo.png" alt="Bot Logo" className="chat-avatar-logo" />
                <div className="online-indicator"></div>
              </div>
              <div>
                <h4>DataCleanse Assistant</h4>
                <span className="bot-status">Always Online • Powered by AI</span>
              </div>
            </div>
            <button className="btn-icon-small" onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.type}`}>
                <div className="message-bubble">
                  {msg.type === 'bot' && <Sparkles size={12} className="sparkle-icon" />}
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-row bot">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask anything about your data..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn-send">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
