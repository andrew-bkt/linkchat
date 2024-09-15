// frontend/src/components/Features.tsx

import { ChatBubbleLeftRightIcon, BoltIcon, ShareIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Easy to Use',
    description: 'Create and customize your chatbot in minutes with our intuitive interface.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Powerful AI',
    description: 'Leverage advanced language models to make your chatbots smarter and more engaging.',
    icon: BoltIcon,
  },
  {
    name: 'Share Instantly',
    description: 'Generate a unique link and share your chatbot with anyone, anywhere.',
    icon: ShareIcon,
  },
];

export default function Features() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.name} className="text-center">
              <div className="flex justify-center mb-4">
                <feature.icon className="h-12 w-12 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
