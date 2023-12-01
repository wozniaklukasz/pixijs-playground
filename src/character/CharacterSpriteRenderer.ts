import * as PIXI from 'pixi.js'

interface SpriteProps {
  path: string
  width: number
  height: number
  cols: number
  rows: number
}

type AnimationName = 'stay' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight'

class CharacterSpriteRenderer {
  private readonly spriteProps: SpriteProps
  private readonly xSpritePosition: number
  private readonly ySpritePosition: number

  constructor (spriteProps: SpriteProps) {
    this.spriteProps = spriteProps

    this.xSpritePosition = this.spriteProps.width / this.spriteProps.rows
    this.ySpritePosition = this.spriteProps.height / this.spriteProps.cols
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
    const frameName = `character-${y}`

    const { frames, animations } = this.getFrames(frameName, y, this.spriteProps.cols)

    const atlasData: any = {
      frames: { ...frames },
      meta: {
        image: this.spriteProps.path,
        format: 'RGBA8888',
        size: { w: this.spriteProps.width, h: this.spriteProps.height },
        scale: 1
      },
      animations: { ...animations }
    }

    const spritesheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(atlasData.meta.image),
      atlasData
    )

    await spritesheet.parse()

    return new PIXI.AnimatedSprite(spritesheet.animations[frameName])
  }
}

export default CharacterSpriteRenderer
