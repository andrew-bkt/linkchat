'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '../../../components/ChatWindow';
import ChatHeader from '../../../components/ChatHeader';

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
