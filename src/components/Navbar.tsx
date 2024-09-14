// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Home } from 'react-feather'; // Make sure to install react-feather

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const isHomePage = pathname === '/';
  const isDashboard = pathname === '/dashboard';
  const isChatPage = pathname.startsWith('/chat/');

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {!isHomePage && (
            <button onClick={() => router.back()} className="hover:text-gray-300">
              <ArrowLeft size={24} />
            </button>
          )}
          {!isHomePage && (
            <Link href="/" className="hover:text-gray-300">
              <Home size={24} />
            </Link>
          )}
          <Link href="/" className="text-xl font-bold">
            LLM Chat App
          </Link>
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              {!isDashboard && (
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              )}
              {isChatPage && (
                <Link href="/dashboard" className="hover:underline">
                  My Chatbots
                </Link>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
