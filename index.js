function log(message) {logging.innerHTML += `<p>${message}</p>`};
function changecolor() {
  const bgcols = ["red", "green", "blue", "pink", "orange", "purple", "magenta"];
  const fgcols = ["white", "white", "white", "black", "black", "white", "white"];
  var idx = Math.floor(Math.random() * fgcols.length)
  document.documentElement.style.setProperty('--base-color', bgcols[idx]);
  document.documentElement.style.setProperty('--contrast-color', fgcols[idx]);
}

async function main() {
  startButton.style.display = "none";
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("Scan started");
      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
        changecolor();
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

// Actually register the functions
if ("NDEFReader" in window) {
  log("Browser supported");
  startButton.addEventListener("click", async () => { await main() });
} else {
  log("Browser not supported");
  startButton.addEventListener("click", changecolor);
}


