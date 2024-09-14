// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Providers from './Providers';

export const metadata = {
  title: 'LLM Chat Application',
  description: 'An application to create and share chatbots',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}