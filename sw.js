// Change this to your repository name
var GHPATH = '/payplay';

// Choose a different app prefix name
var APP_PREFIX = 'payplay_';

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_04';

// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/index.css`,
  `${GHPATH}/index.js`,
  `${GHPATH}/assets/cash-register-kaching-sound-effect-125042.mp3`
  `${GHPATH}/assets/nfc.svg`
]