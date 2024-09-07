import type { FC } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
} from 'ui';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export const ProfileIconMenu: FC = () => {
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Icons.AlignJustify className='h-6 w-6' />
          <span className='sr-only'>Menu Toggle</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              push('/');
            }}
          >
            產品
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              push('/app');
            }}
          >
            主頁
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
