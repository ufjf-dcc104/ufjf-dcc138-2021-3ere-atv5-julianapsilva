import Cena from './Cena.js'

export default class CenaVitoria extends Cena {

    desenhar() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = '30px Impact'
        this.ctx.fillStyle = 'red'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Parabéns! Você venceu essa etapa.',
            this.canvas.width / 2,
            this.canvas.height / 2)
        if (this.assets.acabou()) {
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillText('Aperte espaço para ir para a próxima',
                this.canvas.width / 2,
                this.canvas.height / 2 + 40)

        }
    }
    quadro(t) {
        this.t0 = this.t0 ?? t
        this.dt = (t - this.t0) / 1000

        if (this.assets.acabou()) {
            this.assets.paraAudio('music')
            if (this.input.comandos.get('PROXIMA_CENA')) {
                this.assets.play('music')
                this.game.selecionaCena('jogo', 1300)
                return
            }
        }
        this.desenhar()
        this.iniciar()
        this.t0 = t
    }



}