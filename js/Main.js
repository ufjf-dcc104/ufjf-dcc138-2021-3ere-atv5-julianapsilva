import AssetManager from "./AssetManager.js"


import Sprite from "./Sprite.js"
import Mixer from "./Mixer.js"
import InputManager from "./InputManager.js"
import Game from "./Game.js"
import CenaJogo from "./CenaJogo.js"
import CenaCarregando from "./CenaCarregando.js"
import CenaFim from "./CenaFim.js"

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

const cena0 = new CenaCarregando()
const cena1 = new CenaJogo()
const cena2 = new CenaFim()

game.adicionarCena('carregando', cena0)
game.adicionarCena('jogo', cena1)
game.adicionarCena('fim', cena2)



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
