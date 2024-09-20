// frontend/src/app/page.tsx
import Hero from '../components/landing-page/Hero';
import Features from '../components/landing-page/Features';
import Testimonials from '../components/landing-page/Testimonials';
import CallToAction from '../components/landing-page/CallToAction';

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-slate-700 to-indigo-800">
        <Hero />
        <Features />
      </div>
      <div className="bg-gradient-to-b from-indigo-800 to-slate-700">
        <Testimonials />
        <CallToAction />
      </div>
    </div>
  );
}
