'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../services/api';
import { SurveyBot } from '../../../types';
import ChatHeader from '../../../components/chat/ChatHeader';
import SurveyChatWindow from '../../../components/chat/SurveyChatWindow';

export default function SurveyChatPage() {
  const { token } = useParams();
  const [surveyBot, setSurveyBot] = useState<SurveyBot | null>(null);
  const [initialMessage, setInitialMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurveyBot();
  }, [token]);

  const fetchSurveyBot = async () => {
    try {
      const response = await api.get(`/api/v1/surveybots/token/${token}`);
      setSurveyBot(response.data);
      
      const initialChatResponse = await api.post(`/api/v1/surveybots/${response.data.id}/chat`, { message: '' });
      setInitialMessage(initialChatResponse.data.message);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching survey bot:', error);
      setError('Failed to load survey');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading survey chat...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  if (!surveyBot) return <div className="min-h-screen flex items-center justify-center">Survey not found</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow flex flex-col max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatHeader />
        <div className="flex-grow flex flex-col">
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h1 className="text-xl font-semibold text-blue-800">{surveyBot.name}</h1>
          </div>
          <div className="flex-grow overflow-hidden">
            <SurveyChatWindow surveyBotId={surveyBot.id} initialMessage={initialMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}