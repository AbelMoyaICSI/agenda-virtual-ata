// ============================================================================
// SERVICE WORKER - AGENDA VIRTUAL ATA
// Maneja notificaciones push y caché para PWA
// ============================================================================

const CACHE_NAME = 'agenda-ata-v2';
const OFFLINE_URL = '/offline.html';

// Archivos a cachear para funcionamiento offline básico
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ===== INSTALACIÓN DEL SERVICE WORKER =====
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cacheando archivos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Instalación completada');
        return self.skipWaiting();
      })
  );
});

// ===== ACTIVACIÓN =====
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('🗑️ Eliminando caché antiguo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activado y controlando');
      return self.clients.claim();
    })
  );
});

// ===== FETCH - Estrategia Network First con fallback a cache =====
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requests de Supabase, APIs externas y extensiones de Chrome
  const url = event.request.url;
  if (url.includes('supabase.co') || 
      url.includes('googleapis.com') ||
      url.startsWith('chrome-extension://') ||
      url.startsWith('moz-extension://')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Solo cachear respuestas válidas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clonar la respuesta para guardar en cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si falla la red, buscar en cache
        return caches.match(event.request);
      })
  );
});

// ===== 🔔 RECEPCIÓN DE NOTIFICACIONES PUSH =====
self.addEventListener('push', (event) => {
  console.log('📬 Push recibido:', event);
  
  let data = {
    title: '📚 Agenda Virtual ATA',
    body: 'Tienes una nueva notificación',
    icon: '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
    badge: '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
    tag: 'agenda-ata-notification',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };
  
  // Parsear datos del push si vienen
  if (event.data) {
    try {
      const payload = event.data.json();
      data = { ...data, ...payload };
    } catch (e) {
      data.body = event.data.text();
    }
  }
  
  console.log('🔔 Mostrando notificación:', data.title);
  
  // Notificar a todos los clientes activos para que reproduzcan el DING
  event.waitUntil(
    Promise.all([
      // 1. Mostrar notificación del sistema
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
        badge: data.badge || '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
        tag: 'ata-' + Date.now(), // Tag único para que siempre suene
        requireInteraction: data.requireInteraction !== false,
        vibrate: [200, 100, 200, 100, 200],
        silent: false,
        renotify: true,
        data: data.data || { url: '/' },
        actions: [
          { action: 'open', title: 'Ver ahora' },
          { action: 'close', title: 'Cerrar' }
        ]
      }),
      
      // 2. Enviar mensaje a clientes para reproducir DING
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'PUSH_RECEIVED',
            title: data.title,
            body: data.body,
            playSound: true
          });
        });
      })
    ])
  );
});

// ===== CLICK EN NOTIFICACIÓN =====
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Click en notificación:', event.notification.tag);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  if (event.action === 'close') {
    return;
  }
  
  // Abrir o enfocar la ventana de la app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una ventana abierta, enfocarla
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // Si no hay ventana, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ===== CIERRE DE NOTIFICACIÓN =====
self.addEventListener('notificationclose', (event) => {
  console.log('❌ Notificación cerrada:', event.notification.tag);
});

// ===== SINCRONIZACIÓN EN BACKGROUND (futuro) =====
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'sync-incidencias') {
    event.waitUntil(
      // Aquí se pueden sincronizar incidencias pendientes
      Promise.resolve()
    );
  }
});

console.log('🚀 Service Worker cargado - Agenda Virtual ATA');
