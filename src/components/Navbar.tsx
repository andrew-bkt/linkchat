'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react'

interface AuthContextType {
  user: any; // Replace 'any' with the actual user type
  signOut: () => Promise<void>;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Navbar() {
  const { user, signOut } = useAuth() as AuthContextType
  const router = useRouter()
  const pathname = usePathname() as string
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  const isHomePage = pathname === '/'
  const isDashboard = pathname === '/dashboard'
  const isChatPage = pathname.startsWith('/chat/')

  return (
    <motion.nav 
      className="w-screen bg-indigo-900 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                LinkChat
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {!isHomePage && (
                <NavLink href="/" icon={<Home className="w-5 h-5 mr-1" />}>
                  Home
                </NavLink>
              )}
              {user && !isDashboard && (
                <NavLink href="/dashboard">
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            ) : (
              <>
                <NavLink href="/login" icon={<LogIn className="w-5 h-5 mr-1" />}>
                  Login
                </NavLink>
                <Link href="/signup">
                  <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="sm:hidden bg-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-2 pb-3 space-y-1">
            {!isHomePage && (
              <MobileNavLink href="/" icon={<Home className="w-5 h-5 mr-2" />}>
                Home
              </MobileNavLink>
            )}
            {user && !isDashboard && (
              <MobileNavLink href="/dashboard">
                Dashboard
              </MobileNavLink>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-3 py-2 text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            ) : (
              <>
                <MobileNavLink href="/login" icon={<LogIn className="w-5 h-5 mr-2" />}>
                  Login
                </MobileNavLink>
                <MobileNavLink href="/signup" icon={<UserPlus className="w-5 h-5 mr-2" />}>
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children, icon }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-indigo-200 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-white transition duration-150 ease-in-out"
    >
      {icon}
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, icon }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-indigo-200 hover:text-white flex items-center px-3 py-2 text-base font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
    >
      {icon}
      {children}
    </Link>
  )
}

