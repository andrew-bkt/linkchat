// frontend/src/components/landing-page/Testimonials.tsx

'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="w-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="w-full px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by Innovators Worldwide
          </h2>
          <motion.p 
            className="mt-3 text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See how LinkChat is transforming the way people share and gather information.
          </motion.p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            name="Alex Chen"
            role="Product Manager"
            company="TechInnovate"
            image="https://i.pravatar.cc/150?img=11"
            quote="LinkChat has revolutionized our product feedback process. The AI-powered surveys provide deeper insights than traditional methods ever could."
          />
          <TestimonialCard
            name="Samantha Lee"
            role="Head of Customer Success"
            company="DataDrive Solutions"
            image="https://i.pravatar.cc/150?img=5"
            quote="The ability to configure chatbots with our own data has been a game-changer. Our customer support efficiency has increased by 40% since implementing LinkChat."
          />
          <TestimonialCard
            name="Marcus Johnson"
            role="Research Lead"
            company="InnovateLab"
            image="https://i.pravatar.cc/150?img=3"
            quote="Sharing complex research findings has never been easier. LinkChat's customizable AI chats allow us to disseminate information in an interactive, engaging way."
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, company, image, quote }) {
  return (
    <motion.div
      className="flex flex-col justify-between rounded-2xl bg-white/10 p-6 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
          ))}
        </div>
        <div className="mt-4">
          <p className="text-lg text-gray-100">{quote}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center space-x-3">
        <img className="h-10 w-10 rounded-full" src={image} alt={name} />
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-sm text-gray-300">
            {role} at {company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
