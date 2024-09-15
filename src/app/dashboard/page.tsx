// frontend/src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Chatbot } from '../../types';
import Link from 'next/link';
import DashboardHeader from '../../components/DashboardHeader';
import ChatbotCard from '../../components/ChatbotCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      fetchChatbots();
    }
  }, [user]);

  const fetchChatbots = async () => {
    try {
      const response = await api.get('/api/v1/chatbots');
      setChatbots(response.data);
    } catch (error) {
      console.error('Error fetching chatbots:', error);
    }
  };

  const deleteChatbot = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      try {
        await api.delete(`/api/v1/chatbots/${id}`);
        setChatbots(chatbots.filter(chatbot => chatbot.id !== id));
      } catch (error) {
        console.error('Error deleting chatbot:', error);
      }
    }
  };

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <Link href="/dashboard/create">
          <button className="mb-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
            Create New Chatbot
          </button>
        </Link>
        {chatbots.length === 0 ? (
          <p>No chatbots found. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbots.map((chatbot) => (
              <ChatbotCard
                key={chatbot.id}
                chatbot={chatbot}
                deleteChatbot={deleteChatbot}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

