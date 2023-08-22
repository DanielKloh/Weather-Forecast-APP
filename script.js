window.onload = function () {

    buscaInformacoesTabela();

    //buscaIdRodada();

    buscaDadosRodada(15);

    tabelaArtilharia();
}

//função que monta a tabela de classificação
function buscaInformacoesTabela() {
    $.ajax({

        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
        headers: { 'Authorization': 'Bearer live_1e33b39956b21096d4a2f15c456e00' },
        contentType: 'json',
        dataType: 'json',
        success: function (response) {
            //Se a solicitação for feita com sucesso, a resposta representará os dados
            populaTabelaClassificacao(response);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }

    });
}
    

//funções que montam a tabela dos jogos
function buscaIdRodada() {
    

    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas",
        headers: { 'Authorization': 'Bearer live_1e33b39956b21096d4a2f15c456e00' },
        contentType: 'json',
        dataType: 'json',
        success: function (response) {

            let posicao = 1;
            for (let i = 0; i < response.length; i++) {

                if (response[i].status === "agendada") {
                    posicao = response[i].rodada;
                    break;
                }

            }
            buscaDadosRodada(posicao);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });
}

function buscaDadosRodada(rodadaId) {
    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaId,
        headers: { 'Authorization': 'Bearer live_1e33b39956b21096d4a2f15c456e00' },
        contentType: 'json',
        dataType: 'json',
        success: function (response) {
            populaTabelaJogos(response);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });
}


//funções que montam a tabela da artilharia
function tabelaArtilharia() {
    $.ajax({
        type: "GET",
        url: "https://api.api-futebol.com.br/v1/campeonatos/10/artilharia",
        headers: { 'Authorization': 'Bearer test_7255889716ac0340867b5691a18535' },
        contentType: 'json',
        dataType: 'json',
        success: function (response) {
            montaTabelaArtilharia(response);
        },
        done: function (msg) {

        },
        error: function (msg) {

        }
    });
}


//função que chama a rodada anterior
function rodadaAnterior() {
    var rodadaAnterior = document.getElementById("rodadaAnterior").value;
    if (rodadaAnterior != null && rodadaAnterior != '') {
        buscaDadosRodada(rodadaAnterior);
    }
}

//função que chama a proxima rodada
function proximaRodada() {
    var proximaRodada = document.getElementById("proximaRodada").value;
    if (proximaRodada != null && proximaRodada != '') {
        buscaDadosRodada(proximaRodada);
    }
}


