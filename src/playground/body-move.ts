import * as PIXI from 'pixi.js'

const bodyMove = async (app: PIXI.Application) => {
  const spriteSourceSize = { x: 0, y: 0, w: 480, h: 880 }

  const rows = 8
  const cols = 8
  const xUnit = spriteSourceSize.w / rows
  const yUnit = spriteSourceSize.h / cols

  const sourceSize = { w: xUnit, h: yUnit }

  const getFrames = (name: string, y: number) => {
    const frames: any = {}
    const animations: any = {
      [name]: []
    }

    for (let i = 0; i < cols; i++) {
      const frameName = `${name}${i + 1}`

      animations[name].push(frameName)
      frames[frameName] = {
        frame: { x: i * xUnit, y: y * yUnit, w: xUnit, h: yUnit },
        sourceSize,
        spriteSourceSize
      }
    }

    return { frames, animations }
  }

  const frameName1 = 'leftWalk'
  const frameName2 = 'rightWalk'

  const { frames: f1, animations: a1 } = getFrames(frameName1, 0)
  const { frames: f2, animations: a2 } = getFrames(frameName2, 1)

  const atlasData: any = {
    frames: {
      ...f1, ...f2
    },
    meta: {
      image: 'assets/body-move.jpeg',
      format: 'RGBA8888',
      size: { w: 128, h: 32 },
      scale: 1
    },
    animations: {
      ...a1, ...a2
    }
  }

  const spritesheet = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData
  )

  const container = new PIXI.Container()
  container.x = app.screen.width / 2
  container.y = app.screen.height / 2
  app.stage.addChild(container)

  await spritesheet.parse()

  const anim1 = new PIXI.AnimatedSprite(spritesheet.animations[frameName1])

  anim1.animationSpeed = 0.2
  anim1.play()
  container.addChild(anim1)
}

export default bodyMove
