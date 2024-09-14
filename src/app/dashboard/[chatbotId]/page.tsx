// src/app/dashboard/[chatbotId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { Chatbot } from '../../../types';
import Link from 'next/link';

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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{chatbot.name}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Shareable Link:{' '}
        <Link
          href={`/chat/${chatbot.token}`}
          className="text-primary hover:underline break-all"
        >
          {`${process.env.NEXT_PUBLIC_APP_URL}/chat/${chatbot.token}`}
        </Link>
      </p>
      <div className="space-x-2">
        <Link href={`/dashboard/${chatbot.id}/edit`}>
          <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80">
            Edit Chatbot
          </button>
        </Link>
        <Link href={`/chat/${chatbot.token}`}>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
            Open Chat
          </button>
        </Link>
      </div>
    </div>
  );
}