// First, some global variables

// Colours
const BGCOLS = ["red", "green", "blue", "pink", "orange", "purple", "magenta", "yellow"];
const FGCOLS = ["white", "white", "white", "black", "black", "white", "white", "black"];

// Amounts
const EUROS = ["21", "15", "1", "1", "3", "3", "2", "7", "14", "9", "8"];
const CENTS = ["50", "95", "20", "00", "01", "41", "50", "95", "99", "00"];

// Global variable to check if transaction is currently processing
var PROCESSING = false;

// Then initialize a sound element we can play
// Sound Effect by Modestas123123 from Pixabay
const kachingelement = new Audio("assets/cash-register-kaching-sound-effect-125042.mp3");
kachingelement.playbackRate = 1.7;

// Some required functions

// a delay promise that we can await for a nice delay
// https://stackoverflow.com/a/47480429
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// A message log that prints to the bottom of the screen
function log(message) {logging.innerHTML = `<p>${message}</p>`};

// Change to random background color and associated contrasting text color
function changeColor() {
  let idx = Math.floor(Math.random() * FGCOLS.length);
  document.documentElement.style.setProperty('--base-color', BGCOLS[idx]);
  document.documentElement.style.setProperty('--contrast-color', FGCOLS[idx]);
}

// Show a random amount of euros and cents
function showAmount() {
  let idx1 = Math.floor(Math.random() * EUROS.length);
  let idx2 = Math.floor(Math.random() * CENTS.length);
  content.innerHTML = `€${EUROS[idx1]},${CENTS[idx2]}`
}

// "process" a transaction if we are currently ready to do that
async function processTransaction() {
  if (!PROCESSING) {
    PROCESSING = true;
    kachingelement.play();
    content.innerHTML = "THANK YOU!";
    changeColor();
    await delay(2000);
    showAmount();
    log("Your card please!");
    PROCESSING = false;
  } 
}

// The main async function
async function main() {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("Starting...");
      changeColor();
      showAmount();
      log("Your card please!");
      ndef.addEventListener("readingerror", async () => {
        log("Card read!");
        await processTransaction();
      });
      ndef.addEventListener("reading", async ({ message, serialNumber }) => {
        log(`Card ID: ${serialNumber}`);
        await processTransaction();
      });
    }
    catch (error) {
      log("Error! " + error);
    }
}

// fallback / debug
async function fallback() {
  startButton.style.display = "none";
  log("Starting...");
  changeColor();
  showAmount();
  log("Your card please!");
  await delay(200);
  content.addEventListener("click", async () => {
    log("You paid!");
    await processTransaction();
  })
}

// Actually register the functions
if ("NDEFReader" in window) {
  log("Browser supported");
  startButton.addEventListener("click", async () => { await main() });
} else {
  log("Browser not supported");
  startButton.addEventListener("click", async () => { await fallback() });
}


