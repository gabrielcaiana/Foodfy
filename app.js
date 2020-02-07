const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const receitas = document.querySelectorAll('.receita-item')
const closeModal = document.querySelector('.close')

for(let receita of receitas) {  
    receita.addEventListener('click', function(){ 
        let receitaId = receita.getAttribute('id')
        console.log(receitaId)      
        modalOverlay.classList.add('active')
        modal.querySelector("img").src = `${receitaId}`
    })
}

closeModal.addEventListener('click', function(){
    modalOverlay.classList.toggle('active')
})
