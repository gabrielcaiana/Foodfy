const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const receitas = document.querySelectorAll('.receita-item')
const closeModal = document.querySelector('.close')

for(let receita of receitas) {  
    receita.addEventListener('click', function(){ 
        // const img = receita.querySelector('img').getAttribute('src')
        // const title = receita.querySelector('p').innerText
        // const author = receita.querySelector('span').innerText

        const img = this.getAttribute('data-img')
        const title = this.getAttribute('data-title')
        const autor = this.getAttribute('data-author')

        modalOverlay.classList.add('active')
        modal.querySelector("img").src = img
        modal.querySelector('.title-modal').innerText = title
        modal.querySelector('.autor-modal').innerHTML = autor
    })
}

closeModal.addEventListener('click', function(){
    modalOverlay.classList.toggle('active')
})
