import CharacterAnimationHandler from './CharacterAnimationHandler'
import { type CharacterSpritesKeys } from './types'

class Character {
  private readonly animationHandler: CharacterAnimationHandler

  constructor (key: CharacterSpritesKeys) {
    this.animationHandler = new CharacterAnimationHandler(key)
  }

  async init () {
    const animatedSprites = await this.animationHandler.init()

    this.setupKeyboardControls()

    return animatedSprites
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

    window.addEventListener('keyup', async (e) => {
      switch (e.key) {
        case 'q':
        case 'w':
        case 'e':
        case 'a':
        case 'd':
        case 'z':
        case 'x':
        case 'c':
          await this.animationHandler.stay()
          break
      }
    })
  }
}

export default Character
