














const login = document.getElementById("login");
const cadastro = document.getElementById("cadastro");

const btnMostrarCadastro = document.getElementById("btnMostrarCadastro");
const btnMostrarLogin = document.getElementById("btnMostrarLogin");

btnMostrarCadastro.addEventListener("click", () => {
    login.style.display = "none";
    cadastro.style.display = "block";
});

btnMostrarLogin.addEventListener("click", () => {
    cadastro.style.display = "none";
    login.style.display = "block";
});