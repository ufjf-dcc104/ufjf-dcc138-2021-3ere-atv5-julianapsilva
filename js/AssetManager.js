export default class AssetManager {
    constructor(mixer = null) {
        this.aCarregar = 0
        this.carregadas = 0
        this.images = new Map()
        this.audios = new Map()
        this.mixer = mixer
    }

    carregaImagem(chave, source) {
        const img1 = new Image()
        img1.addEventListener('load', () => {
            console.log(`Imagem ${this.carregadas}/${this.aCarregar} carregada`);
            this.carregadas++
        })
        img1.src = source
        this.images.set(chave, img1)
        this.aCarregar++
    }

    carregaAudio(chave, source) {
        const audio = new Audio()
        audio.addEventListener('loadeddata', () => {
            console.log(`Audio ${this.carregadas}/${this.aCarregar} carregado`);
            this.carregadas++
        })
        audio.src = source
        this.audios.set(chave, audio)
        this.aCarregar++
    }

    img(chave) {
        return this.images.get(chave)
    }

    audio(chave) {
        return this.audios.get(chave)
    }

    progresso() {
        if (this.aCarregar > 0)
            return `${(this.carregadas / this.aCarregar * 100).toFixed(2)}%`
        return 'Nada a carregar'
    }

    acabou() {
        return this.carregadas === this.aCarregar
    }

    play(chave) {
        this.audio(chave).play()
    }
    paraAudio(chave) {
        this.audio(chave).pause()
        this.audio(chave).currentTime = 0;
    }

}