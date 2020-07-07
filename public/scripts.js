//Script para inserir class ACTIVE no menu
const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for(item of menuItens){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add('active')
    }
}

//Script de Paginação
let totalPages = 20
let selectedPage = 16
let pages = []
let oldPage

for(let currentPage = 1; currentPage <= totalPages; currentPage++){
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){

        if(oldPage && currentPage - oldPage > 2){
            pages.push("...")
        }

        if(oldPage && currentPage - oldPage  == 2){
            pages.push(oldPage + 1)
        }

        pages.push(currentPage)

        oldPage = currentPage
    }
}

console.log(pages)

