// 이 서비스워커는 이전 버전의 캐시 문제를 해결하기 위해
// 스스로 모든 캐시를 지우고 등록 해제됩니다.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
      await self.registration.unregister();
    })()
  );
});
