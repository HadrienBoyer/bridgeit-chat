"use strict";function init(){navigator.onLine||(document.querySelector(".page-status").innerHTML="offline"),"Notification"in window&&(console.log("The Notifications API is supported"),Notification.requestPermission().then(e=>{"granted"===e&&(console.log("The user accepted the notification"),new Notification("Hello World!"))}))}document.addEventListener("DOMContentLoaded",init,!1);