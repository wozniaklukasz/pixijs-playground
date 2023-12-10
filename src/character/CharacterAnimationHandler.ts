import * as PIXI from 'pixi.js'
import CharacterSpriteRenderer from './CharacterSpriteRenderer'
import { type CharacterSpritesKeys } from './types'

type Animation = 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'moveLeftUp' | 'moveRightUp' | 'moveLeftDown' | 'moveRightDown'

class CharacterAnimationHandler {
  private readonly animationSpeed: number
  private readonly animationTextures: Record<string, PIXI.Texture[]>
  private readonly characterSpriteRenderer: CharacterSpriteRenderer

  private currentAnimation: PIXI.AnimatedSprite | null = null
  private lastAnimation: Animation | null = null

  constructor (key: CharacterSpritesKeys) {
    this.animationSpeed = 0.1
    this.animationTextures = {}

    this.characterSpriteRenderer = new CharacterSpriteRenderer(key)
  }

  async init () {
    await this.preloadSprites()
    await this.initCharacter()

    return this.currentAnimation
  }

  private async preloadSprites () {
    this.animationTextures.moveUp = await this.characterSpriteRenderer.renderSprite(4)
    this.animationTextures.moveDown = await this.characterSpriteRenderer.renderSprite(0)
    this.animationTextures.moveLeft = await this.characterSpriteRenderer.renderSprite(6)
    this.animationTextures.moveRight = await this.characterSpriteRenderer.renderSprite(2)
    this.animationTextures.moveLeftUp = await this.characterSpriteRenderer.renderSprite(5)
    this.animationTextures.moveRightUp = await this.characterSpriteRenderer.renderSprite(3)
    this.animationTextures.moveLeftDown = await this.characterSpriteRenderer.renderSprite(7)
    this.animationTextures.moveRightDown = await this.characterSpriteRenderer.renderSprite(1)
  }

  private async initCharacter () {
    this.currentAnimation = new PIXI.AnimatedSprite(this.animationTextures.moveDown)
    this.currentAnimation.animationSpeed = this.animationSpeed
  }

  async stay () {
    this.currentAnimation?.stop()
    this.lastAnimation = null
  }

  private move (animationName: Animation, { x, y }: { x?: number, y?: number } = {}) {
    if (this.currentAnimation == null) return

    if (animationName !== this.lastAnimation) {
      this.currentAnimation.textures = this.animationTextures[animationName]
      this.currentAnimation.play()
    }

    if (x != null) {
      this.currentAnimation.x += x
    }
    if (y != null) {
      this.currentAnimation.y += y
    }

    this.lastAnimation = animationName
  }

  async moveLeftUp () {
    this.move('moveLeftUp', {
      x: -1,
      y: -1
    })
  }

  async moveUp () {
    this.move('moveUp', {
      y: -1
    })
  }

  async moveRightUp () {
    this.move('moveRightUp', {
      x: 1,
      y: -1
    })
  }

  async moveLeft () {
    this.move('moveLeft', {
      x: -1
    })
  }

  async moveRight () {
    this.move('moveRight', {
      x: 1
    })
  }

  async moveLeftDown () {
    this.move('moveLeftDown', {
      x: -1,
      y: 1
    })
  }

  async moveDown () {
    this.move('moveDown', {
      y: 1
    })
  }

  async moveRightDown () {
    this.move('moveRightDown', {
      x: 1,
      y: 1
    })
  }
}

export default CharacterAnimationHandler
