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
    <html lang="en">
      <body className="bg-background text-foreground">
        <Providers>
          {children}
          <Analytics /> 
          <SpeedInsights/>
        </Providers>
      </body>
    </html>
  );
}
