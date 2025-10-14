// sw-register.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.updated.js')
      .then(reg => console.log('SW registered', reg.scope))
      .catch(err => console.warn('SW registration failed', err));
  });
}
