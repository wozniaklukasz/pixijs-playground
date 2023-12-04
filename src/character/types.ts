export interface SpriteProps {
  name: string
  path: string
  width: number
  height: number
  cols: number
  rows: number
}

export const CharacterSprites: Record<string, SpriteProps> = {
  bodyMove: {
    name: 'bodyMove',
    path: 'assets/body-move.jpeg',
    width: 480,
    height: 880,
    cols: 8,
    rows: 8
  },
  knight: {
    name: 'knight',
    path: 'assets/Knight1_Move.png',
    width: 208,
    height: 416,
    cols: 4,
    rows: 8
  },
  civilian: {
    name: 'civilian',
    path: 'assets/Civilian2(black)_Move(Weapon1).png',
    width: 208,
    height: 416,
    cols: 4,
    rows: 8
  }
}

export type CharacterSpritesKeys = keyof typeof CharacterSprites
