import * as PIXI from 'pixi.js'
import { pixiApp } from '../PixiApp'
import CharacterAnimationHandler from './CharacterAnimationHandler'

class Character {
  private readonly app: PIXI.Application
  private readonly animationHandler: CharacterAnimationHandler

  constructor () {
    this.app = pixiApp()
    // this.animationHandler = new CharacterAnimationHandler('bodyMove')
    // this.animationHandler = new CharacterAnimationHandler('knight')
    this.animationHandler = new CharacterAnimationHandler('civilian')
  }

  async init () {
    const container = new PIXI.Container()
    container.x = this.app.screen.width / 2
    container.y = this.app.screen.height / 2
    this.app.stage.addChild(container)

    const animatedSprites = await this.animationHandler.init()

    Object.values(animatedSprites).forEach((animatedSprite) => {
      container.addChild(animatedSprite)
    })

    this.setupKeyboardControls()
  }

  private setupKeyboardControls () {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener('keydown', async (e) => {
      switch (e.key) {
        case 'q':
          await this.animationHandler.moveLeftUp()
          break
        case 'w':
          await this.animationHandler.moveUp()
          break
        case 'e':
          await this.animationHandler.moveRightUp()
          break
        case 'a':
          await this.animationHandler.moveLeft()
          break
        case 'd':
          await this.animationHandler.moveRight()
          break
        case 'z':
          await this.animationHandler.moveLeftDown()
          break
        case 'x':
          await this.animationHandler.moveDown()
          break
        case 'c':
          await this.animationHandler.moveRightDown()
          break
      }
    })
  }
}

export default Character
