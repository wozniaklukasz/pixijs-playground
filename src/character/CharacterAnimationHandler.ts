import type * as PIXI from 'pixi.js'
import CharacterSpriteRenderer from './CharacterSpriteRenderer'
import { type CharacterSpritesKeys } from './types'

class CharacterAnimationHandler {
  private readonly animationSpeed: number
  private readonly currentAnimation: Record<string, PIXI.AnimatedSprite>
  private readonly characterSpriteRenderer: CharacterSpriteRenderer

  constructor (key: CharacterSpritesKeys) {
    this.animationSpeed = 0.1
    this.currentAnimation = {}

    this.characterSpriteRenderer = new CharacterSpriteRenderer(key)
  }

  async init () {
    // this.currentAnimation.stay = await this.animate(0)
    this.currentAnimation.moveUp = await this.animate(4)
    this.currentAnimation.moveDown = await this.animate(0)
    this.currentAnimation.moveLeft = await this.animate(6)
    this.currentAnimation.moveRight = await this.animate(2)
    this.currentAnimation.moveLeftUp = await this.animate(5)
    this.currentAnimation.moveRightUp = await this.animate(3)
    this.currentAnimation.moveLeftDown = await this.animate(7)
    this.currentAnimation.moveRightDown = await this.animate(1)

    return this.currentAnimation
  }

  private async animate (animationName: number): Promise<PIXI.AnimatedSprite> {
    const currentAnimation = await this.characterSpriteRenderer.renderSprite(animationName)
    currentAnimation.animationSpeed = this.animationSpeed
    return currentAnimation
  }

  private stopAll () {
    Object.values(this.currentAnimation).forEach((animation) => {
      animation.stop()
      animation.visible = false
    })
  }

  async stay () {
    Object.values(this.currentAnimation).forEach((animation) => {
      animation.gotoAndStop(0)
      // animation.visible = false
    })
  }

  async moveLeftUp () {
    this.stopAll()

    this.currentAnimation.moveLeftUp.play()
    this.currentAnimation.moveLeftUp.visible = true
  }

  async moveUp () {
    this.stopAll()

    this.currentAnimation.moveUp.play()
    this.currentAnimation.moveUp.visible = true
  }

  async moveRightUp () {
    this.stopAll()

    this.currentAnimation.moveRightUp.play()
    this.currentAnimation.moveRightUp.visible = true
  }

  async moveLeftDown () {
    this.stopAll()

    this.currentAnimation.moveLeftDown.play()
    this.currentAnimation.moveLeftDown.visible = true
  }

  async moveRightDown () {
    this.stopAll()

    this.currentAnimation.moveRightDown.play()
    this.currentAnimation.moveRightDown.visible = true
  }

  async moveDown () {
    this.stopAll()

    this.currentAnimation.moveDown.play()
    this.currentAnimation.moveDown.visible = true
  }

  async moveLeft () {
    this.stopAll()

    this.currentAnimation.moveLeft.play()
    this.currentAnimation.moveLeft.visible = true
  }

  async moveRight () {
    this.stopAll()

    this.currentAnimation.moveRight.play()
    this.currentAnimation.moveRight.visible = true
  }

  // Additional methods for handling different animations can be added here
}

export default CharacterAnimationHandler
