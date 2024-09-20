// frontend/src/app/page.tsx

import Hero from '../components/landing-page/Hero';
import Features from '../components/landing-page/Features';
import Testimonials from '../components/landing-page/Testimonials';
import CallToAction from '../components/landing-page/CallToAction';

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
