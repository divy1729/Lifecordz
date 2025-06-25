import React, { useState } from 'react';
import DonorChatbot from './DonorChatbot';
import WhatsAppButton from './WhatsAppButton';

const fabStyle = {
  position: 'fixed',
  bottom: 100, // move chatbot icon above WhatsApp
  right: 32,
  zIndex: 2001, // above WhatsApp
  background: '#1976d2',
  color: '#fff',
  border: '4px solid #fff', // white border for visibility
  borderRadius: '50%',
  width: 56,
  height: 56,
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  cursor: 'pointer',
};

const whatsappFabStyle = {
  position: 'fixed',
  bottom: 32,
  right: 32,
  zIndex: 2000,
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.2)',
  zIndex: 1999,
};

const dialogStyle = {
  position: 'fixed',
  bottom: 170,
  right: 32,
  zIndex: 2001,
  background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.18)',
  padding: 0,
  minWidth: 370,
  maxWidth: 400,
  minHeight: 420,
  maxHeight: 520,
  overflow: 'hidden',
  border: '2px solid #1976d2',
  display: 'flex',
  flexDirection: 'column',
};

const ChatbotFab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <div style={overlayStyle} onClick={() => setOpen(false)} />}
      {open && (
        <div style={dialogStyle}>
          <DonorChatbot dialogMode />
        </div>
      )}
      <button style={fabStyle} onClick={() => setOpen(o => !o)} aria-label="Open chatbot">
        <span role="img" aria-label="chatbot">💬</span>
      </button>
      <div style={whatsappFabStyle}>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ChatbotFab;
