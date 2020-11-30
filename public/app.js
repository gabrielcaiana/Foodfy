//Active menu
const currentPage = location.pathname;

const menuItens = document.querySelectorAll(".header__content__list__item__link");

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

const menuItensAdmin = document.querySelectorAll(".headerAdmin__content__nav__list__item__link");

for(item of menuItensAdmin) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("activeAdmin");
  }
}

const botaoEsconder = document.querySelectorAll(".recipe__content__subtitle__show");
const conteudo = document.querySelectorAll(".recipe__content__description");

for (let i = 0; i < botaoEsconder.length; i++) {
  botaoEsconder[i].addEventListener("click", function () {
    if (conteudo[i].style.display == "none") {
      this.innerText = "Ocultar";
      conteudo[i].style.display = "block";
    } else {
      conteudo[i].style.display = "none";
      this.innerText = "Mostrar";
    }
  });
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addPreparation() {
  const preparation = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparation.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".add-preparation")
  .addEventListener("click", addPreparation);

//Paginação

