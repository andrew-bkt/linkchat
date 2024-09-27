'use client'

import { motion } from 'framer-motion'
import { Bot, Link as LinkIcon, FileText, BarChart2, Settings, Globe } from 'lucide-react'

export default function Features() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create and Share Custom AI Bots
          </motion.h2>
          <motion.p 
            className="mx-auto mt-3 max-w-2xl text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build chatbots and survey bots using your own data and specific instructions for efficient communication and information gathering.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Bot className="h-8 w-8" />}
            title="Personalized Chatbots"
            description="Load your own files and data to create chatbots that provide tailored responses."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Configurable Survey Bots"
            description="Design surveys with specific questions to gather detailed responses."
          />
          <FeatureCard
            icon={<BarChart2 className="h-8 w-8" />}
            title="Insightful Dashboards"
            description="Analyze survey results with comprehensive dashboards."
          />
          <FeatureCard
            icon={<LinkIcon className="h-8 w-8" />}
            title="Easy Sharing via Links"
            description="Share your bots effortlessly through unique links."
          />
          <FeatureCard
            icon={<Settings className="h-8 w-8" />}
            title="Customizable Instructions"
            description="Define specific guidelines to direct bot interactions."
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title="Global Accessibility"
            description="Reach users anywhere with easily shareable bots."
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