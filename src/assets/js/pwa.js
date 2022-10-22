'use strict';

document.addEventListener('DOMContentLoaded', init, false);

function init() {
  if ('serviceWorker' in navigator && navigator.onLine) {

/*The Workbox libraries were copied to /Users/hadrien/Sites/localhost-https/bridgeit/bridgeit-chat/build/workbox-v6.5.4
Add a call to workbox.setConfig({modulePathPrefix: '...'}) to your service worker to use these local libraries.
See https://goo.gl/Fo9gPX for further documentation.*/

    navigator.serviceWorker.register('/dist/sw.js')
      .then((reg) => {
        console.log('Service worker registered -->', reg);
      }, (err) => {
        console.error('Service worker not registered -->', err);
      });
  }
}
