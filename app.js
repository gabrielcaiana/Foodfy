const modalOverlay = document.querySelector('.modal-overlay')
const receitas = document.querySelectorAll('.receita-item')

for(receita of receitas) {  
    receita.addEventListener('click', function(){
        modalOverlay.classList.add('active')
    })
}
