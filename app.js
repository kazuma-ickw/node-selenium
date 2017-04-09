const {Builder, By, until} = require('selenium-webdriver')
const fs = require('fs')
const util = require('util')
const URL = require('url').URL

if (process.argv[2] == undefined) {
  console.log('argument 1 is undefined. Please set URL.')
  process.exit()
}

let targetUrl
try {
  targetUrl = new URL(process.argv[2])
} catch(err) {
  console.log(err.stack)
  process.exit()
}

console.log('target is: ' + targetUrl.href)
const WAITING_MILLISECONDS = 20000
const CAPUTURE_TIMES = 10
const SAVE_DIR = '/tmp'

let driver = new Builder()
.usingServer('http://0.0.0.0:32768/wd/hub')
.withCapabilities({
  'browserName': 'chrome'
})
.build()

driver.get(targetUrl.href)

let i = 0;
console.log('start capturing.')
let id = setInterval(() => {
  i++;
  driver.takeScreenshot().then((data) => {
    fs.writeFile(util.format('%s/ss%d.jpg', SAVE_DIR, i), data.replace(/^data:image\/jpg;base64,/,''), 'base64', function(err) {
      if(err) throw err
    })
  })
  console.log('screeenshot' + i);
  if (i > CAPUTURE_TIMES) {
    clearInterval(id)
    driver.quit()
  }
}, WAITING_MILLISECONDS)
