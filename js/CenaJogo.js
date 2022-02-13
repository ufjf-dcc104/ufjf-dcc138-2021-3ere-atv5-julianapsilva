import Cena from './Cena.js'
import Mapa from "./Mapa.js"
import Sprite from './Sprite.js'
import modeloMapa2 from './maps/mapa2.js'

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a))
            this.aRemover.push(a)

        if (!this.aRemover.includes(b))
            this.aRemover.push(b)

        if (a.tags.has('pc') && b.tags.has('enemy')) {
            this.game.selecionaCena('fim')
        }
    }
    preparar(time) {
        super.preparar()
        const mapa2 = new Mapa(11, 17, 72, 36)
        mapa2.carregaMapa(modeloMapa2)
        this.configuraMapa(mapa2)

        const pc = new Sprite({ x: 8 * 36, y: 10 * 72, assets: this.assets })
        pc.tags.add('pc')
        const cena = this
        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = - 45
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = +45

            } else {
                this.vx = 0
            }
            if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vy = - 45
            } else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = +45
            }
            else {
                this.vy = 0
            }
        }

        this.adicionar(pc)
        clearInterval(this.idInterval)
        this.adicionaEnemy(time)
    }
    adicionaSprite(x, random) {
        const modelos = ['carro2', 'carro3', 'carro4']
        this.adicionar(new Sprite({
            x: 36 * x, y: 11 * 72, color: 'orange', assets: this.assets,
            controlar: this.perseguePC, tags: ['enemy'], modelo: modelos[random]
        }))
    }
    perseguePC() {
        this.vy = 150 * Math.sign(- this.y)
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    adicionaEnemy(time = 2100) {
        console.log('time', time);
       this.idInterval = setInterval(() => {
            const modelo = this.getRandomInt(0, 3)
            let x = this.getRandomInt(2, 16)
            this.adicionaSprite(x, modelo)
        }, time)
    }


}