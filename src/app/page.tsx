// frontend/src/app/page.tsx

import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
