import 'normalize.css'
import './style.css'
import * as PIXI from 'pixi.js'
import helloWorld from './playground/hello-world'

const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window
})

// @ts-expect-error dev tools: https://chromewebstore.google.com/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon
globalThis.__PIXI_APP__ = app

document.body.appendChild(app.view as unknown as Node)

helloWorld(app)
