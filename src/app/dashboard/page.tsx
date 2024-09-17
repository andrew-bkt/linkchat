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
import { PlusIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user } = useAuth();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      fetchChatbots();
    }
  }, [user]);

  const fetchChatbots = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/v1/chatbots/');
      setChatbots(response.data);
    } catch (error) {
      console.error('Error fetching chatbots:', error);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Chatbots</h2>
            <p className="mt-2 text-sm text-gray-700">
              Manage and create new AI-powered chatbots for your needs.
            </p>
          </div>
          <div className="mb-8">
            <Link href="/dashboard/create">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create New Chatbot
              </button>
            </Link>
          </div>
          {isLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-500">Loading your chatbots...</p>
            </div>
          ) : chatbots.length === 0 ? (
            <div className="text-center bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">No chatbots found. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </main>
    </div>
  );
}
