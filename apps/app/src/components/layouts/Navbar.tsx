'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Button, buttonVariants, cn, Icons } from 'ui';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { ProfileIconMenu } from '../../modules/user/components/ProfileIconMenu';
import Link from 'next/link';

interface NavbarProps {
  children?: ReactNode;
}

export const NavBar: FC<NavbarProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onLoginClick = () => {
    push('/');
  };

  return (
    <nav className='border-border dark:text-foreground container border-b md:py-2'>
      <div className='mx-auto flex max-w-6xl items-center justify-between'>
        <div className='flex items-center justify-center gap-1'>
          <a href='/'>
            <Icons.logo className='h-16 w-16' />
          </a>
          <span className='hidden text-2xl font-semibold md:inline-block'>
            TownPass 城市通微服務
          </span>
        </div>

        <div className='hidden items-center space-x-6 md:flex'>
          <ProfileIconMenu />
        </div>

        <button className='md:hidden' onClick={toggleMobileMenu}>
          <span>{!isMobileMenuOpen && <Icons.Menu />}</span>
        </button>

        <div
          className={`fixed inset-0 z-50 transform bg-opacity-30 p-8 backdrop-blur-lg backdrop-filter transition duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            className='absolute right-4 top-4 text-3xl text-gray-600 dark:text-gray-300'
            onClick={toggleMobileMenu}
          >
            <Icons.close />
          </button>

          <div className='flex h-full flex-col justify-between'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-y-2 text-center'>
                <Icons.logo className='mx-auto h-16 w-16' />
                <h2 className='text-xl font-semibold tracking-tight'>
                  歡迎使用 TownPass 城市通微服務！
                </h2>
                <p className='text-muted-foreground text-sm'>
                  請登入以繼續使用
                </p>
              </div>
            </div>
            <Link href='/test'>test</Link>

            <Button
              className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
              onClick={onLoginClick}
            >
              登入
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
