self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  event.waitUntil(self.registration.showNotification(data.title || 'Project 0→100', {
    body: data.body || 'You have a bill reminder.',
    tag: data.tag || 'bill-reminder',
    data: { url: data.url || '/debt.html' }
  }));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || '/debt.html';
  event.waitUntil(clients.openWindow(url));
});
