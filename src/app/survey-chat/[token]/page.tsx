// frontend/src/app/survey-chat/[token]/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../services/api';
import { SurveyBot } from '../../../types';

export default function SurveyChatPage() {
  const params = useParams();
  const [surveyBot, setSurveyBot] = useState<SurveyBot | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSurveyBot();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSurveyBot = async () => {
    try {
      const response = await api.get(`/api/v1/surveybots/token/${params.token}`);
      setSurveyBot(response.data);
      
      // Make an initial request to the chat endpoint
      const initialChatResponse = await api.post(`/api/v1/surveybots/${response.data.id}/chat`, { message: '' });
      setMessages([{ role: 'assistant', content: initialChatResponse.data.message }]);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching survey bot:', error);
      setError('Failed to load survey');
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
  
    try {
      // Send the full conversation history to the backend
      const fullConversation = [...messages, userMessage];
      const response = await api.post(`/api/v1/surveybots/${surveyBot?.id}/chat`, { 
        message: input,
        conversation: fullConversation
      });
      
      // Check if response.data is an object with a 'message' property
      const botMessage = { 
        role: 'assistant', 
        content: typeof response.data === 'object' && response.data.message 
          ? response.data.message 
          : 'Sorry, I couldn\'t process that response.'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
      // Optionally, add an error message to the chat
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred.' }]);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <div>Loading survey chat...</div>;
  if (error) return <div>{error}</div>;
  if (!surveyBot) return <div>Survey not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{surveyBot.name}</h1>
            <div className="h-64 overflow-y-auto mb-4 p-4 border border-gray-300 rounded">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.content}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
