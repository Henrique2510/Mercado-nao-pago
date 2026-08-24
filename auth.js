import { database, auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


const usuario = document.getElementById("usuario");
const emailCadastro = document.getElementById("emailCadastro");
const senhaCadastro = document.getElementById("senhaCadastro");
const confirmarSenhaCadastro = document.getElementById("confirmarSenhaCadastro");


export async function cadastrarUsuario() {
    const nome = usuario.value.trim();
    const email = emailCadastro.value.trim();
    const senha = senhaCadastro.value;
    const confirmarSenha = confirmarSenhaCadastro.value;

    if (senha !== confirmarSenha) {
        alert("As senhas não estão iguais");
        return;
    }

    if (nome.length < 3) {
        alert("Nome deve ter pelo menos 3 caracteres");
        return;
    }

    if (senha.length < 8) {
        alert("A senha precisa ter 8 ou mais caracteres");
        return;
    }

    try {
        const fichaUsuario = await createUserWithEmailAndPassword(auth, email, senha);
        const user = fichaUsuario.user;

        await set(ref(database, "usuarios/" + user.uid), {
            nome: nome,
            email: email,
            criadoEm: new Date().toISOString()
        });

         alert("Usuário cadastrado com sucesso!");

        window.location.href = "./Login.html";

    } catch (erro) {

        console.error("ERRO:", erro);

        alert("Erro ao cadastrar usuário: " + erro.message);
    }
}
    document.getElementById("btnCadastro").addEventListener("click", cadastrarUsuario);



