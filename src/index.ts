import 'normalize.css'
import './style.css'
import helloWorld from './playground/hello-world'
import containerMasking from './playground/container-masking'
import spriteSheet from './playground/sprite-sheet'
import bodyMove from './playground/body-move'
import Character from './character/Character'
import * as PIXI from 'pixi.js'
import { pixiApp } from './PixiApp'
import { type CharacterSpritesKeys } from './character/types'
import { RockBackground } from './background/RockBackground'

class Game {
  private readonly app: PIXI.Application

  constructor () {
    this.app = pixiApp()
  }

  private async renderCharacter (key: CharacterSpritesKeys, offset: number) {
    const container = new PIXI.Container()
    container.x = this.app.screen.width / 2 + offset
    container.y = this.app.screen.height / 2 + offset
    this.app.stage.addChild(container)

    const character = new Character(key)
    const sprites = await character.init()

    container.addChild(...Object.values(sprites))
  }

  private async renderBackground () {
    const r1 = new RockBackground(1)
    const r2 = new RockBackground(2)
    const r7 = new RockBackground(8)

    await r1.render()
    await r2.render()
    await r7.render()
  }

  async init () {
    // helloWorld(this.app);
    // containerMasking(this.app);
    // await spriteSheet(this.app)
    // await bodyMove(this.app)
    await this.renderBackground()

    await this.renderCharacter('knight', 0)
    await this.renderCharacter('civilian', -100)
    await this.renderCharacter('civilian2', -150)
  }
}

const game = new Game()
void game.init()
