// definindo os dois jogadores do jogo
const player1 = 'X' 
const player2 = 'O'

let jogador = player1 // quem está jogando, player1 começa a jogada
let gameOver = false   // identificando o fim do jogo para limitar a jogabilidade dentro do tabuleiro

// atualizando o painel, mostrando quem está jogando agora

function painel() {

    let player = document.querySelectorAll('div#painel img')[0] // busca a imagem do jogador pelo JS

    if (jogador == player1) 
        player.setAttribute('src', './assets/x.svg')      // src recebe a imagem do X.svg
   
    else if (jogador == player2)
        player.setAttribute('src', './assets/circle.svg') 
   
    else if (gameOver) {
        player.setAttribute('src', './assets/game-over-3.svg')
        return                                                 // retorna vazio e não faz nada
    }
}

// inicializa os espaços, as linhas e colunas do # jogo

function inicializaJogo() { //peças tabuleiro
    let space = document.getElementsByClassName('space') // pega todos os elementos da classe 'space' que iremos utilizar

    // espera um clique, varre o array space.length onde contém todos os espaços do jogo
    for (let i = 0; i < space.length; i++) {
        
        space[i].addEventListener('click', function(){
            
            if (gameOver) return //não faz nada, e não aceita nenhum clique

            // se eu não tiver uma imagem dentro do meu space (TAG span) faça alguma coisa
            if ( this.getElementsByTagName('img').length == 0 ){
                ajusteInterface(space[i])                                       // pequena alteração na interface.css, com JS
                
                if (jogador == player1) {
                    this.innerHTML = '<img src="assets/x.svg" alt="Jogador X">' // adicina dentro do html (span) a img do player
                    this.setAttribute('jogada', player1)                        // marcação de ponto, o valor de jogada irá definir posteriormente qual jogador ganhou esta rodada
                    jogador = player2                                           // vez do 2 player jogar
                }else {
                    this.innerHTML = '<img src="assets/circle.svg" alt="Jogador X">'
                    this.setAttribute('jogada', player2)
                    jogador = player1 
                }

                // atualizar o painel de jogador
                painel()
                vencedor()
            }
        }) // observador de evento dentro de cada item (espaço) do nosso array
    }
}

function ajusteInterface(space) {
    // console.log(space)
    space.style.paddingLeft = '30px'
}

// função assíncrona (usamos ela por causa do await), podemos continuar com a execução do programa sem depender da finalização dessa função (executa sem travar o programa, libera o navegador para atualizar o HTML)
async function vencedor() {
    let vencedor = ''

    let L1A = document.querySelector('.l1 .a').getAttribute('jogada')
    let L1B = document.querySelector('.l1 .b').getAttribute('jogada')
    let L1C = document.querySelector('.l1 .c').getAttribute('jogada')

    let L2A = document.querySelector('.l2 .a').getAttribute('jogada')
    let L2B = document.querySelector('.l2 .b').getAttribute('jogada')
    let L2C = document.querySelector('.l2 .c').getAttribute('jogada')

    let L3A = document.querySelector('.l3 .a').getAttribute('jogada')
    let L3B = document.querySelector('.l3 .b').getAttribute('jogada')
    let L3C = document.querySelector('.l3 .c').getAttribute('jogada')

    // determinando as possibilidades de ganhos (horizontal, vertical, diagonal):

    if (((L1A == L1B && L1A == L1C) || (L1A == L2A && L1A == L3A) || (L1A == L2B && L1A == L3C)) && L1A != '')
        vencedor = L1A
    else if (((L1C == L2C && L1C == L3C) || (L1C == L2B && L1C == L3A)) && L1C != '')
        vencedor = L1C
    else if ((L2A == L2B && L2A == L2C) && L2A != '')
        vencedor = L2A
    else if ((L3A == L3B && L3A == L3C) && L3A != '')
        vencedor = L3A
    else if ((L1B == L2B && L1B == L3B) && L1B != '')
        vencedor = L1B

    if (vencedor != '') {
        gameOver = true
        pontucao(vencedor)
        await sleep(50) // começar um processamento paralelo ao processamento principal para não travar o programa com a função alert
        alert(`O vencedor foi ${vencedor}`)
    }
}

function sleep(tempo_ms) {
    return new Promise(corrige => setTimeout(corrige, tempo_ms))
}

function pontucao(player) {
    if (player ==  'X') {
        ponto = document.getElementsByClassName('pontos-x')
    
        console.log(ponto)
    } else {

    }
}

painel()
inicializaJogo()