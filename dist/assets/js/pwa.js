"use strict";function init(){"serviceWorker"in navigator&&navigator.onLine&&navigator.serviceWorker.register("./dist/sw.js").then(e=>{console.log("Service worker registered --\x3e",e)},e=>{console.error("Service worker not registered --\x3e",e)})}document.addEventListener("DOMContentLoaded",init,!1);