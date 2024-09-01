import { Suspense, type ReactNode } from 'react';
import { Icons } from 'ui';
import { AppNavBar } from '../../components/layouts/AppNavbar';

const AppLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex h-full w-full flex-col'>
      <main className='h-full w-screen'>
        <Suspense fallback={<Icons.Spinner className='animate-spin' />}>
          {children}
        </Suspense>
      </main>
      <footer className='fixed bottom-0 w-full'>
        <AppNavBar />
      </footer>
    </div>
  );
};

export default AppLayout;
