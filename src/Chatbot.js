// src/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css';

const products = [
  { id: 1, name: 'Laptop', price: '$1000' },
  { id: 2, name: 'Smartphone', price: '$800' },
  { id: 3, name: 'Headphones', price: '$150' },
];

const Cart = [];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you with your shopping today?', sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: userInput, sender: 'user' },
    ];

    const botResponse = generateBotResponse(userInput);
    newMessages.push({ text: botResponse, sender: 'bot' });

    setMessages(newMessages);
    setUserInput('');
  };

  // Generate bot responses based on user input
  const generateBotResponse = (input) => {
    const cleanedInput = input.toLowerCase().trim();

    if (cleanedInput.includes('laptop') || cleanedInput.includes('product')) {
      return 'We have a laptop available for $1000. Would you like to add it to your cart?';
    }

    if (cleanedInput.includes('smartphone')) {
      return 'We have a smartphone available for $800. Would you like to add it to your cart?';
    }

    if (cleanedInput.includes('headphones')) {
      return 'We have headphones available for $150. Would you like to add it to your cart?';
    }

    if (cleanedInput.includes('order')) {
        return 'If you have any querys regarding orders kindly contact our customer support number - 9874532160/ 121-2534689';
      }

    if (cleanedInput.includes('cart')) {
      return `Your cart contains: ${Cart.length > 0 ? Cart.map(item => item.name).join(', ') : 'nothing.'} Would you like to checkout?`;
    }

    if (cleanedInput.includes('yes')) {
      return handleAddToCart(cleanedInput);
    }

    if (cleanedInput.includes('no')) {
      return 'Okay, let me know if you need anything else.';
    }

    return "I'm sorry, I didn't understand that. Can you please ask something else?";
  };

  const handleAddToCart = (input) => {
    // Check if the user is asking to add an item to the cart
    if (input.toLowerCase().includes('laptop')) {
      Cart.push(products[0]);
      return 'Laptop added to your cart!';
    } else if (input.toLowerCase().includes('smartphone')) {
      Cart.push(products[1]);
      return 'Smartphone added to your cart!';
    } else if (input.toLowerCase().includes('headphones')) {
      Cart.push(products[2]);
      return 'Headphones added to your cart!';
    }
    return "I'm sorry, I couldn't add that item to your cart.";
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Organic</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about products or your cart..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
