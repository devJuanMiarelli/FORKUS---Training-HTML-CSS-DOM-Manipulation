// by: Juan Miarelli

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarPausarBt = document.querySelector('#start-pause span');
const iniciarPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somIniciar = new Audio('/sons/play.wav');
const somPausar = new Audio('/sons/pause.mp3');
const somTerminar = new Audio('/sons/beep.mp3');

const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

let tempoEmS = 1500;
let intervalo = null;
musica.loop = true;


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});


focoBt.addEventListener('click', () => {
    tempoEmS = 1500;
    alteraContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoEmS = 300;
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoEmS = 900;
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alteraContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<br>
            <strong class="app__title-strong">Faça um descanso longo.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoEmS <= 0) {
        somTerminar.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoEmS -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (intervalo) {
        somPausar.play();
        zerar();
        return;
    }
    somIniciar.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    iniciarPausarBt.textContent = "Pausar";
    iniciarPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervalo);
    iniciarPausarBt.textContent = "Começar";
    iniciarPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervalo = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoEmS * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();