if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let c={};const r=e=>s(e,t),f={module:{uri:t},exports:c,require:r};a[t]=Promise.all(i.map((e=>f[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-d25a3628"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5346d6b2ca835979eea67913692a8ba9"},{url:"/_next/static/chunks/0f993a33-fac82d34d3a83d7d.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/561-b78ca3a731eba89e.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/73c9e8d2-ba589939b7ae800a.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/77-79a64f4597bc4c51.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/780-b1981550c242ab13.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/8461863f-3719d71a76126e74.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/86-ffd65adc56f39068.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/9e33a154-3f3aaba7a58005a5.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/a5d84b75-998826e1084e82fe.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/(splash)/layout-cf8bbb672729fa1c.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/(splash)/page-a498c50edff2a4ac.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/app/layout-50efd9ed3a8bc592.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/app/loading-ea8f1e897a88de46.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/app/page-f55d5b546792884d.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/global-error-ed5a0810b201552d.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/layout-aa39e5ec4f0f0643.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/loading-920c9eebfb8d7b20.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/not-found-fa8404550f615810.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/app/test/page-6e280f5515eb7e86.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/framework-68728a8c294b981c.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/main-6fb48b6b65b060bb.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/main-app-1f370de225b84559.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/pages/_app-5f997046ee6447f4.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/pages/_error-f27e20f7ba5d5dd9.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-bd4d829607f19c87.js",revision:"htlNlBgSLQBkXOxbZHWYa"},{url:"/_next/static/css/1e11af24f6aa61b1.css",revision:"1e11af24f6aa61b1"},{url:"/_next/static/htlNlBgSLQBkXOxbZHWYa/_buildManifest.js",revision:"73a3a659fa9116204e12892557ab13df"},{url:"/_next/static/htlNlBgSLQBkXOxbZHWYa/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0e5e1c6a8db9e432-s.woff2",revision:"f201ef2b6f1307dd8b1ec0c0deffceea"},{url:"/_next/static/media/120a5a1920781bd0-s.p.woff2",revision:"8c4b05d4371467ba1d0bc60839c6dcb9"},{url:"/_next/static/media/28aa5118b38b86e4-s.woff2",revision:"db5317b009a0dedd66dab31d7889b5f3"},{url:"/_next/static/media/483de911b1a0d258-s.woff2",revision:"28502b06e67112e0bf77a784aee917d0"},{url:"/_next/static/media/5693677ef07d9b51-s.woff2",revision:"96b57d1ae0a86dcf7913589b27426343"},{url:"/_next/static/media/6ebb97b5c9fa4e03-s.p.woff2",revision:"39aff03d2a35b1c80f210051f35d4b2b"},{url:"/_next/static/media/7a7012758df5a81e-s.woff2",revision:"26024640d95a44fd98f614d6f4372e4b"},{url:"/_next/static/media/7c16c8204ab29534-s.woff2",revision:"eac32b711872911e7e7c107eb7a7901a"},{url:"/_next/static/media/80b1a0e600ca6d83-s.woff2",revision:"584ea11fad4f10a879c8530e7575cbbf"},{url:"/_next/static/media/8720059dfa14a1fe-s.woff2",revision:"1254e937b1635a843bc7bdee51de2aeb"},{url:"/_next/static/media/98a28a5430a3cf7f-s.woff2",revision:"7dada9344a370f25dc1d3b7030da67b6"},{url:"/_next/static/media/df2942b6de9d14b5-s.woff2",revision:"47e8ccc33b3dcfbe6d31914569515bf4"},{url:"/_next/static/media/f1df6186c8d69644-s.woff2",revision:"307c90aaa7d9c628155ee8cb913b8382"},{url:"/_next/static/media/f756da832d8c34d4-s.woff2",revision:"ef6b28a1181a73b788c8669d6ad9adc8"},{url:"/apple-touch-icon.png",revision:"1164737f1d931110185d2e38521e3cb0"},{url:"/avatars/anon.png",revision:"4b3d1108e70cfe49abd9acdfe7ade9d5"},{url:"/avatars/bird.png",revision:"06227fdaf560789c5bcace5f69344cb9"},{url:"/avatars/boy-1.png",revision:"4366a8ea269387e84250327d524323c2"},{url:"/avatars/boy-2.png",revision:"dde82f87ff3b856486efafc4d85b8fef"},{url:"/avatars/boy-3.png",revision:"9363555a885f158e42e171d23e997cb8"},{url:"/avatars/boy-4.png",revision:"e5a1fab596787def17131388982a7861"},{url:"/avatars/boy-5.png",revision:"432ea2b5d2df5f668745839d9395695f"},{url:"/avatars/boy-6.png",revision:"8c76189977736a95f447ba9a3520448f"},{url:"/avatars/boy-7.png",revision:"3d1ba159b8ce9b653d23b5ab6232c7e3"},{url:"/avatars/cat.png",revision:"c6478c201595f36c4138e3bbcfdff36f"},{url:"/avatars/cocha.png",revision:"753344742b014aed3f0dc7d972efea72"},{url:"/avatars/dog.png",revision:"1561c6b6441be5a99446707136bcd7b5"},{url:"/avatars/girl-1.png",revision:"ece8e719b912f35662b9913ebd744dbb"},{url:"/avatars/girl-10.png",revision:"fd0f974da47d3a94419e23377107ffb0"},{url:"/avatars/girl-11.png",revision:"053530dbc4c761813a9745d34f519ad5"},{url:"/avatars/girl-12.png",revision:"113e61675bcf21d102123339ba8cb446"},{url:"/avatars/girl-2.png",revision:"c5d9c57352aa5886a4d25cfb45ba36e1"},{url:"/avatars/girl-3.png",revision:"931d3c2aea19066580de42119709410b"},{url:"/avatars/girl-4.png",revision:"3fd993af729fe613e5acc8ad1ae37523"},{url:"/avatars/girl-5.png",revision:"d72e6dcbf9f3a5cad24f487e0e41c565"},{url:"/avatars/girl-6.png",revision:"d1860dc7e2895eb18e07086cf26c305c"},{url:"/avatars/girl-7.png",revision:"b3dd4334e958aa253ff4bf06c10a836d"},{url:"/avatars/girl-8.png",revision:"fea5678296585f6c7a79e7fd91e918b1"},{url:"/avatars/girl-9.png",revision:"a7fb44f0e633738c5ac095df34eb1611"},{url:"/favicon-16x16.png",revision:"101faf4a061027e02e269e8dbcf48c17"},{url:"/favicon.ico",revision:"c6ca43d4be6252ace49ecd2af7efd4cd"},{url:"/icon512_maskable.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/icon512_rounded.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/logo-512x512.png",revision:"40b367ecadf4623417eb90880a36f9de"},{url:"/logo.png",revision:"58d892a2ca37359b3544a825a4017628"},{url:"/manifest.json",revision:"473c423be9a63fc62d974091e3460e82"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
