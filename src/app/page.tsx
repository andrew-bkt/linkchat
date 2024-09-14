// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to the LLM Chat Application</h1>
      <p className="text-lg mb-6">
        Create and share your own chatbots powered by LLMs.
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary/80">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}