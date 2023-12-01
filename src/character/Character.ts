import * as PIXI from 'pixi.js'
import { pixiApp } from '../PixiApp'
import CharacterAnimationHandler from './CharacterAnimationHandler'

class Character {
  private readonly app: PIXI.Application
  private readonly animationHandler: CharacterAnimationHandler

  constructor () {
    this.app = pixiApp()
    this.animationHandler = new CharacterAnimationHandler()
  }

  async init () {
    console.log('Character init')
    const container = new PIXI.Container()
    container.x = this.app.screen.width / 2
    container.y = this.app.screen.height / 2
    this.app.stage.addChild(container)

    const animatedSprite = await this.animationHandler.stay()
    container.addChild(animatedSprite)

    this.setupKeyboardControls()
  }

  private setupKeyboardControls () {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener('keydown', async (e) => {
      switch (e.key) {
        case 'w':
          await this.animationHandler.moveUp()
          break
        case 's':
          await this.animationHandler.moveDown()
          break
        case 'a':
          await this.animationHandler.moveLeft()
          break
        case 'd':
          await this.animationHandler.moveRight()
          break
      }
    })
  }
}

export default Character
