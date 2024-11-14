const delay = (ms) => new Promise(res => setTimeout(res, ms));
const bgcols = ["red", "green", "blue", "pink", "orange", "purple", "magenta", "yellow"];
const fgcols = ["white", "white", "white", "black", "black", "white", "white", "black"];

const amounts = ["21,50", "3,95", "6,20", "4,00", "18,01", "33,41", "15,50", "1,95"];

function log(message) {logging.innerHTML += `<p>${message}</p>`};
function changeColor() {
  let idx = Math.floor(Math.random() * fgcols.length);
  document.documentElement.style.setProperty('--base-color', bgcols[idx]);
  document.documentElement.style.setProperty('--contrast-color', fgcols[idx]);
}
function showAmount() {
  let idx = Math.floor(Math.random() * amounts.length);
  content.innerHTML = `€${amounts[idx]}`
}

async function processTransaction() {
  content.innerHTML = "THANK YOU!"
  changeColor()
  await delay(2000)
  showAmount()
}

async function main() {
  startButton.style.display = "none";
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("Starting...");
      ndef.addEventListener("readingerror", () => {
        log("Card could not be read.");
        processTransaction()
      });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);
        processTransaction()
      });
    }
    catch (error) {
      log("Error! " + error);
    }
}

// Actually register the functions
if ("NDEFReader" in window) {
  log("Browser supported");
  startButton.addEventListener("click", async () => { await main() });
} else {
  log("Browser not supported");
  startButton.addEventListener("click", async () => { await processTransaction() });
}


