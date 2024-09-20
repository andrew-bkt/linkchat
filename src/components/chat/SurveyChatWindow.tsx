// frontend/src/components/chat/SurveyChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { PaperAirplaneIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SurveyChatWindowProps {
  surveyBotId: string;
  initialMessage: string;
}

const SurveyChatWindow: React.FC<SurveyChatWindowProps> = ({ surveyBotId, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: initialMessage }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post(`/api/v1/surveybots/${surveyBotId}/chat`, {
        message: input,
        conversation: messages
      });

      const botMessage = {
        role: 'assistant',
        content: response.data.message || 'Sorry, I couldn\'t process that response.'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg shadow p-3 ${
              msg.role === 'user' ? 'bg-blue-100' : 'bg-white'
            }`}>
              <div className="flex items-center mb-2">
                {msg.role === 'user' ? (
                  <UserCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
                ) : (
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-500 mr-2" />
                )}
                <span className="font-semibold text-sm text-gray-700">
                  {msg.role === 'user' ? 'You' : 'Survey Bot'}
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
                <span className="font-semibold text-sm text-gray-700">Survey Bot</span>
              </div>
              <p className="text-gray-500 mt-2">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0">
        <div className="flex w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isLoading}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyChatWindow;
