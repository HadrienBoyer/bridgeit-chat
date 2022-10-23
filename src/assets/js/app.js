/*
Project Name: BridgeIt • Chat App
Author: Omiklo
Version: 1.0.0
Website: https://omiklo.com/
Contact: hello@omiklo.com
File: Main Js File
*/
document.addEventListener('DOMContentLoaded', init, false);

(function () {
  "use strict";

  function initServiceWorkers() {

    if ('serviceWorker' in navigator && navigator.onLine) {
      navigator
        .serviceWorker.register('../../sw.js')
        .then((reg) => {
          console.log('Service worker registered -->', reg)
        }, (err) => {
          console.error('Service worker not registered -->', err)
        })
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
    initServiceWorkers();
    initComponents();
    initSettings();
    Waves.init();
  }

  init();
})();