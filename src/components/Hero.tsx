// frontend/src/components/Hero.tsx

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Create AI-Powered Chatbots</span>
            <span className="block">with Ease</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Build, customize, and share your own chatbots powered by advanced language models.
            Engage your audience like never before!
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link href="/signup">
                <span className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-50 sm:px-8">
                  Get started
                </span>
              </Link>
              <Link href="/login">
                <span className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-opacity-60 bg-primary hover:bg-opacity-70 sm:px-8">
                  Log in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
