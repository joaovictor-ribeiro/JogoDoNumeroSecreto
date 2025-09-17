// let titulo = document.querySelector('h1');
// titulo.innerHTML = ('Boas-vindas ao jogo do número secreto!');

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = ('Escolha um número de 01 a 100.')

let listaDeNumerosSorteados = []; 
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1} );
}

function exibirMensagensIniciais(params) {
    exibirTextoNaTela('h1', 'Boas-vindas ao jogo do número secreto!')
    exibirTextoNaTela('p', 'Escolha um número de 01 a 100.')
}

exibirMensagensIniciais();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemDeTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', `${mensagemDeTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', '(Dica) O número secreto é menor!')
        } else {
            exibirTextoNaTela('p', '(Dica) O número secreto é maior!')
        }
        // tentativas = tentativas + 1;
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(params) {
    let numeroEscolhido = parseInt (Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite);
        listaDeNumerosSorteados = [];

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled',true);

}
