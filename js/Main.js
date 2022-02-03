import AssetManager from "./AssetManager.js"
import Cena from "./Cena.js"
import Mapa from "./Mapa.js"
import Sprite from "./Sprite.js"
import modeloMapa1 from './maps/mapa1.js'
import Mixer from "./Mixer.js"
import InputManager from "./InputManager.js"
import Game from "./Game.js"
import CenaJogo from "./CenaJogo.js"
import CenaCarregando from "./CenaCarregando.js"

const input = new InputManager()
const mixer = new Mixer(10)
const assets = new AssetManager(mixer)

assets.carregaImagem("garota", "assets/garota.png")
assets.carregaImagem("esqueleto", "assets/skelly.png")
assets.carregaImagem("orc", "assets/orc.png")
assets.carregaAudio("moeda", "assets/sound.wav")
assets.carregaAudio("boom", "assets/boom.wav")
assets.carregaImagem("floor7", "assets/floor7.png")
assets.carregaImagem("obstaculo", "assets/obstaculo.png")





const canvas = document.querySelector("canvas")
canvas.width = 20 * 32
canvas.height = 16 * 32

input.configurarTeclado(
    {
        "ArrowLeft": "MOVE_ESQUERDA",
        "ArrowRight": "MOVE_DIREITA",
        "ArrowUp": "MOVE_CIMA",
        "ArrowDown": "MOVE_BAIXO",
        ' ': 'PROXIMA_CENA'
    }
)

const game = new Game(canvas, assets, input)

const cena0 = new CenaCarregando(canvas, assets)
const cena1 = new CenaJogo(canvas, assets)
game.adicionarCena('carregando', cena0)
game.adicionarCena('jogo', cena1)

const mapa1 = new Mapa(16, 20, 32)
mapa1.carregaMapa(modeloMapa1)
cena1.configuraMapa(mapa1)

const pc = new Sprite({ x: 48, y: 150 })
pc.controlar = function (dt) {
    if (input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = - 50
    } else if (input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50
    } else {
        this.vx = 0
    }
    if (input.comandos.get("MOVE_CIMA")) {
        this.vy = - 50
    } else if (input.comandos.get("MOVE_BAIXO")) {
        this.vy = +50
    } else {
        this.vy = 0
    }
}

cena1.adicionar(pc)
function perseguePC(dt) {
    this.vx = 25 * Math.sign(pc.x - this.x)
    this.vy = 25 * Math.sign(pc.y - this.y)
}


const en1 = new Sprite({ x: 360, color: 'red', controlar: perseguePC })
cena1.adicionar(en1)
cena1.adicionar(new Sprite({ x: 115, y: 70, vy: 8, color: 'red', controlar: perseguePC }))
cena1.adicionar(new Sprite({ x: 115, y: 160, vy: -8, color: 'red', controlar: perseguePC }))

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

(() => {
    setInterval(() => {
        let x = getRandomInt(1, 16)
        let y = getRandomInt(1, 20)
        if (mapa1.isValidPosition(x, y)) {
            cena1.adicionar(new Sprite({ x: 32 * x, y: 32 * y, vy: 10, color: 'orange', controlar: perseguePC }))
        }
        else {
            x = getRandomInt(1, 16)
            y = getRandomInt(1, 20)
            if (mapa1.isValidPosition(x, y)) {
                cena1.adicionar(new Sprite({ x: 32 * x, y: 32 * y, vy: -10, color: 'orange', controlar: perseguePC }))
            }

        }
    }, 10000)
})()


game.iniciar()

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            game.iniciar()
            break;
        case "S":
            game.parar()
            break;
        case "c":
            assets.play("moeda")
            break;
        case "b":
            assets.play("boom")
            break;
    }
})
