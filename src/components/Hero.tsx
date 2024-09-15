// frontend/src/components/Hero.tsx

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Create AI-Powered Chatbots with Ease</h1>
          <p className="text-xl mb-8">
            Build, customize, and share your own chatbots powered by advanced language models.
            Engage your audience like never before!
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <button className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition duration-300">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
