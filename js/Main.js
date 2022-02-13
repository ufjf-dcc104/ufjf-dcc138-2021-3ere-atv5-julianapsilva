import AssetManager from "./AssetManager.js"


import Sprite from "./Sprite.js"
import Mixer from "./Mixer.js"
import InputManager from "./InputManager.js"
import Game from "./Game.js"
import CenaJogo from "./CenaJogo.js"
import CenaCarregando from "./CenaCarregando.js"
import CenaGameOver from "./CenaGameOver.js"
import CenaVitoria from "./CenaVitoria.js"
import CenaFimJogo from "./CenaFimJogo.js"

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
assets.carregaAudio("sucess", "assets/sucess.mp3")
assets.carregaAudio("game-over", "assets/game-over.mp3")






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
const cena2 = new CenaGameOver()
const cena3 = new CenaVitoria()
const cena4 = new CenaFimJogo()

game.adicionarCena('carregando', cena0)
game.adicionarCena('jogo', cena1)
game.adicionarCena('fim', cena2)
game.adicionarCena('vitoria', cena3)
game.adicionarCena('vitoriaFim', cena4)

cena1.adicionaSprite(36 * 5, assets, 2000, 150)
cena1.adicionaSprite(36 * 15, assets, 2000, 150)


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