//função que monta a tabela da classificação
function populaTabelaClassificacao(response) {

    for (let i = 0; i < response.length; i++) {

        let resultado = response[i].variacao_posicao;
        let linha = document.createElement("tr");
        let nomeTime = document.createElement("td");
        let logoTime = document.createElement("img");
        let pontuacao = document.createElement("td");
        let identificador = document.createElement("td");
        let conteinerLogo = document.createElement("td");
        let resultadoConteiner = document.createElement("td");
        let resultadoIcon = document.createElement("img");

        if (i < 4) {
            identificador.setAttribute("class", "celula_tabela_classificacao_numero_azul");
        }
        else if (i < 6) {
            identificador.setAttribute("class", "celula_tabela_classificacao_numero_azul_claro");
        }
        else if (i < 12) {
            identificador.setAttribute("class", "celula_tabela_classificacao_numero_verde");
        }
        else if (i < 16) {
            identificador.setAttribute("class", "celula_tabela_classificacao_numero_cinza");
        }
        else if (i < 20) {
            identificador.setAttribute("class", "celula_tabela_classificacao_numero_vermelho");
        }
        nomeTime.setAttribute("class", "celula_tabela_classificacao_time");
        pontuacao.setAttribute("class", "celula_tabela_classificacao_pontuacao");
        logoTime.setAttribute("src", response[i].time.escudo); //
        logoTime.setAttribute("class", "imagemLogo");
        conteinerLogo.setAttribute("class", "imagemCentralizada");

        if (resultado >= 1) {

            resultadoIcon.setAttribute("class", "celula_tabela_classificacao_icon resultado_ganhou");
            resultadoIcon.setAttribute("src", "image/seta-para-cima.png");

        }
        else if (resultado <= -1) {

            resultadoIcon.setAttribute("class", "celula_tabela_classificacao_icon resultado_perdeu");
            resultadoIcon.setAttribute("src", "image/seta-para-baixo.png");
        }
        else {
            resultadoIcon.setAttribute("class", " celula_tabela_classificacao_icon resultado_empatou");
            resultadoIcon.setAttribute("src", "image/square.svg");
        }


        identificador.innerText = i + 1;
        nomeTime.innerText = response[i].time.nome_popular//
        pontuacao.innerText = response[i].variacao_posicao;
        logoTime.innerText = response[i].time.escudo; //


        tabela_classificacao.appendChild(linha);
        linha.appendChild(identificador);
        linha.appendChild(conteinerLogo);
        conteinerLogo.appendChild(logoTime);
        linha.appendChild(nomeTime);
        linha.appendChild(pontuacao);

        linha.appendChild(resultadoConteiner);
        resultadoConteiner.appendChild(resultadoIcon);
    }

    for (let i = 0; i < response.length; i++) {
        let linha = document.createElement("tr");
        let pontso = document.createElement("td");
        let jogos = document.createElement("td");
        let vitorias = document.createElement("td");
        let empates = document.createElement("td");
        let derrotas = document.createElement("td");
        let golsPro = document.createElement("td");
        let golsContra = document.createElement("td");
        let saldoGols = document.createElement("td");
        let aproveitamento = document.createElement("td");
        let ultimosJogos = document.createElement("td");

        let bola1 = document.createElement("span");
        let bola2 = document.createElement("span");
        let bola3 = document.createElement("span");
        let bola4 = document.createElement("span");
        let bola5 = document.createElement("span");
        let bolas = [bola1, bola2, bola3, bola4, bola5]

        pontso.setAttribute("class", "celula_pontos celula_pontos_negrito");
        jogos.setAttribute("class", "celula_pontos");
        vitorias.setAttribute("class", "celula_pontos");
        empates.setAttribute("class", "celula_pontos");
        derrotas.setAttribute("class", "celula_pontos");
        golsPro.setAttribute("class", "celula_pontos");
        golsContra.setAttribute("class", "celula_pontos");
        saldoGols.setAttribute("class", "celula_pontos");
        aproveitamento.setAttribute("class", "celula_pontos");
        ultimosJogos.setAttribute("class", "celula_pontos_bolinha");


        pontso.innerText = response[i].pontos;
        jogos.innerText = response[i].jogos;
        vitorias.innerText = response[i].vitorias;
        empates.innerText = response[i].empates;
        derrotas.innerText = response[i].derrotas;
        golsPro.innerText = response[i].gols_pro;
        golsContra.innerText = response[i].gols_contra;
        saldoGols.innerText = response[i].saldo_gols;
        aproveitamento.innerText = response[i].aproveitamento;


        tabela_resultados.appendChild(linha);
        linha.appendChild(pontso);
        linha.appendChild(jogos);
        linha.appendChild(vitorias);
        linha.appendChild(empates);
        linha.appendChild(derrotas);
        linha.appendChild(golsPro);
        linha.appendChild(golsContra);
        linha.appendChild(saldoGols);
        linha.appendChild(aproveitamento);
        linha.appendChild(ultimosJogos);


        for (let j = 0; j < response.length; j++) {
            if (response[i].ultimos_jogos[j] === "v") {
                bolas[j].setAttribute("class", "bolinha_ultimos_jogos bolinha_ultimos_jogos_ganhou");  //
            }
            else if (response[i].ultimos_jogos[j] === "d") {
                bolas[j].setAttribute("class", "bolinha_ultimos_jogos bolinha_ultimos_jogos_perdeu"); //
            }
            else if (response[i].ultimos_jogos[j] === "e") {
                bolas[j].setAttribute("class", "bolinha_ultimos_jogos bolinha_ultimos_jogos_empatou"); //
            }
        }
        ultimosJogos.appendChild(bola1);
        ultimosJogos.appendChild(bola2);
        ultimosJogos.appendChild(bola3);
        ultimosJogos.appendChild(bola4);
        ultimosJogos.appendChild(bola5);
    }
}


