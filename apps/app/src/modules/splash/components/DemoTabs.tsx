import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';

export default function DemoTabs() {
  return (
    <Tabs className='max-w-2xl scale-110' defaultValue='我們的願景'>
      <TabsList className=''>
        <TabsTrigger value='我們的願景'>我們的願景 👀</TabsTrigger>
        <TabsTrigger value='我們的使命'>我們的使命 💼</TabsTrigger>
      </TabsList>
      <TabsContent value='我們的願景'>
        <h3 className='text-xl font-semibold'>交流、學習、成長</h3>
        <p className='text-muted-foreground mt-2 text-start'>
          《成功的反思》提到，這個時代，努力不一定能成功，於是我們內捲化，嘗試透過更多的競爭以爭取微小的優勢，最終精疲力盡（Burn
          Out）。
        </p>
        <p className='text-muted-foreground mt-2 text-start'>
          我們反思，為何不以合作取代競爭、共同成長？如今 AI
          發展改變了學習軌跡，而《超速學習》提到，設立目標並向成功者學習，是學習的捷徑。
        </p>
        <p className='text-muted-foreground mt-2 text-start'>
          <strong>TownPass 城市通微服務</strong>
          希望透過 Coffee
          Chat，透過一杯咖啡的時間，建立人脈、尋找學習導師、合作夥伴，一起成長！讓你不再獨自努力，與他人一起成長。
        </p>
      </TabsContent>
      <TabsContent value='我們的使命'>
        <h3 className='text-xl font-semibold'>打造最好的學習社群</h3>
        <p className='text-muted-foreground mt-2 text-start'>
          我們打造一個以交流為核心的學習社群，透過平台優化配對系統，讓你輕鬆找到學習導師、志同道合的夥伴，一起學習、共同進步。我們將打造：
        </p>
        <ul className='text-muted-foreground my-6 ml-6 list-disc text-start [&>li]:mt-2'>
          <li>導師、夥伴配對，共同設立目標</li>
          <li>學習論壇、社群、資源</li>
          <li>AI 學伴、學習追蹤工具</li>
        </ul>
      </TabsContent>
    </Tabs>
  );
}
