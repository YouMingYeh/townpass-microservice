const webPush = require('web-push');

const vapidKeys = {
  publicKey:
    'XXX',
  privateKey: 'XXX',
};

webPush.setVapidDetails(
  'mailto:email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);


const pushSubscription = {
  endpoint:
    "XXX",
  keys: {
    p256dh:
      'XXX',
    auth: 'XXX',
  },
};

const payload = JSON.stringify({
  message: '笨笨奕萱',
  body: '和志同道合的夥伴來場 Coffee Chat！',
  icon: 'https://example.com/favicon.ico',
  url: 'https://example.com',
});

webPush
  .sendNotification(pushSubscription, payload)
  .then(response => console.log('Notification sent successfully:', response))
  .catch(error => console.error('Error sending notification:', error));
