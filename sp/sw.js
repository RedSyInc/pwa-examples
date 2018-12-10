'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html","files/main.css"]);

toolbox.router.get('/files/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
