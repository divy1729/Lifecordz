import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const DonorChatbot = ({ dialogMode }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything about stem cell banking.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    try {
      // Prepare history (exclude initial greeting if present)
      const history = messages.length > 0 && messages[0].sender === 'bot' && messages[0].text.startsWith('Hi!')
        ? messages.slice(1)
        : messages;
      const response = await axios.post(`${API_BASE}/ai/donor-query`, {
        question: input,
        history: Array.isArray(history) ? history : []
      });
      // The backend returns { answer: ... },
      setMessages(msgs => [...msgs, { sender: 'bot', text: response.data.answer }]);
    } catch (error) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, there was an error. Please try again.' }]);
      console.error('Error in chatbot:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div
      style={{
        maxWidth: dialogMode ? '100%' : 400,
        minWidth: dialogMode ? 350 : undefined,
        minHeight: dialogMode ? 400 : undefined,
        background: dialogMode ? 'transparent' : '#fafafa',
        border: dialogMode ? 'none' : '1px solid #ccc',
        borderRadius: dialogMode ? 0 : 8,
        padding: dialogMode ? 0 : 16,
        display: 'flex',
        flexDirection: 'column',
        height: dialogMode ? 520 : undefined,
      }}
    >
      <div style={{
        background: 'linear-gradient(90deg, #1976d2 0%, #e91e63 100%)',
        color: '#fff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        padding: '14px 20px',
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: 1,
        marginBottom: 0,
      }}>
        Donor Chatbot
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 200,
          maxHeight: 340,
          margin: '0 0 8px 0',
          overflowY: 'auto',
          background: '#f5f7fa',
          padding: '16px 12px 8px 12px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{
              background: msg.sender === 'user' ? '#e0f7fa' : '#e8eaf6',
              color: '#222',
              padding: '8px 16px',
              borderRadius: 18,
              display: 'inline-block',
              fontSize: 15,
              boxShadow: msg.sender === 'user' ? '0 1px 4px #b2ebf2' : '0 1px 4px #c5cae9',
              maxWidth: 260,
              wordBreak: 'break-word',
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#888', textAlign: 'left', margin: '8px 0' }}>
          <span style={{ fontSize: 18 }}>🤖</span> <span className="blinking">Thinking...</span>
        </div>}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: '#fff', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #bdbdbd', fontSize: 15, background: '#f9f9f9' }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '10px 20px',
            borderRadius: 10,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 15,
            boxShadow: '0 2px 8px #1976d233'
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default DonorChatbot;
