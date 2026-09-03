const html = document.querySelector('html'); //seleciona o elemento html
const focoBt = document.querySelector('.app__card-button--foco'); //seleciona o botão de foco por classe
const curtoBt = document.querySelector('.app__card-button--curto'); //seleciona o botão de descanso curto por classe
const longoBt = document.querySelector('.app__card-button--longo'); // selciona o botão de descanso longo por classe
const banner = document.querySelector('.app__image');  // selciona a imagem do banner por classe 
const pause = document.querySelector('.app__card-primary-butto-icon'); //seleciona o botão de pausar por classe
const titulo = document.querySelector('.app__title'); //seleciona o título do app por classe
const botoes = document.querySelectorAll('.app__card-button'); //seleciona todos os botões por classe 
const startPauseBt = document.querySelector('#start-pause'); // seleciona o botão de iniciar/pausar por id
const musicaFocoInput = document.querySelector('#alternar-musica'); //seleciona o input de alternar música por id
const iniciarOuPausarBt = document.querySelector('#start-pause span'); //seleciona o botão de iniciar/pausar por id
const tempoDisplay = document.querySelector('#timer'); //seleciona o display do tempo por id
const musica = new Audio('./sons/luna-rise-part-one.mp3') //seleciona a música de fundo do app
const beep = new Audio('./sons/beep.mp3') //seleciona o som de alerta do app
const playTimer = new Audio('./sons/play.wav') //seleciona o som de iniciar o temporizador do app
const pauseTimer = new Audio('./sons/pause.mp3') //seleciona o som de pausar o temporizador do app

let contagemDeTempo = 30; 
let intervaloID = null
musica.loop = true;

//função de evento para alternar a música de fundo do app, caso o usuário queira ouvir ou não a música

musicaFocoInput.addEventListener('change', () => {
        if(musica.paused) {
            musica.play()
        }else{
            musica.pause()
        }
})

//funcao para alterar o contexto do app, mudando o banner, título e botão ativo de acordo com a escolha do usuário

focoBt.addEventListener('click', () => {
    contagemDeTempo = 30
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    contagemDeTempo = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', () => {
    contagemDeTempo = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;


    }
}
//funcao para iniciar a contagem regressiva do temporizador, diminuindo o valor da variável contagemDeTempo a cada segundo e adicionando audios no play pause

const contagemRegressiva =() => { 
    if(contagemDeTempo <= 0) {
        beep.play()
        alert('O tempo acabou!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)

        }
        zerar()
        return
    }
    contagemDeTempo -= 1;
   mostrarTempo()
 }

 startPauseBt.addEventListener('click', playPause)

 function playPause() {
    if(intervaloID) {
        pauseTimer.play()
        zerar()
        return
    }
    playTimer.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    pause.setAttribute('src', `/imagens/pause.png`)
    iniciarOuPausarBt.textContent = 'Pausar'
 }

 function zerar(){
    clearInterval(intervaloID)
    iniciarOuPausarBt.textContent = 'Começar'
    pause.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloID = null
 }

 //funcao para atualizar o display do tempo a cada segundo, formatando o valor da variável contagemDeTempo em minutos e segundos

 function mostrarTempo() {
    const tempo = new Date(contagemDeTempo * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' })
    tempoDisplay.innerHTML = `${tempoFormatado}`
 }
 
 mostrarTempo()
