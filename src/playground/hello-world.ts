import * as PIXI from 'pixi.js'

const helloWorld = (app: PIXI.Application) => {
  const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')

  bunny.anchor.set(0.5)

  bunny.x = app.screen.width / 2
  bunny.y = app.screen.height / 2

  app.stage.addChild(bunny)

  app.ticker.add((delta) => {
    bunny.rotation += 0.1 * delta
  })

  // https://pixijs.com/guides/basics/scene-graph - 1
  const container = new PIXI.Container()
  container.x = app.screen.width / 2
  container.y = app.screen.height / 2
  app.stage.addChild(container)

  const sprites: any[] = []
  let parent = container
  for (let i = 0; i < 3; i++) {
    const sprite = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')
    sprite.anchor.set(0.5)
    parent.addChild(sprite)
    sprites.push(sprite)
    parent = sprite
  }

  let elapsed = 0.0
  app.ticker.add((delta) => {
    elapsed += delta / 60
    const amount = Math.sin(elapsed)
    const scale = 1.0 + 0.25 * amount
    const alpha = 0.75 + 0.25 * amount
    const angle = 40 * amount
    const x = 75 * amount
    for (let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i]
      sprite.scale.set(scale)
      sprite.alpha = alpha
      sprite.angle = angle
      sprite.x = x
    }
  })

  // https://pixijs.com/guides/basics/scene-graph - 2
  // Label showing scene graph hierarchy
  const label = new PIXI.Text('Scene Graph:\n\napp.stage\n  ┗ A\n     ┗ B\n     ┗ C\n  ┗ D', { fill: '#ffffff' })
  label.position = { x: 300, y: 100 }
  app.stage.addChild(label)

  // Helper function to create a block of color with a letter
  const letters: any[] = []

  function addLetter (letter: any, parent: any, color: any, pos: any) {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE)
    bg.width = 100
    bg.height = 100
    bg.tint = color

    const text = new PIXI.Text(letter, { fill: '#ffffff' })
    text.anchor.set(0.5)
    text.position = { x: 50, y: 50 }

    const container = new PIXI.Container()
    container.position = pos
    container.visible = false
    container.addChild(bg, text)
    parent.addChild(container)

    letters.push(container)
    return container
  }

  // Define 4 letters
  const a = addLetter('A', app.stage, 0xff0000, { x: 100, y: 100 })
  const b = addLetter('B', a, 0x00ff00, { x: 20, y: 20 })
  const c = addLetter('C', a, 0x0000ff, { x: 20, y: 40 })
  const d = addLetter('D', app.stage, 0xff8800, { x: 140, y: 100 })

  // Display them over time, in order
  let elapsed1 = 0.0
  app.ticker.add((delta) => {
    elapsed1 += delta / 60.0
    if (elapsed1 >= letters.length) { elapsed1 = 0.0 }
    for (let i = 0; i < letters.length; i++) {
      letters[i].visible = elapsed1 >= i
    }
  })
}

export default helloWorld
