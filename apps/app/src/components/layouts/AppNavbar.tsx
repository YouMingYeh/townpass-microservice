'use client';

import type { FC, ReactNode } from 'react';
import { AnimatedBackground, Icons } from 'ui';
import Link from 'next/link';

interface AppNavbarProps {
  children?: ReactNode;
}

type Href = '/';

const TABS = [
  {
    label: 'Home',
    href: '/' as Href,
    icon: <Icons.Home className='h-8 w-8' />,
  },
  {
    label: 'Chat',
    href: '/' as Href,
    icon: <Icons.MessageCircle className='h-8 w-8' />,
  },
  {
    label: 'Community',
    href: '/' as Href,
    icon: <Icons.Library className='h-8 w-8' />,
  },
  {
    label: 'Notifications',
    href: '/' as Href,
    icon: <Icons.Bell className='h-8 w-8' />,
  },
  {
    label: 'Menu',
    href: '/' as Href,
    icon: <Icons.Menu className='h-8 w-8' />,
  },
];

export const AppNavBar: FC<AppNavbarProps> = () => {
  return (
    <nav className='bg-background grid grid-cols-5 place-content-center place-items-center py-6 md:mx-60'>
      <AnimatedBackground
        className='rounded-lg bg-zinc-100'
        defaultValue={TABS[0].label}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.3,
        }}
      >
        {TABS.map(tab => (
          <Link
            className='inline-flex h-6 w-6 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950'
            data-id={tab.label}
            href={tab.href}
            key={tab.label}
            type='button'
            prefetch
          >
            {tab.icon}
          </Link>
        ))}
      </AnimatedBackground>
    </nav>
  );
};
