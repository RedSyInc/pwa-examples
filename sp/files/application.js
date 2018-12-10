"use strict"; 

(function () {

  var deferredPrompt;
    console.log('asdasd1')


    window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log('asdasd2')
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    showAddToHomeScreen();

  });

function showAddToHomeScreen() {

  var a2hsBtn = document.querySelector(".button1");

  a2hsBtn.style.display = "flex";

  a2hsBtn.addEventListener("click", addToHomeScreen);
    console.log('asdasd3')


}

  function addToHomeScreen() {

    var a2hsBtn = document.querySelector(".button1");

    // hide our user interface that shows our A2HS button
    a2hsBtn.style.display = 'flex';

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

  showAddToHomeScreen();

  window.addEventListener('appinstalled', function (evt) {
    console.log('a2hs', 'installed');
  });


})();