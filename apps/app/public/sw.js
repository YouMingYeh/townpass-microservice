if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),f={module:{uri:c},exports:t,require:r};a[c]=Promise.all(i.map((e=>f[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-d25a3628"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3fefd6ef1be968769bdf545530968301"},{url:"/_next/static/29w7xSav4eA1G8GfxQP1S/_buildManifest.js",revision:"73a3a659fa9116204e12892557ab13df"},{url:"/_next/static/29w7xSav4eA1G8GfxQP1S/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0f993a33-fac82d34d3a83d7d.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/509-13ebfabfd570a4cc.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/561-c5d6b241ab59df5e.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/77-5bd4b34c064f4a16.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/780-23d396beb2064d2d.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/8461863f-3719d71a76126e74.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/86-76f30b3fb0664d26.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/9e33a154-a803b10eee1550be.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/a5d84b75-663db0b2c870aa0f.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/(splash)/layout-cfd779411399485c.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/(splash)/page-de327714d35b234b.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/app/layout-fc5cfcb38c4296ef.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/app/loading-ea8f1e897a88de46.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/app/page-e495b62cdd689e2b.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/global-error-6040b33ceab9120e.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/layout-2a8e589d5d0c7a8a.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/loading-920c9eebfb8d7b20.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/app/not-found-45b3dc2a29e90bb5.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/framework-68728a8c294b981c.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/main-75298c47969b8f0b.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/main-app-d63b2749ce1715f7.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/pages/_app-5f997046ee6447f4.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/pages/_error-f27e20f7ba5d5dd9.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0c1885fac555dd55.js",revision:"29w7xSav4eA1G8GfxQP1S"},{url:"/_next/static/css/246acebf3ae8cecd.css",revision:"246acebf3ae8cecd"},{url:"/_next/static/media/07103e16d41c9190-s.woff2",revision:"865bfc77817e078122fba2ff0a8e259c"},{url:"/_next/static/media/0fb93cc812fb4b50-s.woff2",revision:"a18ad80bf268ef612116d884c2af418f"},{url:"/_next/static/media/32702a3715dbd7c1-s.woff2",revision:"8c6c9a0ed2815ab4659cf6f10388aea2"},{url:"/_next/static/media/6dc02f179ba8da8f-s.woff2",revision:"ec321a873a0a3dbb51083da484c6182c"},{url:"/_next/static/media/7b9ca6a1d31c5662-s.p.woff2",revision:"817c5aeb992050a67c54c8bf028a28a8"},{url:"/_next/static/media/84a39d905077a976-s.woff2",revision:"cd3fed32b75d04b79cf48a95ef63b9a5"},{url:"/_next/static/media/931105f8d96e7f26-s.p.woff2",revision:"6d1f2c44bd135848c7321937f7371e37"},{url:"/_next/static/media/9450a5aa688b86af-s.woff2",revision:"ad7ab63936b2f4518d04ebbdf704c8ca"},{url:"/_next/static/media/bd2489da38fb1d0b-s.woff2",revision:"ca4dd28ee25e096804bbb0dab6fc7dfe"},{url:"/_next/static/media/f1d4c48219b1bd72-s.woff2",revision:"e46df47bb1e1cf796f08f67211174cef"},{url:"/apple-touch-icon.png",revision:"1164737f1d931110185d2e38521e3cb0"},{url:"/avatars/anon.png",revision:"4b3d1108e70cfe49abd9acdfe7ade9d5"},{url:"/avatars/bird.png",revision:"06227fdaf560789c5bcace5f69344cb9"},{url:"/avatars/boy-1.png",revision:"4366a8ea269387e84250327d524323c2"},{url:"/avatars/boy-2.png",revision:"dde82f87ff3b856486efafc4d85b8fef"},{url:"/avatars/boy-3.png",revision:"9363555a885f158e42e171d23e997cb8"},{url:"/avatars/boy-4.png",revision:"e5a1fab596787def17131388982a7861"},{url:"/avatars/boy-5.png",revision:"432ea2b5d2df5f668745839d9395695f"},{url:"/avatars/boy-6.png",revision:"8c76189977736a95f447ba9a3520448f"},{url:"/avatars/boy-7.png",revision:"3d1ba159b8ce9b653d23b5ab6232c7e3"},{url:"/avatars/cat.png",revision:"c6478c201595f36c4138e3bbcfdff36f"},{url:"/avatars/cocha.png",revision:"753344742b014aed3f0dc7d972efea72"},{url:"/avatars/dog.png",revision:"1561c6b6441be5a99446707136bcd7b5"},{url:"/avatars/girl-1.png",revision:"ece8e719b912f35662b9913ebd744dbb"},{url:"/avatars/girl-10.png",revision:"fd0f974da47d3a94419e23377107ffb0"},{url:"/avatars/girl-11.png",revision:"053530dbc4c761813a9745d34f519ad5"},{url:"/avatars/girl-12.png",revision:"113e61675bcf21d102123339ba8cb446"},{url:"/avatars/girl-2.png",revision:"c5d9c57352aa5886a4d25cfb45ba36e1"},{url:"/avatars/girl-3.png",revision:"931d3c2aea19066580de42119709410b"},{url:"/avatars/girl-4.png",revision:"3fd993af729fe613e5acc8ad1ae37523"},{url:"/avatars/girl-5.png",revision:"d72e6dcbf9f3a5cad24f487e0e41c565"},{url:"/avatars/girl-6.png",revision:"d1860dc7e2895eb18e07086cf26c305c"},{url:"/avatars/girl-7.png",revision:"b3dd4334e958aa253ff4bf06c10a836d"},{url:"/avatars/girl-8.png",revision:"fea5678296585f6c7a79e7fd91e918b1"},{url:"/avatars/girl-9.png",revision:"a7fb44f0e633738c5ac095df34eb1611"},{url:"/favicon-16x16.png",revision:"101faf4a061027e02e269e8dbcf48c17"},{url:"/favicon.ico",revision:"c6ca43d4be6252ace49ecd2af7efd4cd"},{url:"/icon512_maskable.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/icon512_rounded.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/logo-512x512.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/logo.png",revision:"58d892a2ca37359b3544a825a4017628"},{url:"/manifest.json",revision:"473c423be9a63fc62d974091e3460e82"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
