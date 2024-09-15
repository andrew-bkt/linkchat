// frontend/src/app/dashboard/[chatbotId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { Chatbot } from '../../../types'; 
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ChatbotForm = dynamic(() => import('../../../components/ChatbotForm'), { ssr: false });

export default function ChatbotDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchChatbot();
    }
  }, [user]);

  const fetchChatbot = async () => {
    try {
      const response = await api.get(`/api/v1/chatbots/${params.chatbotId}`);
      setChatbot(response.data);
    } catch (error) {
      console.error('Error fetching chatbot:', error);
    }
  };

  if (!chatbot) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{chatbot.name}</h1>
        <Link href="/dashboard">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300">
            Back to Dashboard
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ChatbotForm chatbot={chatbot} onSave={() => fetchChatbot()} />
      </div>
    </div>
  );
}
