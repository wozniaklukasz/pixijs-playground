import * as PIXI from 'pixi.js'
import helloWorld from './hello-world'

const spriteSheet = async (app: PIXI.Application) => {
  // helloWorld(app)

  // Create object to store sprite sheet data
  const atlasData: any = {
    frames: {
      enemy1: {
        frame: { x: 0, y: 0, w: 32, h: 32 },
        sourceSize: { w: 32, h: 32 },
        spriteSourceSize: { x: 0, y: 0, w: 256, h: 304 }
      },
      enemy2: {
        frame: { x: 32, y: 0, w: 32, h: 32 },
        sourceSize: { w: 32, h: 32 },
        spriteSourceSize: { x: 0, y: 0, w: 256, h: 304 }
      }
    },
    meta: {
      image: 'assets/Rocks_source_no_shadow.png',
      // format: 'RGBA8888',
      size: { w: 128, h: 32 },
      scale: 1
    },
    animations: {
      enemy: ['enemy1', 'enemy2'] // array of frames by name
    }
  }

  // Create the SpriteSheet from data and image
  const spritesheet = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData
  )

  // Generate all the Textures asynchronously
  await spritesheet.parse()

  // spritesheet is ready to use!
  const anim = new PIXI.AnimatedSprite(spritesheet.animations.enemy)

  // set the animation speed
  anim.animationSpeed = 0.1666
  // play the animation on a loop
  anim.play()
  // add it to the stage to render
  app.stage.addChild(anim)
}

export default spriteSheet
