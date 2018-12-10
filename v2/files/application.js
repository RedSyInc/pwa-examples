"use strict";

(function () {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/pwa-examples/v2/sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    var deferredPrompt;

    window.addEventListener('beforeinstallprompt', function (e) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        showAddToHomeScreen();

    });

    function showAddToHomeScreen() {

        var a2hsBtn = document.querySelector(".button1");
        var a2hsBtn2 = document.querySelector(".button2");

        a2hsBtn.style.display = "flex";
        a2hsBtn2.style.display = "flex";

        a2hsBtn.addEventListener("click", addToHomeScreen);
        a2hsBtn2.addEventListener("click", addToHomeScreen);

    }

    function addToHomeScreen() {

        var a2hsBtn = document.querySelector(".button1");
        var a2hsBtn2 = document.querySelector(".button2");

        // hide our user interface that shows our A2HS button
        a2hsBtn.style.display = 'flex';
        a2hsBtn2.style.display = 'flex';

        if (deferredPrompt) {
            // Show the prompt
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice
                .then(function (choiceResult) {

                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }

                    deferredPrompt = null;

                });

        }

    }

    // showAddToHomeScreen();

    window.addEventListener('appinstalled', function (evt) {
        console.log('a2hs', 'installed');
    });


})();