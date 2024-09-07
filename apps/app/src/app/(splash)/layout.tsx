import type { ReactNode } from 'react';

const LandingLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-screen flex-col overflow-auto'>
      <main className='flex-1'>{children}</main>
    </div>
  );
};

export default LandingLayout;
