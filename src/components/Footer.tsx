// src/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-b from-slate-700 to-slate-800 text-white py-4" // Adjusted padding
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center text-sm">
        <div className="mb-2"> {/* Reduced margin-bottom */}
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
            LinkChat
          </span>
        </div>
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} LinkChat. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
