import Link from 'next/link';
import { buttonVariants, cn, Icons } from 'ui';

export default function CallToAction() {
  return (
    <div className='relative mb-36 w-[24rem]'>
      <Link className={cn(buttonVariants({ size: 'lg' }))} href='/'>
        立即開始 <Icons.ChevronRight />
      </Link>
    </div>
  );
}
