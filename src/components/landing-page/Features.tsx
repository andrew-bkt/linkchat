// frontend/src/components/landing-page/Features.tsx

'use client'

import { motion } from 'framer-motion'
import { Bot, Link as LinkIcon, FileText, Zap, Shield, Globe } from 'lucide-react'


export default function Features() {
  return (
    <section className="w-full bg-indigo-900 relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Features for Seamless Interaction
          </motion.h2>
          <motion.p 
            className="mx-auto mt-3 max-w-2xl text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how LinkChat can transform your communication and data gathering processes.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Bot className="h-8 w-8" />}
            title="AI-Powered Chatbots"
            description="Create custom chatbots trained on your specific data for intelligent interactions."
          />
          <FeatureCard
            icon={<LinkIcon className="h-8 w-8" />}
            title="Shareable Chat Links"
            description="Generate unique links to your configured chats for easy sharing and collaboration."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Interactive Surveys"
            description="Conduct engaging, conversational surveys that adapt to user responses."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Real-time Insights"
            description="Gain immediate understanding from chat interactions and survey responses."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure Data Handling"
            description="Ensure your sensitive information is protected with advanced security measures."
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title="Multi-language Support"
            description="Communicate effectively with users around the world in their preferred language."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4 rounded-full bg-purple-500 p-3 text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

