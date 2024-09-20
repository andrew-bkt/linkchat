// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Providers from './Providers';
import Navbar from '../components/Navbar';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'LLM Chat Application',
  description: 'An application to create and share chatbots',
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full min-h-screen">
        <Providers>
          <Navbar />
          <main className="w-full overflow-x-hidden">
            {children}
          </main>
          <Analytics /> 
          <SpeedInsights/>
        </Providers>
      </body>
    </html>
  );
}