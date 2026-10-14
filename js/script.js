// Lista que guarda as caixas escolhidas

let caixasSelecionadas = [];


// Elementos da seleção

const botoesSelecao =
    document.querySelectorAll(".botao-selecionar");

const contadorCaixas =
    document.getElementById("contador-caixas");

const palavraCaixa =
    document.getElementById("palavra-caixa");

const listaSelecao =
    document.getElementById("lista-selecao");

const avisoSelecao =
    document.getElementById("aviso-selecao");

const botaoLimpar =
    document.getElementById("limpar-selecao");

const campoCaixa =
    document.getElementById("caixa");


// Atualiza as informações da seleção

function atualizarSelecao() {

    contadorCaixas.textContent =
        caixasSelecionadas.length;


    // Decide entre singular e plural

    if (caixasSelecionadas.length === 1) {

        palavraCaixa.textContent = "caixa";

    } else {

        palavraCaixa.textContent = "caixas";

    }


    // Limpa a lista para escrevê-la novamente

    listaSelecao.innerHTML = "";


    // Verifica se a seleção está vazia

    if (caixasSelecionadas.length === 0) {

        const itemVazio =
            document.createElement("li");

        itemVazio.className =
            "selecao-vazia";

        itemVazio.textContent =
            "Nenhuma caixa selecionada.";

        listaSelecao.appendChild(itemVazio);

        return;
    }


    // Mostra todas as caixas selecionadas

    for (
        let i = 0;
        i < caixasSelecionadas.length;
        i++
    ) {

        const item =
            document.createElement("li");

        item.textContent =
            caixasSelecionadas[i];

        listaSelecao.appendChild(item);

    }

}


// Faz os botões dos produtos funcionarem

for (
    let i = 0;
    i < botoesSelecao.length;
    i++
) {

    botoesSelecao[i].addEventListener(
        "click",
        function () {

            const nomeCaixa =
                this.dataset.caixa;

            const valorCaixa =
                this.dataset.valor;


            // Guarda o nome da caixa

            caixasSelecionadas.push(nomeCaixa);


            // Escolhe a caixa no formulário

            campoCaixa.value = valorCaixa;


            // Mostra a confirmação

            avisoSelecao.textContent =
                nomeCaixa +
                " foi adicionada à sua seleção!";


            atualizarSelecao();

        }
    );

}


// Limpa todas as caixas selecionadas

botaoLimpar.addEventListener(
    "click",
    function () {

        caixasSelecionadas = [];

        campoCaixa.value = "";

        avisoSelecao.textContent =
            "Sua seleção foi limpa.";

        atualizarSelecao();

    }
);


// Validação do nome

const campoNome =
    document.getElementById("nome");

const erroNome =
    document.getElementById("erro-nome");


function conferirNome() {

    const nome =
        campoNome.value.trim();

    const somenteLetras =
        /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;


    // Nome vazio

    if (nome === "") {

        erroNome.textContent = "";

        return false;

    }


    // Nome com caractere proibido

    if (!somenteLetras.test(nome)) {

        erroNome.textContent =
            "Use somente letras, espaços, hífen ou apóstrofo.";

        return false;

    }


    // Nome correto

    erroNome.textContent = "";

    return true;

}


// Confere o nome enquanto a pessoa digita

campoNome.addEventListener(
    "input",
    conferirNome
);


// Campo que muda a dica da mensagem

const campoAssunto =
    document.getElementById("assunto");

const dicaAssunto =
    document.getElementById("dica-assunto");


function mudarDica() {

    switch (campoAssunto.value) {

        case "presente":

            dicaAssunto.textContent =
                "Informe o nome da pessoa e a mensagem do cartão.";

            break;


        case "troca":

            dicaAssunto.textContent =
                "Conte qual produto deseja trocar e explique o motivo.";

            break;


        case "parceria":

            dicaAssunto.textContent =
                "Apresente sua ideia e deixe uma forma de contato.";

            break;


        default:

            dicaAssunto.textContent =
                "Conte quais itens combinam com você.";

    }

}


// Muda a dica quando a opção é trocada

campoAssunto.addEventListener(
    "change",
    mudarDica
);


// Validação final do formulário

const formulario =
    document.getElementById("formulario-pedido");

const campoMensagem =
    document.getElementById("mensagem");

const erroMensagem =
    document.getElementById("erro-mensagem");

const resultadoFormulario =
    document.getElementById("resultado-formulario");


formulario.addEventListener(
    "submit",
    function (evento) {

        // Impede o envio porque ainda não existe servidor

        evento.preventDefault();


        // Limpa as mensagens anteriores

        erroMensagem.textContent = "";

        resultadoFormulario.textContent = "";


        // Confere se o nome está correto

        if (!conferirNome()) {

            campoNome.focus();

            return;

        }


        const mensagem =
            campoMensagem.value.trim();


        // Regra especial para troca ou devolução

        if (
            campoAssunto.value === "troca" &&
            mensagem.length < 15
        ) {

            erroMensagem.textContent =
                "Para solicitar uma troca, explique o motivo com pelo menos 15 caracteres.";

            campoMensagem.focus();

            return;

        }


        // Resultado final

        resultadoFormulario.textContent =
            "Pedido conferido! Nesta atividade, ele ainda não será enviado para um servidor.";

    }
);