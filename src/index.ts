import 'normalize.css'
import './style.css'
import * as PIXI from 'pixi.js'
import helloWorld from './playground/hello-world'
import containerMasking from './playground/container-masking'
import spriteSheet from './playground/sprite-sheet'
import bodyMove from './playground/body-move'

class PixiApp {
  private readonly app: PIXI.Application

  constructor () {
    this.app = new PIXI.Application({
      background: '#1099bb',
      resizeTo: window
    })

    // @ts-expect-error For PIXI dev tools
    globalThis.__PIXI_APP__ = this.app

    document.body.appendChild(this.app.view as unknown as Node)
  }

  async init () {
    // helloWorld(this.app);
    // containerMasking(this.app);
    // await spriteSheet(this.app)
    await bodyMove(this.app)
  }
}

const pixiApp = new PixiApp()
void pixiApp.init()
