import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation — StackHound',
  description: 'Learn how to use StackHound to automate your B2B sales intelligence.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
