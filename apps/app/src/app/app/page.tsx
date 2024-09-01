import { Separator } from 'ui';

export default function Page() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center overflow-visible py-8 pb-24 md:pb-24'>
      <div className='container h-full max-w-xl overflow-auto'>
        <h1 className='mb-4 text-left text-4xl font-bold'>配對</h1>
        <Separator className='my-8 max-w-lg' />
        <p className='text-muted-foreground text-center text-sm'>
          點擊瀏覽器下方分享按鈕，找到<strong>加入主畫面</strong>，把 TownPass
          加入主畫面變成 App 吧！
        </p>
      </div>
    </div>
  );
}