//função que monta a tabela dos jogso
function populaTabelaJogos(response) {

    //limpa a estrotura da tabela dos proximos jogos
    limpaTabelaJogos();

    //muda o estilo das setas de navegação das proximas rodadas
    let seteaEsquerda = document.getElementById("seteaEsquerda");
    let seteaDireita = document.getElementById("seteaDireita");

    if (response.rodada == 1) {
        seteaEsquerda.classList.add("navegacao_jogos_seta_limit");
    }
    else {
        seteaEsquerda.classList.remove("navegacao_jogos_seta_limit");
    }

    if (response.rodada == 38) {
        seteaDireita.classList.add("navegacao_jogos_seta_limit");
    }
    else {
        seteaDireita.classList.remove("navegacao_jogos_seta_limit");
    }

    //monta a tabela das proximas rodadas
    if (response.proxima_rodada != null) {
        document.getElementById("proximaRodada").value = response.proxima_rodada.rodada;
    } else {
        document.getElementById("proximaRodada").value = null;
    }

    if (response.rodada_anterior != null) {
        document.getElementById("rodadaAnterior").value = response.rodada_anterior.rodada;
    } else {
        document.getElementById("rodadaAnterior").value = null;
    }


    //monta a tabela  das rodadas
    for (let i = 0; i < response.partidas.length; i++) {


        //chama a sigla do dia do jogo
        let diaSigla = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
        let dia = new Date(response.partidas[i].data_realizacao_iso);

        let lista = document.createElement("li");
        let jogosContainer = document.createElement("div");
        let nomeTimeEscritoMandante = document.createElement("p");
        let nomeTimeEscritoVisitante = document.createElement("p");
        let nomeTimeMandante = document.createElement("div");
        let nomeTimeVisitante = document.createElement("div");
        let logoTimeMandante = document.createElement("img");
        let logoTimeVisitante = document.createElement("img");
        let jogosConteinerTime = document.createElement("div");
        let jogosConteinerSegundoTime = document.createElement("div");
        let rodada = document.getElementById("rodada");
        let iconX = document.createElement("img");
        let dadosJogos = document.createElement("div");
        let dataJogos = document.createElement("div");
        let localJogos = document.createElement("div");
        let horaJogos = document.createElement("div");
        let placarTimeMandante = document.createElement("span");
        let placarTimeVisitante = document.createElement("span");
        let resultadoJogo = document.createElement("div");


        jogosConteinerTime.setAttribute("class", "jogos_conteiner_times");
        jogosConteinerSegundoTime.setAttribute("class", "jogos_conteiner_times");
        nomeTimeMandante.setAttribute("class", "nome_times");
        nomeTimeVisitante.setAttribute("class", "nome_times");
        logoTimeMandante.setAttribute("class", "logo_time");
        logoTimeVisitante.setAttribute("class", "logo_time");
        logoTimeMandante.setAttribute("src", response.partidas[i].time_mandante.escudo); //
        logoTimeVisitante.setAttribute("src", response.partidas[i].time_visitante.escudo); //
        iconX.setAttribute("src", "image/icondeX.png");
        jogosContainer.setAttribute("class", "jogos_conteiner");
        dadosJogos.setAttribute("class", "data_jogo");
        dataJogos.setAttribute("class", "data_jogo_data");
        horaJogos.setAttribute("class", "data_jogo_data");
        placarTimeMandante.setAttribute("class", "placarTime");
        placarTimeVisitante.setAttribute("class", "placarTime");
        resultadoJogo.setAttribute("class", "resultadoJogo");

        if (response.partidas[i].data_realizacao == null) {
            nomeTimeEscritoMandante.innerText = response.partidas[i].time_mandante.sigla;
            nomeTimeEscritoVisitante.innerText = response.partidas[i].time_visitante.sigla;
            dataJogos.innerText = "DOM 31/02/2023";
            rodada.innerText = response.nome;
        }

        else {
            nomeTimeEscritoMandante.innerText = response.partidas[i].time_mandante.sigla;
            nomeTimeEscritoVisitante.innerText = response.partidas[i].time_visitante.sigla;
            dataJogos.innerText = diaSigla[dia.getDay()] + " " + response.partidas[i].data_realizacao;
            localJogos.innerText = response.partidas[i].estadio.nome_popular;
            horaJogos.innerText = response.partidas[i].hora_realizacao;
            rodada.innerText = response.nome;
            placarTimeMandante.innerText = response.partidas[i].placar_mandante;
            placarTimeVisitante.innerText = response.partidas[i].placar_visitante;
            resultadoJogo.innerText = "veja como foi";
        }


        if (response.partidas[i].status === "finalizado") {
            lista_jogos.appendChild(lista);

            lista.appendChild(dadosJogos);
            dadosJogos.appendChild(dataJogos);
            dadosJogos.appendChild(localJogos);
            dadosJogos.appendChild(horaJogos);

            lista.appendChild(jogosContainer);
            jogosContainer.appendChild(jogosConteinerTime);

            jogosConteinerTime.appendChild(nomeTimeMandante);
            nomeTimeMandante.appendChild(nomeTimeEscritoMandante);
            nomeTimeMandante.appendChild(logoTimeMandante);
            jogosConteinerTime.appendChild(placarTimeMandante);//

            jogosConteinerTime.appendChild(iconX);

            jogosConteinerTime.appendChild(placarTimeVisitante);//
            jogosConteinerTime.appendChild(nomeTimeVisitante);
            nomeTimeVisitante.appendChild(logoTimeVisitante);
            nomeTimeVisitante.appendChild(nomeTimeEscritoVisitante);
            jogosContainer.append(resultadoJogo);//
        }

        else {
            lista_jogos.appendChild(lista);

            lista.appendChild(dadosJogos);
            dadosJogos.appendChild(dataJogos);
            dadosJogos.appendChild(localJogos);
            dadosJogos.appendChild(horaJogos);

            lista.appendChild(jogosContainer);
            jogosContainer.appendChild(jogosConteinerTime);

            jogosConteinerTime.appendChild(nomeTimeMandante);
            nomeTimeMandante.appendChild(nomeTimeEscritoMandante);
            nomeTimeMandante.appendChild(logoTimeMandante);


            jogosConteinerTime.appendChild(iconX);

            jogosConteinerTime.appendChild(nomeTimeVisitante);
            nomeTimeVisitante.appendChild(logoTimeVisitante);
            nomeTimeVisitante.appendChild(nomeTimeEscritoVisitante);
        }

    }
}


