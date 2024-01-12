import Header from '@/features/ui/components/Header';
import { ReactNode } from 'react';

interface SiteLayoutProps {
  children: ReactNode;
}
const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <Header />
      <main className="container my-4">{children}</main>
    </>
  );
};

export default SiteLayout;
