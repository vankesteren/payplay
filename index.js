const contentElement = document.getElementById("content");

function log(message) {
    contentElement.innerHTML += "<p>";
    contentElement.innerHTML += message;
    contentElement.innerHTML += "</p>";
}

if ("NDEFReader" in window) {
    log("Browser supported");
    const ndef = new NDEFReader();
    ndef.scan().then(() => {
        log("Scan started successfully.");
        ndef.onreadingerror = () => {
          log("Cannot read data from the NFC tag. Try another one?");
        };
        ndef.onreading = event => {
          log("NDEF message read.");
        };
      }).catch(error => {
        log(`Error! Scan failed to start: ${error}.`);
      });
} else {
    log("Browser not supported");
}