//função que monta a tabela dos artilheiros
function montaTabelaArtilharia(response) {

    let rankingJogadorGols = 0;

    for (let i = 0; i < response.length; i++) {

        let tabelaArtilharia = document.getElementById("tabelaArtilharia");
        let tr = document.createElement("tr");
        let rankingJogador = document.createElement("td");
        let containerLogoTime = document.createElement("td");
        let logoTime = document.createElement("img");
        let containerJogadorInfo = document.createElement("td");
        let nomeJogador = document.createElement("div");
        let posicaoJogador = document.createElement("div");
        let gols = document.createElement("td");


        rankingJogador.setAttribute("class", "celula_tabela_jogadores classificacao_jogador");



        if (i == 0) {
            rankingJogador.innerText = "1";
            rankingJogadorGols += 1;
        }

        else if (response[i].gols < response[i - 1].gols) {
            rankingJogadorGols += 1;
            rankingJogador.innerText = rankingJogadorGols;
        }




        containerLogoTime.setAttribute("class", "celula_tabela_jogadores");
        logoTime.setAttribute("class", "imagem_logo_time");
        logoTime.setAttribute("src", response[i].time.escudo);
        containerJogadorInfo.setAttribute("class", "jogador_info");
        nomeJogador.setAttribute("class", "nome_jogador");
        nomeJogador.innerText = response[i].atleta.nome_popular;
        posicaoJogador.setAttribute("class", "nome_posicao");

        if (response[i].atleta.posicao.nome != null) {
            posicaoJogador.innerText = response[i].atleta.posicao.nome;
        }
        else {
            posicaoJogador.innerText = "-";
        }

        gols.setAttribute("class", "celula_tabela_jogadores gols");
        gols.innerText = response[i].gols;



        tabelaArtilharia.appendChild(tr);
        tr.appendChild(rankingJogador);
        tr.appendChild(containerLogoTime);
        containerLogoTime.appendChild(logoTime);
        tr.appendChild(containerJogadorInfo);
        containerJogadorInfo.appendChild(nomeJogador);
        containerJogadorInfo.appendChild(posicaoJogador);
        tr.appendChild(gols);

    }



}


