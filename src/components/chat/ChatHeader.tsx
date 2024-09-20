import Link from 'next/link';

export default function ChatHeader() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">LinkChat</div>
        <a
          href="https://linkchat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors duration-200"
        >
          Visit LinkChat
        </a>
      </div>
    </header>
  );
}
