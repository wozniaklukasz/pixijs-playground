import * as PIXI from 'pixi.js'

class PixiApp {
  private static instance: PixiApp
  private readonly app: PIXI.Application

  private constructor () {
    this.app = new PIXI.Application({
      background: '#1099bb',
      resizeTo: window
    })

    // @ts-expect-error For PIXI dev tools
    globalThis.__PIXI_APP__ = this.app

    document.body.appendChild(this.app.view as unknown as Node)
  }

  static getApp (): PIXI.Application {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PixiApp.instance) {
      PixiApp.instance = new PixiApp()
    }
    return PixiApp.instance.app
  }
}

export const pixiApp = PixiApp.getApp.bind(PixiApp)
