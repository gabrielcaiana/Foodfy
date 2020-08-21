// const modalOverlay = document.querySelector('.modal-overlay')
// const modal = document.querySelector('.modal')
// const receitas = document.querySelectorAll('.receita-item')
// const closeModal = document.querySelector('.close')


// for(let receita of receitas) {  
//     receita.addEventListener('click', function(){ 
//         // const img = receita.querySelector('img').getAttribute('src')
//         // const title = receita.querySelector('p').innerText
//         // const author = receita.querySelector('span').innerText

//         const img = this.getAttribute('data-img')
//         const title = this.getAttribute('data-title')
//         const autor = this.getAttribute('data-author')

//         modalOverlay.classList.add('active')
//         modal.querySelector("img").src = img
//         modal.querySelector('.title-modal').innerText = title
//         modal.querySelector('.autor-modal').innerHTML = autor
//     })
// }

// closeModal.addEventListener('click', function(){
//     modalOverlay.classList.toggle('active')
// })

const botaoEsconder = document.querySelectorAll('.showItem')
const conteudo = document.querySelectorAll('.descricao')

for (let i = 0; i < botaoEsconder.length; i++) {
    botaoEsconder[i].addEventListener('click', function () {
        if(conteudo[i].style.display == 'none') {
            this.innerText = 'Ocultar'
            console.log(this)
            conteudo[i].style.display = 'block'
        } else {
            conteudo[i].style.display = 'none' 
            this.innerText = 'Mostrar'
        }  
    })
}

// document.querySelector(".btn").addEventListener("click", function(){
//     alert('Hello DO APP')
//     console.log('Hello')
// })

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[1].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[1].value = "";
    ingredients.appendChild(newField);
  }

  function addPreparation() {
    const preparation = document.querySelector("#preparation-mode");
    const fieldContainer = document.querySelectorAll(".preparation");
    
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[1].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[1].value = "";
    preparation.appendChild(newField);
  }
  
  document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);

    document
    .querySelector(".add-preparation")
    .addEventListener("click", addPreparation);