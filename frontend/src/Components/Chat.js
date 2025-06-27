import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { chatAPI } from '../api';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI tutor. I'm here to help you learn and understand difficult concepts. What would you like to study today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatAPI.ask(inputMessage);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container">
      <section className="section section-chat">
        <div className="card chat-card">
          <div className="card-header chat-header flex-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="card-title">AI Tutor Chat</span>
            </div>
            <span className="badge badge-success">Online</span>
          </div>
          <div className="card-body chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.type === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}`}> 
                <div className="flex items-center gap-2 mb-1">
                  <span className={`avatar avatar-xs ${message.type === 'ai' ? 'avatar-ai' : 'avatar-user'}`}>{message.type === 'ai' ? <Bot size={16} /> : <User size={16} />}</span>
                  <span className="bubble-sender text-xs font-semibold">{message.type === 'ai' ? 'AI Tutor' : 'You'}</span>
                  <span className="bubble-time text-xs text-muted">{formatTime(message.timestamp)}</span>
                </div>
                <div className="bubble-content">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bubble-ai typing-indicator">
                <div className="typing-dots">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
                <span className="ml-2 text-muted">AI is thinking…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="card-footer chat-input-row flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your studies..."
              className="input input-lg flex-1"
              disabled={isLoading}
              aria-label="Type your message"
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-lg flex items-center gap-1"
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Chat;
