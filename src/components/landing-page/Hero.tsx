// frontend/src/components/landing-page/Hero.tsx

'use client'

import { motion } from 'framer-motion'
import { Bot, Link as LinkIcon, FileText } from 'lucide-react'


export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl">
            <span className="block">Revolutionize Data Sharing and Gathering</span>
            <span className="block text-pink-300">Through Conversations</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            LinkChat revolutionizes information sharing and gathering. Configure AI chatbots with your data, share custom chat links, and conduct engaging, conversational surveys.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeatureCard
            icon={<Bot className="h-8 w-8 text-indigo-400" />}
            title="Custom AI Chatbots"
            description="Train AI with your documents for tailored conversations"
          />
          <FeatureCard
            icon={<LinkIcon className="h-8 w-8 text-purple-400" />}
            title="Shareable Chat Links"
            description="Create and share links to your configured AI chats"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-pink-400" />}
            title="Conversational Surveys"
            description="Gather information through natural chat interactions"
          />
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="w-full rounded-2xl bg-white/10 p-6 backdrop-blur-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4 inline-block rounded-full bg-white/20 p-3">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}
