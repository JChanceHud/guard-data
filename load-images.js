const puppeteer = require('puppeteer')

module.exports = async function main(site) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.DOCKER ? '/usr/bin/chromium-browser' : undefined,
    defaultViewport: {
      width: 1440,
      height: 900,
    }
  })
  const images = await Promise.all([
    screenshotHopkins(browser),
    screenshotTexas(browser),
  ])
  await browser.close()
  return images
}

async function screenshotHopkins(browser) {
  const source = 'https://www.arcgis.com/apps/dashboards/bda7594740fd40299423467b48e9ecf6'
  const page = await browser.newPage()
  await page.goto(source, {
    timeout: 600000,
    waitUntil: 'networkidle0',
  })
  await new Promise(r => setTimeout(r, 30000))
  return await page.screenshot({
    quality: 90,
    type: 'jpeg',
  })
}

async function screenshotTexas(browser) {
  const source = 'https://txdshs.maps.arcgis.com/apps/dashboards/ed483ecd702b4298ab01e8b9cafc8b83'
  const page = await browser.newPage()
  await page.goto(source, {
    timeout: 600000,
    waitUntil: 'networkidle0',
  })
  const tabClass = '.tab-title.flex-horizontal.align-items-center'
  const tabs = await page.$$(tabClass)
  // open the second tab
  await tabs[1].click()
  await new Promise(r => setTimeout(r, 30000))
  return await page.screenshot({
    quality: 90,
    type: 'jpeg',
  })
}
