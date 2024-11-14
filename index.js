function log(message) {content.innerHTML += `<p>${message}</p>`};

async function onclick() {
  startButton.style.display = "none";
  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("Scan started");
    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });
    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);
    });
  }
  catch (error) {
    log("Argh! " + error);
  }
}

if ("NDEFReader" in window) {
  log("Browser supported");
  startButton.addEventListener("click", onclick);
} else {
  log("Browser not supported");
  startButton.style.display = "none";
}


