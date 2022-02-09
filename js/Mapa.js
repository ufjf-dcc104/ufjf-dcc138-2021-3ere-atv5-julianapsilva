export default class Mapa {
    constructor(linhas = 8, colunas = 12, height = 72, width = 36) {
        this.LINHAS = linhas
        this.COLUNAS = colunas
        this.HEIGHT = height
        this.WIDTH = width
        this.tiles = []

        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = []
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0
            }
        }
        this.cena = null
    }

    desenhar(ctx, assets) {
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch (this.tiles[l][c]) {
                    case 1:
                        ctx.fillStyle = 'black'
                        ctx.strokeStyle = 'red'
                        break;
                    case 0:
                        ctx.fillStyle = 'red'
                        ctx.strokeStyle = 'black'
                        break;
                    default:
                        ctx.fillStyle = 'black'
                        ctx.strokeStyle = 'red'
                        break;
                }
                ctx.lineWidth = 1
                ctx.fillRect(c * this.WIDTH, l * this.HEIGHT, this.WIDTH, this.HEIGHT)
                ctx.strokeRect(c * this.WIDTH, l * this.HEIGHT, this.WIDTH, this.HEIGHT)
            }
        }
    }

    carregaMapa(modelo) {
        this.LINHAS = modelo.length
        this.COLUNAS = modelo[0]?.length ?? 0

        this.tiles = []
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = []
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c]
            }
        }

    }
    isValidPosition(x, y) {
        if (this.tiles[x][y])
            return false
        return true
    }
}