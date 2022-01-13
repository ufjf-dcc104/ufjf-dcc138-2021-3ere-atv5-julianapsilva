import Cena from "./Cena.js"
import Sprite from "./Sprite.js"
const canvas = document.querySelector("canvas")
const cena1 = new Cena(canvas)
const ctx = canvas.getContext("2d")
cena1.desenhar()
const pc = new Sprite()
const en1 = new Sprite({ x: 140, y: 95, w: 30, h: undefined, color: 'red' })
pc.desenhar(ctx)
en1.desenhar(ctx)