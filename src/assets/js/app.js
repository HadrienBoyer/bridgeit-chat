/*
Project Name: BridgeIt • Chat App
Author: Omiklo
Version: 1.0.0
Website: https://omiklo.com/
Contact: hello@omiklo.com
File: Main Js File
*/

(function () {
  "use strict";

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register('/dist/sw.js').then(
        (registration) => {
          console.log('Service worker registration succeeded:', registration)
        },
          /*catch*/ (error) => {
            console.log('Service worker registration failed:', error)
        }
      )
    } else {
      console.log('Service workers are not supported.')
    }
  }

  function initComponents() {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

  function initSettings() {
    var body = document.getElementsByTagName("body")[0];
    var lightDarkBtn = document.querySelectorAll(".light-dark-mode");
    if (lightDarkBtn && lightDarkBtn.length) {
      lightDarkBtn.forEach(function (item) {
        item.addEventListener("click", function (event) {
          if (
            body.hasAttribute("data-layout-mode") &&
            body.getAttribute("data-layout-mode") == "dark"
          ) {
            document.body.setAttribute("data-layout-mode", "light");
          } else {
            document.body.setAttribute("data-layout-mode", "dark");
          }
        });
      });
    }
  }

  function init() {
    initServiceWorker();
    initComponents();
    initSettings();
    Waves.init();
  }

  init();
})();