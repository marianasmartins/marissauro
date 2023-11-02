alert("Vamos começar com o Jogo 'Mario pulando os cogumelos.'");
alert("Antes de o cogumelo atingir Mario, você precisa pressionar a setinha para cima no teclado para que Mario possa Pular.");
alert("Se liga, pois iremos começar!");
const mario = document.querySelector('.mario'); //selecionei o elemento mario e coloquei dentro dessa var
// console.log(mario); só para testar

const background = document.querySelector('.background');

let isJumping = false;

let position = 0; //posição inicial do mario

function handleKeyUp(event) {
    if (event.keyCode === 38) { //38 = seta para cima
        // console.log("Pressionou espaço!")
        if (!isJumping) {
            jump();
        }
    }
};

//Salto do mario
function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) { //se for >= a 150px vai parar de subir
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval); // limpar o intervalo de descida
                    isJumping = false;
                } else {
                    position -= 20;
                    mario.style.bottom = position + "px";
                }
            }, 20);

        } else {
            //Subindo
            position += 20;
            mario.style.bottom = position + 'px';
        }
    }, 20); //Intervalo de 20 segundos para realizar ação
}

///////// INTERAÇÃO DO COGUMELO///////////

function createCogumelo() {
    const cogumelo = document.createElement('div');
    let cogumeloPosition = 1000;
    let randomTime = Math.random() * 6000;


    cogumelo.classList.add('cogumelo');
    cogumelo.style.left = 1000 + "px";
    background.appendChild(cogumelo);

    let leftInterval = setInterval(() => {
        cogumeloPosition -= 10; //velocidade que vai se mover para esquerda
        cogumelo.style.left = cogumeloPosition + "px";

        if (cogumeloPosition < -72) { //se for < -72, ou seja, saiu literalmente da tela, vou limpar o nosso intervalo.
            clearInterval(leftInterval);
            background.removeChild(cogumelo); //se sair da tela, o cogumelo será removido

        } else if (cogumeloPosition > 0 && cogumeloPosition < 72 && position < 72) { //verificar se o cogumelo não saiu da tela e a posição

            //GAME OVER
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim do jogo!<br><br>Atualize a página para recomeçar.</h1>';

        } else {
            cogumeloPosition -= 10;
            cogumelo.style.left = cogumeloPosition + "px";
        }
    }, 20);

    setTimeout(createCogumelo, randomTime) //para executar uma função depois de um tempo
}

createCogumelo()

document.addEventListener('keyup', handleKeyUp);
// console.log('pressionou uma tecla'); só para testar