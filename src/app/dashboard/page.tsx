// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Chatbot } from '../../types';
import Link from 'next/link';

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

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Chatbots</h1>
      <Link href="/dashboard/create">
        <button className="mb-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
          Create New Chatbot
        </button>
      </Link>
      {chatbots.length === 0 ? (
        <p>No chatbots found. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chatbots.map((chatbot) => (
            <div
              key={chatbot.id}
              className="p-4 bg-white rounded shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{chatbot.name}</h2>
                <p className="text-sm text-gray-600">
                  Shareable Link:{' '}
                  <Link
                    href={`/chat/${chatbot.token}`}
                    className="text-primary hover:underline"
                  >
                    {`${process.env.NEXT_PUBLIC_APP_URL}/chat/${chatbot.token}`}
                  </Link>
                </p>
              </div>
              <div className="mt-4 space-x-2">
                <Link href={`/dashboard/${chatbot.id}`}>
                  <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80">
                    View
                  </button>
                </Link>
                <Link href={`/dashboard/${chatbot.id}/edit`}>
                  <button className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}