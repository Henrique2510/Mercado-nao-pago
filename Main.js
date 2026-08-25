// aqui vai ficar a parte "inteligente" do site

import { database } from "./firebaseConfig.js";

import {
    ref,
    get,
    push,
    set
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// USUÁRIO

const nomeUsuario = document.getElementById("nome-usuario");
const uid = localStorage.getItem("uid");

if (uid && nomeUsuario) {

    const referencia = ref(database, "usuarios/" + uid);

    get(referencia)
        .then((snapshot) => {

            if (snapshot.exists()) {

                const dadosUsuario = snapshot.val();

                nomeUsuario.textContent = dadosUsuario.nome;

            } else {

                nomeUsuario.textContent = "Usuário";

            }

        })
        .catch((erro) => {

            console.error("Erro:", erro);

            nomeUsuario.textContent = "Usuário";

        });

} else {

    window.location.href = "./Login.html";
}



// ヾ(≧▽≦*)o 

// []~(￣▽￣)~*








const nav = document.querySelector(".header-nav");

if (nav) {

    let ultimaRolagem = window.scrollY;

    window.addEventListener("scroll", () => {

        const rolagemAtual = window.scrollY;



        // ROLANDO PARA BAIXO
        if (
            rolagemAtual > ultimaRolagem &&
            rolagemAtual > 80
        ) {

            nav.classList.add("escondido");

        }



        // ROLANDO PARA CIMA
        else if (rolagemAtual < ultimaRolagem) {

            nav.classList.remove("escondido");

        }


        ultimaRolagem = rolagemAtual;

    });

}













// ==========================================
// FILTROS DO MARKETPLACE
// ==========================================

const filtros = document.querySelectorAll(".filtro-custom");

filtros.forEach((filtro) => {

    const botao = filtro.querySelector(".filtro-botao");

    const opcoes = filtro.querySelectorAll(".filtro-menu button");

    if (!botao) return;


    // ABRIR / FECHAR FILTRO
    botao.addEventListener("click", (event) => {

        event.stopPropagation();

        filtros.forEach((outroFiltro) => {

            if (outroFiltro !== filtro) {

                outroFiltro.classList.remove("aberto");

            }

        });

        filtro.classList.toggle("aberto");

    });


    // SELECIONAR OPÇÃO
    opcoes.forEach((opcao) => {

        opcao.addEventListener("click", () => {

            const valor = opcao.dataset.value;


            // ==========================================
            // SE FOR CATEGORIA DO PRODUTO
            // ==========================================

            if (
                filtro.classList.contains(
                    "categoria-produto-custom"
                )
            ) {

                const categoriaInput =
                    document.getElementById(
                        "categoria-produto"
                    );

                const categoriaTexto =
                    document.getElementById(
                        "categoria-produto-texto"
                    );


                // Salva a categoria
                if (categoriaInput) {

                    categoriaInput.value = valor;

                }


                // Muda somente o texto
                if (categoriaTexto) {

                    categoriaTexto.textContent =
                        opcao.textContent.trim();

                }

            }


            // ==========================================
            // OUTROS FILTROS
            // ==========================================

            else {

                const textoBotao =
                    botao.querySelector("span");

                if (textoBotao) {

                    textoBotao.innerHTML =
                        opcao.innerHTML;

                }

            }


            // Remove seleção das outras opções
            opcoes.forEach((item) => {

                item.classList.remove("selecionado");

            });


            // Seleciona a opção atual
            opcao.classList.add("selecionado");


            // Fecha o menu
            filtro.classList.remove("aberto");

        });

    });

});


// ==========================================
// FECHAR FILTROS AO CLICAR FORA
// ==========================================

document.addEventListener("click", (event) => {

    filtros.forEach((filtro) => {

        if (!filtro.contains(event.target)) {

            filtro.classList.remove("aberto");

        }

    });

});

const botoesVendedor = {
    "btn-adicionar-produto": "tela-adicionar-produto",
    "btn-meus-produtos": "tela-meus-produtos",
    "btn-minhas-vendas": "tela-minhas-vendas",
    "btn-produtos-vendidos": "tela-produtos-vendidos"
};


// Todas as telas do site
const telas = document.querySelectorAll(".tela");


// Função para mostrar uma tela
function mostrarTela(idTela) {

    // Esconde todas as telas
    telas.forEach((tela) => {
        tela.classList.remove("ativa");
    });

    // Mostra a tela escolhida
    const tela = document.getElementById(idTela);

    if (tela) {
        tela.classList.add("ativa");
    }

    // Volta para o topo da página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Configura os botões do vendedor
Object.entries(botoesVendedor).forEach(([idBotao, idTela]) => {

    const botao = document.getElementById(idBotao);

    if (!botao) return;

    botao.addEventListener("click", () => {
        mostrarTela(idTela);
    });

});



// BOTÃO VOLTAR AO MARKETPLACE


const btnVoltarMarketplace =
    document.getElementById("btn-voltar-marketplace");

if (btnVoltarMarketplace) {

    btnVoltarMarketplace.addEventListener("click", () => {

        mostrarTela("tela-marketplace");

    });

}



// BOTÃO CANCELAR PRODUTO


const btnCancelarProduto =
    document.getElementById("btn-cancelar-produto");

if (btnCancelarProduto) {

    btnCancelarProduto.addEventListener("click", () => {

        mostrarTela("tela-marketplace");

    });

}




//PUBLICAR PRODUTO
// ==========================================

const formProduto =
    document.getElementById("form-produto");


if (formProduto) {

    formProduto.addEventListener(
        "submit",
        async (event) => {

            // Impede recarregar a página
            event.preventDefault();


            // ==============================
            // PEGAR DADOS
            // ==============================

            const nome =
                document
                    .getElementById("nome-produto")
                    .value
                    .trim();


            const descricao =
                document
                    .getElementById("descricao-produto")
                    .value
                    .trim();


            const categoria =
                document
                    .getElementById("categoria-produto")
                    .value;


            const preco =
                Number(
                    document
                        .getElementById("preco-produto")
                        .value
                );


            const quantidade =
                Number(
                    document
                        .getElementById("quantidade-produto")
                        .value
                );


            // ==============================
            // VALIDAÇÃO
            // ==============================

            if (!nome) {

                alert(
                    "Digite o nome do produto."
                );

                return;

            }


            if (!descricao) {

                alert(
                    "Digite a descrição do produto."
                );

                return;

            }


            if (!categoria) {

                alert(
                    "Selecione uma categoria."
                );

                return;

            }


            if (preco <= 0) {

                alert(
                    "Digite um preço válido."
                );

                return;

            }


            if (quantidade <= 0) {

                alert(
                    "Digite uma quantidade válida."
                );

                return;

            }


            // ==============================
            // SALVAR NO FIREBASE
            // ==============================

            try {

                const novoProduto =
                    push(
                        ref(
                            database,
                            "produtos"
                        )
                    );


                await set(
                    novoProduto,
                    {

                        nome: nome,

                        descricao: descricao,

                        categoria: categoria,

                        preco: preco,

                        quantidade: quantidade,

                        uidVendedor: uid,

                        criadoEm: Date.now()

                    }
                );


                // ==========================
                // SUCESSO
                // ==========================

                alert(
                    "Produto publicado com sucesso!"
                );


                // Limpar formulário

                formProduto.reset();


                // Limpar categoria

                const categoriaInput =
                    document.getElementById(
                        "categoria-produto"
                    );


                if (categoriaInput) {

                    categoriaInput.value = "";

                }


                // Restaurar texto da categoria

                const categoriaTexto =
                    document.getElementById(
                        "categoria-produto-texto"
                    );


                if (categoriaTexto) {

                    categoriaTexto.innerHTML =
                        "Selecione uma categoria";

                }


                // Voltar para marketplace

                mostrarTela(
                    "tela-marketplace"
                );


            } catch (erro) {

                console.error(
                    "ERRO AO PUBLICAR:",
                    erro
                );


                alert(
                    "Erro ao publicar o produto."
                );

            }

        }
    );

}


// CARREGAR PRODUTOS DO FIREBASE

async function carregarProdutos() {

    const produtosContainer =
        document.getElementById("produtos-container");

    const semProdutos =
        document.getElementById("sem-produtos");


    if (!produtosContainer) return;


    try {

        const referencia =
            ref(database, "produtos");


        const snapshot =
            await get(referencia);


        // Limpa o container
        produtosContainer.innerHTML = "";


        // Nenhum produto
        if (!snapshot.exists()) {

            if (semProdutos) {
                semProdutos.style.display = "block";
            }

            return;
        }


        // Existem produtos
        if (semProdutos) {
            semProdutos.style.display = "none";
        }


        const produtos =
            snapshot.val();


        Object.entries(produtos).forEach(
            ([id, produto]) => {

                const card =
                    document.createElement("div");


                card.className =
                    "produto-card";


                card.innerHTML = `
                    <div class="produto-imagem">
                        <i class="fa-solid fa-box"></i>
                    </div>

                    <div class="produto-info">

                        <h3>
                            ${produto.nome || "Produto"}
                        </h3>

                        <p>
                            ${produto.descricao || ""}
                        </p>

                        <span class="produto-categoria">
                            ${produto.categoria || "Outros"}
                        </span>

                        <strong class="produto-preco">
                            R$ ${Number(produto.preco || 0)
                                .toFixed(2)
                                .replace(".", ",")}
                        </strong>

                        <small>
                            Estoque: ${produto.quantidade || 0}
                        </small>

                    </div>
                `;


                produtosContainer.appendChild(card);

            }
        );


    } catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );

    }

}


// Carrega os produtos quando a página abre
carregarProdutos();