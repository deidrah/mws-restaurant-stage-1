importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

self.__precacheManifest = [
  {
    "url": "css/styles.css",
    "revision": "044d68ca001f34c840a6ec647a3827d4"
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
    "url": "img/favicon-1024.png",
    "revision": "463362b706423411160b163ed295643e"
  },
  {
    "url": "img/favicon-256.png",
    "revision": "cfea35d84c957ed0e6fd7fe5d4a7ab6e"
  },
  {
    "url": "index.html",
    "revision": "17593e426a4b6ca87753747af12e1783"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "182a569f743164f0d8b59825ca1c3c4b"
  },
  {
    "url": "js/main.js",
    "revision": "9c35ab7ccc8ea53e71480ad690da0bfe"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "9557558a1e4fe163925150fb18d5bb00"
  },
  {
    "url": "manifest.json",
    "revision": "cd74017a8b427843891e5b7116448555"
  },
  {
    "url": "restaurant.html",
    "revision": "83c0945b2031374c17aaa74b1a5d9db1"
  },
].concat(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /restaurant\.html\??(?:&?[^=&]*=[^=&]*)*/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic|unpkg|cloudflare)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
