'use client';

import AuthMenu from '@/features/auth/components/AuthMenu';
import { Button } from '@/features/shadcn/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  path: string;
  children: ReactNode;
}
const NavLink = ({ path, children }: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <Button variant={pathName.startsWith(path) ? 'secondary' : 'ghost'} asChild>
      <Link href={path}>{children}</Link>
    </Button>
  );
};
const Header = () => {
  return (
    <nav className="flex items-center space-x-4 p-4 shadow-md">
      <Link href={'/'} className="px-2">
        <Image
          priority
          src="/assets/images/logo.jpg"
          alt="Absent management"
          width={50}
          height={50}
        />
      </Link>
      <NavLink path="/admin">Admins</NavLink>
      <NavLink path="/leaves">Leaves</NavLink>
      <NavLink path="/articles">Articles</NavLink>
      <NavLink path="/announcements">Announcements</NavLink>
      <div className="!ml-auto h-[40px] w-[1px] bg-gray-300"></div>
      <AuthMenu />
    </nav>
  );
};

export default Header;
