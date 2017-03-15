const {Builder, By, until} = require('selenium-webdriver')
const fs = require('fs')

const URL = ''
let driver = new Builder()
.usingServer('http://0.0.0.0:32768/wd/hub')
.withCapabilities({
  'browserName': 'chrome'
})
.build()

driver.get(URL)

var i = 0;
driver.takeScreenshot().then((data) => {
  fs.writeFile('./ss' + i + '.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
    if(err) throw err
  })
})

var id = setInterval(() => {
  i++;
  driver.takeScreenshot().then((data) => {
    fs.writeFile('./ss' + i + '.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
      if(err) throw err
    })
  })
  console.log('screeenshot' + i);
  if (i > 10) {
    clearInterval(id)
    driver.quit()
  }
}, 20000)
