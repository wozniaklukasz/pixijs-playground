import * as PIXI from 'pixi.js'
import { pixiApp } from '../PixiApp'

const ALIAS_ROCK = 'rocks'
const ROCK_SIZE = 64
const COLUMNS = 4
const ROWS = 2

PIXI.Assets.add({ alias: ALIAS_ROCK, src: 'assets/Rocks_source_no_shadow.png' })

export class RockBackground {
  private readonly container: PIXI.Container
  private readonly app: PIXI.Application
  private readonly rockNumber: number

  constructor (rockNumber = 0) {
    this.app = pixiApp()
    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)
    this.rockNumber = rockNumber
  }

  private createRockSprite (x: number, y: number): PIXI.Sprite {
    const rectangle = new PIXI.Rectangle(x * ROCK_SIZE, y * ROCK_SIZE, ROCK_SIZE, ROCK_SIZE)
    const originalTexture = PIXI.utils.TextureCache[ALIAS_ROCK]
    const texture = new PIXI.Texture(originalTexture.baseTexture, rectangle)
    return new PIXI.Sprite(texture)
  }

  public async render (): Promise<void> {
    await PIXI.Assets.load(ALIAS_ROCK)
    let row = 0
    let col = 0

    switch (this.rockNumber) {
      case 1:
        row = 0
        col = 0
        break
      case 2:
        row = 0
        col = 1
        break
      case 3:
        row = 0
        col = 2
        break
      case 4:
        row = 0
        col = 3
        break
      case 5:
        row = 1
        col = 0
        break
      case 6:
        row = 1
        col = 1
        break
      case 7:
        row = 1
        col = 2
        break
      case 8:
        row = 1
        col = 3
        break
    }

    const sprite = this.createRockSprite(col, row)
    sprite.x = col * ROCK_SIZE
    sprite.y = row * ROCK_SIZE
    this.container.addChild(sprite)
  }
}
