importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js");

self.__precacheManifest = [
  {
    "url": "css/styles.css",
    "revision": "0ae330d15501bbe9dbf456c652bc42d8"
  },
  {
    "url": "data/restaurants.json",
    "revision": "500a3defff288a163f63f80b48025716"
  },
  {
    "url": "img/1.jpg",
    "revision": "cc074688becddd2725114187fba9471c"
  },
  {
    "url": "img/10.jpg",
    "revision": "2bd68efbe70c926de6609946e359faa2"
  },
  {
    "url": "img/2.jpg",
    "revision": "759b34e9a95647fbea0933207f8fc401"
  },
  {
    "url": "img/3.jpg",
    "revision": "81ee36a32bcfeea00db09f9e08d56cd8"
  },
  {
    "url": "img/4.jpg",
    "revision": "23f21d5c53cbd8b0fb2a37af79d0d37f"
  },
  {
    "url": "img/5.jpg",
    "revision": "0a166f0f4e10c36882f97327b3835aec"
  },
  {
    "url": "img/6.jpg",
    "revision": "eaf1fec4ee66e121cadc608435fec72f"
  },
  {
    "url": "img/7.jpg",
    "revision": "bd0ac197c58cf9853dc49b6d1d7581cd"
  },
  {
    "url": "img/8.jpg",
    "revision": "6e0e6fb335ba49a4a732591f79000bb4"
  },
  {
    "url": "img/9.jpg",
    "revision": "ba4260dee2806745957f4ac41a20fa72"
  },
  {
    "url": "index.html",
    "revision": "cba11e3ac2d79ad42bb8ea4a7d33e0e7"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "7dee6f58f72d2c1c5cf8076625235469"
  },
  {
    "url": "js/main.js",
    "revision": "fa2b43fcaa37188775060da51a44d2d1"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "804a3ffe0d4149321c1c5130ef062882"
  },
  {
    "url": "restaurant.html",
    "revision": "f97589723ff16f6e9607d80c8b28c271"
  },
].concat(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /restaurant\.html\??(?:&?[^=&]*=[^=&]*)*/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});