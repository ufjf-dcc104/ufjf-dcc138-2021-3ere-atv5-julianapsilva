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


assets.carregaImagem("orc", "assets/orc.png")
assets.carregaAudio("moeda", "assets/sound.wav")
assets.carregaAudio("boom", "assets/boom.wav")
assets.carregaImagem("floor7", "assets/floor7.png")
assets.carregaImagem("obstaculo", "assets/obstaculo.png")
assets.carregaImagem("carro1", "assets/car1.png")
assets.carregaImagem("carro2", "assets/car2.png")
assets.carregaImagem("carro3", "assets/car3.png")
assets.carregaImagem("carro4", "assets/car4.png")
assets.carregaImagem("background", "assets/bg-aumen.png")
assets.carregaAudio("music", "assets/music.mp3")








const canvas = document.querySelector("canvas")
canvas.width = 638
canvas.height = 800
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


cena1.adicionaSprite(360, assets)
cena1.adicionaSprite(115, assets)
cena1.adicionaSprite(36 * 5, assets)
cena1.adicionaSprite(36 * 15, assets)


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

(() => {
    setInterval(() => {
        const modelo = getRandomInt(0, 3)
        let x = getRandomInt(2, 16)
        cena1.adicionaSprite(x, assets, modelo)
    }, 1000)
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
