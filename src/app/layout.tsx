// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Providers from './Providers';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'LLM Chat Application',
  description: 'An application to create and share chatbots',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-background text-foreground h-full flex flex-col">
        <Providers>
          {children}
          <Analytics /> 
          <SpeedInsights/>
        </Providers>
      </body>
    </html>
  );
}
