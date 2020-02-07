const modalOverlay = document.querySelector('.modal-overlay')
const receitas = document.querySelectorAll('.receita-item')
const closeModal = document.querySelector('.close')

for(receita of receitas) {  
    receita.addEventListener('click', function(){
        modalOverlay.classList.add('active')
    })
}

closeModal.addEventListener('click', function(){
    modalOverlay.classList.toggle('active')
})
