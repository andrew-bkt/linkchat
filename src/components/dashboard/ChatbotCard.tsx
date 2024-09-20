'use client';

import Link from 'next/link';
import { Chatbot } from '../types';
import { ChatBubbleLeftRightIcon, TrashIcon, PencilIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface ChatbotCardProps {
  chatbot: Chatbot;
  deleteChatbot: (id: string) => void;
}

export default function ChatbotCard({ chatbot, deleteChatbot }: ChatbotCardProps) {
  const copyChatLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/chat/${chatbot.token}`);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-700 rounded-md p-3">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{chatbot.name}</h2>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <Link href={`/chat/${chatbot.token}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View chat
          </Link>
          <button
            onClick={copyChatLink}
            className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Copy chat link"
          >
            <ClipboardIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="mt-3 flex space-x-3">
          <Link href={`/dashboard/${chatbot.id}`}>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PencilIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Edit
            </button>
          </Link>
          <button
            onClick={() => deleteChatbot(chatbot.id)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
