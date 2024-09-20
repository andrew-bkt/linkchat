'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '../../../components/chat/ChatWindow';
import ChatHeader from '../../../components/chat/ChatHeader';

export default function ChatPage() {
  const { token } = useParams();

  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader />
      <main className="flex-grow flex flex-col">
        <ChatWindow token={token as string} />
      </main>
    </div>
  );
}
