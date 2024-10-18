const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

const imagemPrincipal = document.querySelector(".main__imagem");
const nomeImagem = document.querySelector(".container__upload__imagem__registro");

inputUpload.addEventListener("change", async (evento) => {
    // Acessa o elemento que é representado por 'InputUpload' e o representa como primeiro elemento da lista
    const arquivo = evento.target.files[0];

    // Altera a imagem e sua descrição 
    if (arquivo) {
        try {
            const conteudoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoArquivo.url;
            nomeImagem.textContent = conteudoArquivo.nome;
        } catch (erro){
            console.error ("Erro na leitura do arquivo");
        }
    }
})

function lerConteudoArquivo(arquivo) {

    // Testa o conteúdo do arquivo, retorna como resolve ou reject
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista__tags");

// Adicionar tags
inputTags.addEventListener("keypress", async (evento) =>{
    if(evento.key === "Enter") {
        evento.preventDefault();    // Garante que o acionamento da tecla não acione outro mecanismo senão o desejado
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try{    
                const tagExiste = await verificaTags(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.classList.add("lista__tags__item");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src = "./img/xpreto.svg" class = "remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                }else {
                    alert("Tag não encontrada");
                }           
            } catch {
                console.error("Tag não existe");
                alert ("Erro ao verificar a existência da tag. Verifique o Console")
            } 
        }      
    }
})

// Remover tags
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const removerTag = evento.target.parentElement;
        listaTags.removeChild(removerTag);
    }
})  

const tagsDisponiveis = ["Front-End", "Programação", "Back-End", "Desenvolvimento", "HTML", "CSS", "React"];

async function verificaTags(texto) {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(texto));
        },500) // Define o tempo que a req uisição irá durar
    })
}

const botaoPublicar = document.querySelector(".container__botoes__botao-publicar");

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout (() =>{
            const deuCerto = Math.random() > 0.5;
            
            if(deuCerto) {
                resolve ("Projeto publicado com sucesso!");
            }else {
                reject ("Erro na publicação");
            }
        }, 500)
    })
}

// Funcionalidade do botão publicar
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resutado = await publicarProjeto (nomeProjeto, descricaoProjeto, tagsProjeto)
        console.log (resutado)
    } catch (erro){
        console.log ("Deu errado: ", error);
        alert ("Deu errado!");
    }
})

const botaoDescartar = document.querySelector(container__botoes__botao-descartar);

botaoDescartar.addEventListener("click",(evento) => {
    evento.preventDefault();

    imagemPrincipal.src = "img/imagem1.svg";
    nomeImagem.textContent = "img_projeto.png";
    
    const formulario = document.querySelector("form");
    formulario.reset();

    listaTags.innerHTML = "";
})