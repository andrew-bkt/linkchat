// frontend/src/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { PaperAirplaneIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';


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
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages(prevMessages => [...prevMessages, { sender: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      const response = await api.post(`/api/v1/chatbots/${token}/chat`, 
        { message: userMessage },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      const botMessage = response.data.reply;
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', content: botMessage }]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      let errorMessage = 'An error occurred while sending the message.';
      if (error.name === 'AbortError') {
        errorMessage = 'The request timed out. Please try again.';
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.data.detail || error.response.statusText}`;
      } else if (error.message === 'timeout of 60000ms exceeded') {
        errorMessage = 'The request timed out. Please try again.';
      }

      setError(errorMessage);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600">No messages yet. Start the conversation!</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg shadow p-3 ${
              msg.sender === 'user' ? 'bg-blue-100' : 'bg-white'
            }`}>
              <div className="flex items-center mb-2">
                {msg.sender === 'user' ? (
                  <UserCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
                ) : (
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-500 mr-2" />
                )}
                <span className="font-semibold text-sm text-gray-700">
                  {msg.sender === 'user' ? 'You' : 'Bot'}
                </span>
              </div>
              <p className="text-gray-800">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg shadow p-3">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-500 mr-2" />
                <span className="font-semibold text-sm text-gray-700">Bot</span>
              </div>
              <p className="text-gray-500 mt-2">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-200">
        <div className="flex w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isLoading}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;