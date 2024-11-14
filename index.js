const delay = (ms) => new Promise(res => setTimeout(res, ms));
const bgcols = ["red", "green", "blue", "pink", "orange", "purple", "magenta", "yellow"];
const fgcols = ["white", "white", "white", "black", "black", "white", "white", "black"];

const euros = ["21", "15", "1", "1", "3", "3", "2", "7", "14", "9", "8"]
const cents = ["50", "95", "20", "00", "01", "41", "50", "95", "99", "00"];

function log(message) {logging.innerHTML = `<p>${message}</p>`};
function changeColor() {
  let idx = Math.floor(Math.random() * fgcols.length);
  document.documentElement.style.setProperty('--base-color', bgcols[idx]);
  document.documentElement.style.setProperty('--contrast-color', fgcols[idx]);
}
function showAmount() {
  let idx1 = Math.floor(Math.random() * euros.length);
  let idx2 = Math.floor(Math.random() * cents.length);
  content.innerHTML = `€${euros[idx1]},${cents[idx2]}`
}

async function processTransaction() {
  content.innerHTML = "THANK YOU!";
  changeColor();
  await delay(2000);
  showAmount();
  log("Your card please!");
}

async function main() {
  startButton.style.display = "none";
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("Starting...");
      changeColor();
      showAmount();
      log("Your card please!");
      ndef.addEventListener("readingerror", () => {
        log("Card read!");
        processTransaction()
      });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`Card ID: ${serialNumber}`);
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


