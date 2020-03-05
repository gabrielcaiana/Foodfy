
function calculo (param) {
   return param * param
}

const btn = document.querySelector(".btn");
let resultado = 0

btn.onclick = function() {
  const myInput = document.querySelector(".myInput").value
  resultado = calculo(myInput)
  console.log(resultado)
}







