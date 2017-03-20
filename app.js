const {Builder, By, until} = require('selenium-webdriver')
const fs = require('fs')

const URL = ''
const WAITING_MILLISECONDS = 20000
const CAPUTURE_TIMES = 10

let driver = new Builder()
.usingServer('http://0.0.0.0:32768/wd/hub')
.withCapabilities({
  'browserName': 'chrome'
})
.build()

driver.get(URL)

let i = 0;
console.log('start capturing.')
let id = setInterval(() => {
  i++;
  driver.takeScreenshot().then((data) => {
    fs.writeFile('./ss' + i + '.jpg', data.replace(/^data:image\/jpg;base64,/,''), 'base64', function(err) {
      if(err) throw err
    })
  })
  console.log('screeenshot' + i);
  if (i > CAPUTURE_TIMES) {
    clearInterval(id)
    driver.quit()
  }
}, WAITING_MILLISECONDS)
