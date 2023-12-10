import * as PIXI from 'pixi.js'
import { CharacterSprites, type CharacterSpritesKeys, type SpriteProps } from './types'

class CharacterSpriteRenderer {
  private readonly spriteProps: SpriteProps
  private readonly xSpritePosition: number
  private readonly ySpritePosition: number

  constructor (key: CharacterSpritesKeys) {
    this.spriteProps = CharacterSprites[key]

    this.xSpritePosition = this.spriteProps.width / this.spriteProps.cols
    this.ySpritePosition = this.spriteProps.height / this.spriteProps.rows
  }

  private getFrames (name: string, y: number, cols: number) {
    const frames: any = {}
    const animations: any = { [name]: [] }

    for (let i = 0; i < cols; i++) {
      const frameName = `${name}${i + 1}`
      animations[name].push(frameName)
      frames[frameName] = {
        frame: { x: i * this.xSpritePosition, y: y * this.ySpritePosition, w: this.xSpritePosition, h: this.ySpritePosition },
        sourceSize: { w: this.xSpritePosition, h: this.ySpritePosition },
        spriteSourceSize: { x: 0, y: 0, w: this.spriteProps.width, h: this.spriteProps.height }
      }
    }

    return { frames, animations }
  }

  async renderSprite (y = 0) {
    const frameName = `${this.spriteProps.name}-${y}`

    const { frames, animations } = this.getFrames(frameName, y, this.spriteProps.cols)

    const atlasData: any = {
      frames: { ...frames },
      meta: {
        image: this.spriteProps.path,
        format: 'RGBA8888',
        size: { w: this.spriteProps.width, h: this.spriteProps.height },
        scale: 0.5
      },
      animations: { ...animations }
    }

    const spritesheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(atlasData.meta.image),
      atlasData
    )

    await spritesheet.parse()

    return spritesheet.animations[frameName]
  }
}

export default CharacterSpriteRenderer
