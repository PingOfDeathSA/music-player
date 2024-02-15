'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7786809efde5faba2c0760634264d2f5",
"assets/AssetManifest.json": "09587b96a4a19a003d6bc25046d44d0e",
"assets/assets/audios/Close_To_The_Grave.mp3": "6a4a350568d7b98c675a5b492b3e9b95",
"assets/assets/audios/Hard_Life.mp3": "72cb79b92d9432f794fcb781a5c3a450",
"assets/assets/audios/house.mp3": "52547e8cedd623d6c89c140e4e19ca87",
"assets/assets/audios/inspire.mp3": "c8541ce63795c612189559d9060d4579",
"assets/assets/audios/My_Chest_Out.mp3": "ce38a5d4a9bbb6ce32ec2ed95e65eec1",
"assets/assets/audios/Testimony.mp3": "17bc6f70fd72c7b2bd6ee16564c62290",
"assets/assets/audios/This_Forever.mp3": "3e6ee4c901421836adde9bb90dc514fc",
"assets/assets/audios/waka_wa_lerato.mp3": "acab8b45a847799923322498ac49bbb4",
"assets/assets/icons/forward.png": "f24e80593401ee557585321c52a62c5f",
"assets/assets/icons/rewind.png": "b2075c6b1d4eb49b4f044ad5bf1a2477",
"assets/assets/images/chest.jpg": "9a0d067fce80bb194b560146a2a0fa60",
"assets/assets/images/end.jpg": "4c08b4cd21aff8d1afcc7032312d4a45",
"assets/assets/images/music.jpg": "67e86079fc665870a4526d63c16c2c60",
"assets/assets/images/pause-button.png": "2dc493d7b9b77bd205a5699d42c4cc9c",
"assets/assets/images/pausef.png": "dffe2ee7b8c3dce2e952977adcb698f3",
"assets/assets/images/play-button.png": "ec7cb843efed5331e1e2413592a63cd8",
"assets/assets/images/play.png": "a6308dc4618dda95844f2ef4253b81bf",
"assets/assets/images/playf.png": "a58a747efcb8c0911262e51649f815a7",
"assets/assets/images/rap.jpg": "a6fc8f15822b7b0d0c5b3bceed05341a",
"assets/assets/images/rap2.jpg": "da235dc9471c94d92465a6cbfa815cf8",
"assets/assets/images/rap3.jpg": "085ab668fd9ecb5ae8953445a2c39c79",
"assets/assets/images/rap4.jpg": "f1166541ae6a0a17ebc28787a4079587",
"assets/assets/images/rap5.jpg": "6cc43bcf6b8df793b60a3b0cbb2d7c38",
"assets/assets/images/sunset.jpg": "f13b078455313ed9774bc06dfcda2969",
"assets/assets/images/sunset1.jpg": "1e5d34bb6ff6b3d1f799a1fae06a20a3",
"assets/assets/images/vinyl_record.png": "087ed8bd2fd87e0c49fa35aa62052f5f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/NOTICES": "12f2b0597be7ec36b2797ff86dbea95f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "139e7639823560281f262548364c768f",
"/": "139e7639823560281f262548364c768f",
"main.dart.js": "5eb1fa09c35ce999a353c20ccef866cc",
"manifest.json": "2fe00b960f575a583060b3041d97eb66",
"version.json": "7ff43205922a7c2f3ef68a2c829d2f35"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
