'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '../../../components/chat/ChatWindow';
import ChatHeader from '../../../components/chat/ChatHeader';


  export default function ChatPage() {
    const { token } = useParams();
  
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-grow flex flex-col max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <ChatHeader />
          <div className="flex-grow overflow-hidden">
            <ChatWindow token={token as string} />
          </div>
        </div>
      </div>
    );
  }