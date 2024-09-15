import Link from 'next/link';
import { Chatbot } from '../types';

interface ChatbotCardProps {
  chatbot: Chatbot;
  deleteChatbot: (id: string) => void;
}

export default function ChatbotCard({ chatbot, deleteChatbot }: ChatbotCardProps) {
  return (
    <div className="p-4 bg-white rounded shadow flex flex-col justify-between">
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
      <div className="mt-4 flex justify-between">
        <Link href={`/dashboard/${chatbot.id}`}>
          <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80">
            View
          </button>
        </Link>
        <button
          onClick={() => deleteChatbot(chatbot.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
