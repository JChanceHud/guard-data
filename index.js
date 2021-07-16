const express = require('express')
const loadImages = require('./load-images')

const cachedImages = {
  texas: undefined,
  hopkins: undefined,
}

// once per hour take a screenshot and cache it
setInterval(updateCache, 60 * 60 * 1000)
updateCache()

async function updateCache() {
  const [ hopkins, texas ] = await loadImages()
  cachedImages['texas'] = texas
  cachedImages['hopkins'] = hopkins
}

const app = express()

app.get('/', async (req, res) => {
  res.send(`
    <html>
    <body>
      <div style="display: flex; flex-direction: column">
        <img src="/hopkins.jpg" />
        <div style="height: 8px" />
        <img src="/texas.jpg" />
      </div>
    </body>
    </html>
    `)
  res.end()
})

app.get('/texas.jpg', async (req, res) => {
  res.end(cachedImages['texas'])
})

app.get('/hopkins.jpg', async (req, res) => {
  res.end(cachedImages['hopkins'])
})

app.listen(4000)
