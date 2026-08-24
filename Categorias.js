const nav = document.querySelector(".header-nav");
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        nav.classList.add("escondido");
    } else {
        nav.classList.remove("escondido");
    }
});


const filtros = document.querySelectorAll(".filtro-custom");
filtros.forEach((filtro) => {
    const botao = filtro.querySelector(".filtro-botao");
    const opcoes = filtro.querySelectorAll(".filtro-menu button");
    botao.addEventListener("click", () => {
        filtros.forEach((outroFiltro) => {
            if (outroFiltro !== filtro) {
                outroFiltro.classList.remove("aberto");
            }
        });
        filtro.classList.toggle("aberto");
    });

    opcoes.forEach((opcao) => {
        opcao.addEventListener("click", () => {
            const texto = opcao.innerHTML;
            botao.querySelector("span").innerHTML = texto;
            opcoes.forEach((item) => {
                item.classList.remove("selecionado");
            });
            opcao.classList.add("selecionado");
            filtro.classList.remove("aberto");
        });
    });
});


document.addEventListener("click", (event) => {
    filtros.forEach((filtro) => {
        if (!filtro.contains(event.target)) {
            filtro.classList.remove("aberto");
        }
    });
});