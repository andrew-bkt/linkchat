// frontend/src/components/Testimonials.tsx

const testimonials = [
  {
    name: 'John Doe',
    role: 'Marketing Manager',
    content: 'This platform has revolutionized our customer support. Our chatbot handles 70% of inquiries, saving us time and resources.',
  },
  {
    name: 'Jane Smith',
    role: 'E-commerce Owner',
    content: 'I created a product recommendation chatbot for my online store, and it has significantly increased our sales conversions.',
  },
  {
    name: 'Mike Johnson',
    role: 'Educator',
    content: 'As a teacher, I use the platform to create interactive learning bots for my students. It\'s been a game-changer in engaging them.',
  },
];

export default function Testimonials() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
