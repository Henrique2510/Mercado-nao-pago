import { database, auth } from "./firebaseConfig.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


// ======================================================
// MOSTRAR / ESCONDER SENHA
// ======================================================

function configurarMostrarSenha(botao, campo) {

    botao.addEventListener("click", function () {

        if (campo.type === "password") {

            campo.type = "text";

            const icone = botao.querySelector("i");

            if (icone) {
                icone.classList.remove("fa-eye");
                icone.classList.add("fa-eye-slash");
            }

            botao.setAttribute("aria-label", "Esconder senha");

        } else {

            campo.type = "password";

            const icone = botao.querySelector("i");

            if (icone) {
                icone.classList.remove("fa-eye-slash");
                icone.classList.add("fa-eye");
            }

            botao.setAttribute("aria-label", "Mostrar senha");
        }
    });
}


// ======================================================
// CADASTRO
// ======================================================

const usuario = document.getElementById("usuario");
const emailCadastro = document.getElementById("emailCadastro");
const senhaCadastro = document.getElementById("senhaCadastro");
const confirmarSenhaCadastro =
    document.getElementById("confirmarSenhaCadastro");


async function cadastrarUsuario() {

    if (
        !usuario ||
        !emailCadastro ||
        !senhaCadastro ||
        !confirmarSenhaCadastro
    ) {
        console.error("Elementos do cadastro não encontrados.");
        return;
    }

    const nome = usuario.value.trim();
    const email = emailCadastro.value.trim();
    const senha = senhaCadastro.value;
    const confirmarSenha = confirmarSenhaCadastro.value;


    if (senha !== confirmarSenha) {
        alert("As senhas não estão iguais.");
        return;
    }


    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }


    if (nome.length < 3) {
        alert("Nome deve ter pelo menos 3 caracteres.");
        return;
    }


    if (senha.length < 8) {
        alert("A senha precisa ter 8 ou mais caracteres.");
        return;
    }


    try {

        const fichaUsuario =
            await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );

        const user = fichaUsuario.user;


        await set(
            ref(database, "usuarios/" + user.uid),
            {
                nome: nome,
                email: email,
                criadoEm: new Date().toISOString()
            }
        );


        alert("Usuário cadastrado com sucesso!");

        window.location.href = "./Login.html";


    } catch (erro) {

        console.error("ERRO AO CADASTRAR:", erro);

        alert(
            "Erro ao cadastrar usuário: " +
            erro.message
        );
    }
}


// ======================================================
// BOTÃO CADASTRO
// ======================================================

const btnCadastro =
    document.getElementById("btnCadastro");

if (btnCadastro) {

    btnCadastro.addEventListener(
        "click",
        cadastrarUsuario
    );
}


// ======================================================
// LOGIN
// ======================================================

async function fazerLogin() {

    const campoEmail =
        document.getElementById("emailLogin");

    const campoSenha =
        document.getElementById("senhaLogin");


    if (!campoEmail || !campoSenha) {
        return;
    }


    const email =
        campoEmail.value.trim();

    const senha =
        campoSenha.value;


    if (!email || !senha) {

        alert("Preencha o e-mail e a senha.");

        return;
    }


    try {

        const logado =
            await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );


        localStorage.setItem(
            "uid",
            logado.user.uid
        );


        window.location.href = "./Site.html";


    } catch (erro) {

        console.error("ERRO AO FAZER LOGIN:", erro);

        alert("E-mail ou senha incorretos.");
    }
}


// ======================================================
// BOTÃO LOGIN
// ======================================================

const btnLogin =
    document.getElementById("btnLogin");

if (btnLogin) {

    btnLogin.addEventListener(
        "click",
        fazerLogin
    );
}


// ======================================================
// OLHO DO LOGIN
// ======================================================

const senhaLogin =
    document.getElementById("senhaLogin");

const mostrarSenhaLogin =
    document.getElementById("mostrarSenhaLogin");


if (senhaLogin && mostrarSenhaLogin) {

    configurarMostrarSenha(
        mostrarSenhaLogin,
        senhaLogin
    );
}


// ======================================================
// OLHOS DO CADASTRO
// ======================================================

const botoesSenhaCadastro =
    document.querySelectorAll(
        ".mostrar-senha-cadastro"
    );


botoesSenhaCadastro.forEach(function (botao) {

    const idCampo =
        botao.dataset.target;

    const campoSenha =
        document.getElementById(idCampo);


    if (campoSenha) {

        configurarMostrarSenha(
            botao,
            campoSenha
        );
    }
});