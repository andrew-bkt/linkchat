import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

interface ChatWindowProps {
  token: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ token }) => {
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2"></div>
            )}
            <div className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
              <p>{msg.content}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 ml-2"></div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2"></div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <p className="animate-pulse">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex w-full">
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
  );
};

export default ChatWindow;