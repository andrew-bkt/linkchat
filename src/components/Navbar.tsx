// frontend/src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Home, Menu, X } from 'react-feather';
import { useState } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const isHomePage = pathname === '/';
  const isDashboard = pathname === '/dashboard';
  const isChatPage = pathname.startsWith('/chat/');

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <button onClick={() => router.back()} className="text-gray-600 hover:text-primary">
                <ArrowLeft size={24} />
              </button>
            )}
            {!isHomePage && !isDashboard && (
              <Link href="/" className="text-gray-600 hover:text-primary">
                <Home size={24} />
              </Link>
            )}
            <Link href="/" className="text-2xl font-bold text-primary">
              LLM Chat App
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {user ? (
              <>
                {!isDashboard && (
                  <Link href="/dashboard">
                    <button className="text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300">
                      Dashboard
                    </button>
                  </Link>
                )}
                {isChatPage && (
                  <Link href="/dashboard">
                    <button className="text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300">
                      My Chatbots
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
                <Link href="/signup">
                  <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition duration-300">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 space-y-4">
            {user ? (
              <>
                {!isDashboard && (
                  <Link href="/dashboard">
                    <button className="block w-full text-left text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300">
                      Dashboard
                    </button>
                  </Link>
                )}
                {isChatPage && (
                  <Link href="/dashboard">
                    <button className="block w-full text-left text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300">
                      My Chatbots
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-600 hover:text-primary bg-transparent border-2 border-gray-600 hover:border-primary px-4 py-2 rounded-full transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
              <Link href="/login" className="block text-gray-600 hover:text-primary">
                  Login
                </Link>
                <Link href="/signup">
                  <button className="block w-full text-left bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition duration-300">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

