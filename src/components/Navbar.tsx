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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                LinkChat
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {!isHomePage && (
                <Link href="/" className="text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Home
                </Link>
              )}
              {user && !isDashboard && (
                <Link href="/dashboard" className="text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-primary">
                  Login
                </Link>
                <Link href="/signup">
                  <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {!isHomePage && (
              <Link href="/" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
            )}
            {user && !isDashboard && (
              <Link href="/dashboard" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link href="/signup" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
