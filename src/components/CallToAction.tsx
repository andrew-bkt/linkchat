// frontend/src/components/CallToAction.tsx

import Link from 'next/link';

export default function CallToAction() {
  return (
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own AI Chatbot?</h2>
        <p className="text-xl mb-8">Join thousands of users who are already leveraging the power of AI.</p>
        <Link href="/signup">
          <button className="bg-accent text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent/80 transition duration-300">
            Get Started for Free
          </button>
        </Link>
      </div>
    </div>
  );
}
