// Get submit button
const submit = document.getElementById("submit");

// All tasks will be done in the background.js file
// popup.js is only used to communicate with the user directly
// Setting up a long-lived communication between popup.js and background.js
var port = chrome.runtime.connect({
    name: "popup-background"
});

// Submit contributors_info input to background.js as JSON
function sendInput() {
    // Get contributors info
    const contributors_info = JSON.parse(document.getElementById("contributor_information").value)
    // Send contributors info to background
    port.postMessage({contributors_info: contributors_info});
}

// Send popup.html input to background.js for autofilling
submit.addEventListener('click', sendInput);

// Close popup window if background.js is finished
port.onMessage.addListener(function(msg) {
    if (msg.closePopup) window.close();
  });