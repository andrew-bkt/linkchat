// frontend/src/components/landing-page/CallToAction.tsx

'use client'

import { motion } from 'framer-motion'

export default function CallToAction() {
  return (
    <section className="w-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="w-full px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Get Started with LinkChat?
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-xl text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform the way you interact and gather data from your audience. Join now and experience the future of communication.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/signup"
              className="inline-flex items-center rounded-full bg-indigo-700 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
