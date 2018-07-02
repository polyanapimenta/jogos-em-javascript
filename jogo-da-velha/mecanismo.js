                                                                                   // definindo os dois jogadores do jogo
const player1 = 'x' 
const player2 = 'o'
let jogadas  = null                                                                // ajuda a definir o empate da jogada
let jogador  = null                                                                // quem está jogando, ou quem irá começar a jogada
let vencedor = null 
let gameOver = false                                                               // identificando o fim do jogo para limitar a jogabilidade dentro do tabuleiro
                                                                                   // seleciona o jogador antes de atualizar o painel
function selecionaJogador() {
                                                                                   // pegando as tags img dos jogadores do painel
    let selecao = document.getElementById('painel').querySelectorAll('div#painel img')
    
    for(let i = 0; i < selecao.length; i++ ){
        selecao[i].addEventListener('click', function(){
            jogadorEscolhido = selecao[i].getAttribute('alt')                      //saber qual jogador foi selecionado
            if (jogadorEscolhido == player1)
                jogador = player1
            else 
                jogador = player2
            painel()
        })                                                                         // observando qual player será selecionado para iniciar o jogo
    }                                                                              // percorrendo a lista de jogadores
}
                                                                                   // atualizando o painel, mostrando quem está jogando agora
function painel() {
                                                                                   // altera o html para mostar a vez do jogador selecionado
    let setPainel = document.getElementById('painel')
    let content = `<p>Vez do Jogador</p><img src="./assets/${jogador}.svg" alt="${jogador}">`
                                                                                   // seta o painel para o vencedor
    if (vencedor)                                                                  
        setPainel.innerHTML = `<p>O vencedor foi</p><img src="./assets/${vencedor}.svg"><p>!</p>`
                                                           
    else if (gameOver) {                                                          // seta o painel em caso de empate
        setPainel.innerHTML = `<p>Empate, Game Over!</p><img src="./assets/game-over-3.svg">`
        return                                                                     // retorna vazio e não faz nada
    }
    else if (jogador == player1)
        setPainel.innerHTML = content

    else if (jogador == player2)
        setPainel.innerHTML = content
}
                                                                                 // inicializa os quadrados do jogo da velha, todas as linhas e colunas do # jogo
function inicializaJogo() { 
    let space = document.getElementsByClassName('space')                         // pega todos os elementos da classe 'space' que iremos utilizar
                                                                                 // espera um clique, varre o array space.length onde contém todos os espaços do jogo
    for (let i = 0; i < space.length; i++) {
        
        space[i].addEventListener('click', function(){
            
            if (gameOver) {
                console.log('Aqui pode servir para reinício do jogo')
                //restartGame()                                                     // funcao para setar o jogo para uma nova partida sem dar refresh na página
                return                                                          //não faz nada, e não aceita nenhum clique no tabuleiro do jogo da velha
            }
                                                                                // se eu não tiver uma imagem dentro do meu space (TAG span, quadrado do jogo da velha) faça alguma coisa
            if ( this.getElementsByTagName('img').length == 0 ){
                ajusteInterface(space[i])                                       // pequena alteração na interface.css, com JS
                
                if (jogador == player1) {
                    this.innerHTML = `<img src="assets/${player1}.svg" alt="${player1}">`         // adicina dentro do html (span) a img do player
                    this.setAttribute('jogada', player1)                        // marcação de ponto, o valor de jogada irá definir posteriormente qual jogador ganhou esta rodada
                    jogador = player2                                           // vez do 2 player jogar
                }else {
                    this.innerHTML = `<img src="assets/${player2}.svg" alt="${player2}">`
                    this.setAttribute('jogada', player2)
                    jogador = player1 
                }                                                               // atualizar o painel de jogador
                verificaVencedor()
                if(jogadas == 9)
                    gameOver = true
                painel()
            } 
        })                                                                      // observador de evento dentro de cada item (espaço) do nosso array
    }
}

function ajusteInterface(space) {
    space.style.paddingLeft = '30px'
}
                                                                                // função assíncrona (usamos ela por causa do await), podemos continuar com a execução do programa sem depender da finalização dessa função (executa sem travar o programa, libera o navegador para atualizar o HTML)
async function verificaVencedor() {
    let L1A = document.querySelector('.l1 .a').getAttribute('jogada')
    let L1B = document.querySelector('.l1 .b').getAttribute('jogada')
    let L1C = document.querySelector('.l1 .c').getAttribute('jogada')

    let L2A = document.querySelector('.l2 .a').getAttribute('jogada')
    let L2B = document.querySelector('.l2 .b').getAttribute('jogada')
    let L2C = document.querySelector('.l2 .c').getAttribute('jogada')

    let L3A = document.querySelector('.l3 .a').getAttribute('jogada')
    let L3B = document.querySelector('.l3 .b').getAttribute('jogada')
    let L3C = document.querySelector('.l3 .c').getAttribute('jogada')
                                                                                 // determinando as possibilidades de ganhos (horizontal, vertical, diagonal)
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
    else
        jogadas++

    if (vencedor != null) {
        gameOver = true
        placar(vencedor)
        painel()
    } 
}

function placar(vencedor) {
    if (vencedor ==  player1) 
        player = 'pontos-x'  
    else
        player = 'pontos-o'

    let pontuacao = document.getElementsByClassName(player)[0]
    let pontos = parseInt(pontuacao.innerText) + 1
    pontuacao.innerText = pontos                                                // inserindo no html o valor de pontucao do jogador

    // restartGame()
}

/* function restartGame() {
  // limpar os blocos prenchidos
  selecionaJogador()
} */

selecionaJogador()
painel()
inicializaJogo()