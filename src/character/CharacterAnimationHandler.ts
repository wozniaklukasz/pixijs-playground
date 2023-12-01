import type * as PIXI from 'pixi.js'
import CharacterSpriteRenderer from './CharacterSpriteRenderer'

class CharacterAnimationHandler {
  private readonly spriteRenderer: CharacterSpriteRenderer
  private readonly animationSpeed: number
  private currentAnimation: PIXI.AnimatedSprite | null = null

  constructor () {
    console.log('CharacterAnimationHandler constructor')
    this.spriteRenderer = new CharacterSpriteRenderer({
      path: 'assets/body-move.jpeg',
      width: 480,
      height: 880,
      cols: 8,
      rows: 8
    })
    this.animationSpeed = 0.2
  }

  private async animate (animationName: number): Promise<PIXI.AnimatedSprite> {
    console.log('animate', animationName)

    this.currentAnimation = await this.spriteRenderer.renderSprite(animationName)
    this.currentAnimation.animationSpeed = this.animationSpeed
    this.currentAnimation.play()
    return this.currentAnimation
  }

  async stay (): Promise<PIXI.AnimatedSprite> {
    return await this.animate(0)
  }

  async moveUp (): Promise<PIXI.AnimatedSprite> {
    return await this.animate(1)
  }

  async moveDown (): Promise<PIXI.AnimatedSprite> {
    return await this.animate(2)
  }

  async moveLeft (): Promise<PIXI.AnimatedSprite> {
    return await this.animate(3)
  }

  async moveRight (): Promise<PIXI.AnimatedSprite> {
    return await this.animate(4)
  }

  // Additional methods for handling different animations can be added here
}

export default CharacterAnimationHandler
