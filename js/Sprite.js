export default class Sprite {
    // responsavel por modelar algo que se move na tela
    constructor({ x = 100, y = 100, w = 36, h = 72,
        color = "white", vx = 0, vy = 0,
        controlar = () => { }, tags = [], assets, modelo = 'carro1' } = {},) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.w = w
        this.h = h
        this.color = color
        this.cena = null
        this.mx = 0
        this.my = 0
        this.controlar = controlar
        this.assets = assets,
            this.modelo = modelo,
            this.tags = new Set()
        tags.forEach(tag => this.tags.add(tag))
    }
    desenhar(ctx, modelo) {
        if (this.assets) {
            ctx.drawImage(this.assets.img(this.modelo),
                this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
        }
    }
    controlar(dt) { }
    mover(dt) {
        this.x = this.x + this.vx * dt
        this.y = this.y + this.vy * dt
        this.mx = Math.floor(this.x / this.cena.mapa.WIDTH)
        this.my = Math.floor(this.y / this.cena.mapa.HEIGHT)
    }
    passo(dt) {
        this.controlar(dt)
        this.mover(dt)
    }
    colidiuCom(outro) {
        return !(
            this.x - this.w / 2 > outro.x + outro.w / 2 ||
            this.x + this.w / 2 < outro.x - outro.w / 2 ||
            this.y - this.h / 2 > outro.y + outro.h / 2 ||
            this.y + this.h / 2 < outro.y - outro.h / 2
        )
    }
    aplicaRestricoes(dt) {
        this.aplicaRestricoesDireita(this.mx + 1, this.my - 1)
        this.aplicaRestricoesDireita(this.mx + 1, this.my)
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1)
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1)
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my)
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1)
        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1)
        this.aplicaRestricoesBaixo(this.mx, this.my + 1)
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1)
    }

    aplicaRestricoesDireita(pmx, pmy) { }
    aplicaRestricoesEsquerda(pmx, pmy) { }
    aplicaRestricoesBaixo(pmx, pmy) { }
    aplicaRestricoesCima(pmx, pmy) { }

}