//função que limpa a tabela de jogso
function limpaTabelaJogos() {
    lista_jogos.innerText = "";
}


//Exibir a barra de menu lateral
let ativado = false;

function menu() {

    if (ativado === false) {
        ativado = true;
        abrir_menu();
    }
    else {
        ativado = false;
        fehecar_menu();
    }
}

function abrir_menu() {
    document.getElementById("show_menu").style.width = "250px";
    document.getElementById("fundo").classList.add("show_fundo");
}

function fehecar_menu() {
    document.getElementById("show_menu").style.width = "0px";
    document.getElementById("fundo").classList.remove("show_fundo");
}



//funções para abrir e fexar o regulamento
function abrirRegulamento(){
    document.getElementById("regulamento-caixa").style.display = "block";
    document.getElementById("regulamento-caixa").style.width = "100%";
    document.getElementById("regulamento-caixa").style.height = "100%";
}

function fecharRegulamento(){
    document.getElementById("regulamento-caixa").style.display = "none";
    document.getElementById("regulamento-caixa").classList.add("regulamentoFechado");
}



//função para exibir os times da seire A
function serieA() {

    let serieA = document.getElementById("serieA");
    serieA.classList.add("serieAtual");
    serieA.classList.remove("serieNaoAtual");

    let serieB = document.getElementById("serieB");
    serieB.classList.add("serieNaoAtual");
    serieB.classList.remove("serieAtual");

    let serieC = document.getElementById("serieC");
    serieC.classList.remove("serieAtual");
    serieC.classList.add("serieNaoAtual");
}

//função para exibir os times da seire B
function serieB() {

    let serieB = document.getElementById("serieB");
    serieB.classList.add("serieAtual");
    serieB.classList.remove("serieNaoAtual");

    let serieA = document.getElementById("serieA");
    serieA.classList.add("serieNaoAtual");
    serieA.classList.remove("serieAtual");

    let serieC = document.getElementById("serieC");
    serieC.classList.add("serieNaoAtual");
    serieC.classList.remove("serieAtual");

}

//função para exibir os times da seire C
function serieC() {
    let serieC = document.getElementById("serieC");
    serieC.classList.add("serieAtual");
    serieC.classList.remove("serieNaoAtual");

    let serieB = document.getElementById("serieB");
    serieB.classList.add("serieNaoAtual");
    serieB.classList.remove("serieAtual");

    let serieA = document.getElementById("serieA");
    serieA.classList.add("serieNaoAtual");
    serieA.classList.remove("serieAtual");
}



// chave com dados reais
//live_1e33b39956b21096d4a2f15c456e00

//chave com dados de teste
//test_7255889716ac0340867b5691a18535