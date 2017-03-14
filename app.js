const {Builder, By, until} = require('selenium-webdriver')
const fs = require('fs')

let driver = new Builder()
.usingServer('http://0.0.0.0:32768/wd/hub')
.withCapabilities({
  'browserName': 'chrome'
})
.build()

driver.get('http://www.google.com/ncr')
driver.findElement(By.name('q')).sendKeys('webdriver')
driver.findElement(By.name('btnG')).click()
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.takeScreenshot().then((data) => {
  fs.writeFile('./test.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
    if(err) throw err
  })
})
driver.quit()
