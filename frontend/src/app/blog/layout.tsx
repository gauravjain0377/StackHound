import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — StackHound',
  description: 'Insights on AI-powered sales intelligence, web scraping, and B2B automation.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
