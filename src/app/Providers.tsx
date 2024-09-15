// src/app/Providers.tsx

'use client';

import { ReactNode } from 'react';
import AuthProvider from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex flex-grow container mx-auto p-4">{children}</main>
    </AuthProvider>
  );
}
