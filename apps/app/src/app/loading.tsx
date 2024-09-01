export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='space-y-6'>
        <div className='flex items-center justify-center'>
          <div className='border-primary h-32 w-32 animate-spin rounded-full border-b-2 border-t-2' />
        </div>
        <div className='flex items-center justify-center'>
          <p className='text-lg font-semibold'>TownPass 城市通微服務</p>
        </div>
      </div>
    </div>
  );
}
