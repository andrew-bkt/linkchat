'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '../../../components/chat/ChatWindow';
import ChatHeader from '../../../components/chat/ChatHeader';

export default function ChatPage() {
  const { token } = useParams();

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex-grow max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <ChatHeader />
        <main className="flex-grow flex flex-col">
          <ChatWindow token={token as string} />
        </main>
      </div>
    </div>
  );
}
