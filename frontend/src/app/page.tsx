import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { BentoSection } from '@/components/landing/BentoSection';
import { DeveloperSection } from '@/components/landing/DeveloperSection';
import { ScrollSection } from '@/components/landing/ScrollSection';
import { IntegrationsSection } from '@/components/landing/IntegrationsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'StackHound — Stack Intelligence for B2B Sales',
  description: 'Automate your data. Unchain your sales. StackHound autonomously scrapes, enriches, and routes your prospect data.',
};

export default function HomePage() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BentoSection />
      <DeveloperSection />
      <ScrollSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
