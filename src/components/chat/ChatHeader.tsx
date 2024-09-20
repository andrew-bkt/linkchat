import Link from 'next/link';

export default function ChatHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              LinkChat
            </Link>
          </div>
          <div>
            <a
              href="https://linkchat.com" // Replace with your actual website URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Visit LinkChat
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
