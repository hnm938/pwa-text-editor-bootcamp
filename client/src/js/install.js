let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the browser's default prompt
  event.preventDefault();

  // Store the event to trigger it later
  deferredPrompt = event;

  // Show the install button
  const installButton = document.getElementById("installButton");
  installButton.style.display = "block";

  // Handle button click to install the PWA
  installButton.addEventListener("click", () => {
    // Show the browser's install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User declined the PWA installation");
      }

      // Reset the prompt
      deferredPrompt = null;
      installButton.style.display = "none";
    });
  });
});
