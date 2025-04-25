// src/FloatingChatButton.js
import React, { useState } from 'react';
import Chatbot from './Chatbot';
import './FloatingChatButton.css';

const FloatingChatButton = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const closeChatbot = () => {
    setIsChatbotVisible(false);
  };

  return (
    <div>
      {/* Floating Button */}
      <button className="floating-chat-button" onClick={toggleChatbot}>
        🗨️ 
      </button>

      {/* Chatbot Popup */}
      {isChatbotVisible && (
        <div className="chatbot-popup">
          {/* Close Button */}
          <button className="close-chatbot-btn" onClick={closeChatbot}>
            ❌
          </button>

          {/* Chatbot Component */}
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;
