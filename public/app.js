const botaoEsconder = document.querySelectorAll(".recipe__content__subtitle__show");
const conteudo = document.querySelectorAll(".recipe__content__description");

for (let i = 0; i < botaoEsconder.length; i++) {
  botaoEsconder[i].addEventListener("click", function () {
    if (conteudo[i].style.display == "none") {
      this.innerText = "Ocultar";
      console.log(this);
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

  if (newField.children[1].value == "") return false;

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
  

const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit", function (event) {
  const confirmation = confirm("Deseja Deletar?");
  if (!confirmation) {
    event.preventDefault();
  }
});
