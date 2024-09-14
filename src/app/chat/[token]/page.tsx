// src/app/chat/[token]/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../services/api';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

export default function ChatPage() {
  const { token } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages([...messages, { sender: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post(`/api/v1/chatbots/${token}/chat`, { message: userMessage });
      const botMessage = response.data.reply;
      setMessages((prev) => [...prev, { sender: 'bot', content: botMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white p-4">
          <h1 className="text-2xl font-bold">Chat</h1>
        </div>
        <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2"></div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-800 border border-gray-300'
                }`}
              >
                <p>{msg.content}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 ml-2"></div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2"></div>
              <div className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg">
                <p className="animate-pulse">Typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 border-t border-gray-200">
          <div className="flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
