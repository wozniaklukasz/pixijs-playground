import 'normalize.css'
import './style.css'
import helloWorld from './playground/hello-world'
import containerMasking from './playground/container-masking'
import spriteSheet from './playground/sprite-sheet'
import bodyMove from './playground/body-move'
import Character from './character/Character'

class Game {
  async init () {
    // helloWorld(this.app);
    // containerMasking(this.app);
    // await spriteSheet(this.app)
    // await bodyMove(this.app)

    const character = new Character()
    await character.init()
  }
}

const game = new Game()
void game.init()
