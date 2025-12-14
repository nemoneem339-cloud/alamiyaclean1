// ============================================
// Service Worker - العالمية كلين
// ============================================
// يوفر تجربة أوفلاين ويسرّع تحميل الصفحات

const CACHE_NAME = 'alamiya-clean-v1';
const OFFLINE_URL = '/';

// الملفات الأساسية للتخزين المؤقت
const PRECACHE_ASSETS = [
    '/',
    '/services',
    '/about',
    '/contact',
    '/favicon.svg',
    '/manifest.json',
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 تخزين الملفات الأساسية...');
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

// تفعيل Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('🗑️ حذف كاش قديم:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// استراتيجية الشبكة أولاً مع الرجوع للكاش
self.addEventListener('fetch', (event) => {
    // تجاهل الطلبات غير GET
    if (event.request.method !== 'GET') return;

    // تجاهل الطلبات الخارجية
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // نسخ الاستجابة للكاش
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(async () => {
                // الرجوع للكاش عند فشل الشبكة
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                // إذا كان طلب صفحة HTML، أظهر الصفحة الرئيسية
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match(OFFLINE_URL);
                }

                return new Response('غير متاح أوفلاين', { status: 503 });
            })
    );
});
