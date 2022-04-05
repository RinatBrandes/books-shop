'use strict'

function onInit() {
    doTrans()
    renderBooks()
}


function onAddBook(ev) {
    ev.preventDefault()    
    const elName = document.querySelector('input[name=book-name]')
    const elPrice = document.querySelector('input[name=book-price]')
    if(!elName.value || !elPrice.value) return
    const book = addBook(elName.value,elPrice.value)
    elName.value = ''
    elPrice.value = ''
    renderBooks()
}


function renderBooks() {
    var books = getBooks()
    const strHTML = books.map(book => `
    <tr>
    <td>${book.id}</td> 
    <td>${book.name}</td>
    <td>${formatCurrency(book.price)}</td>
    
    <td><section class="rate">
        <button  onclick="onUpdateRate('${book.id}',1)" >+</button>
        <span>${book.rate}</span>
        <button  onclick="onUpdateRate('${book.id}',-1)" >-</button>
    </section></td>
    <td><button title="Read Book" onclick="onReadBook('${book.id}')" data-trans="action-read" class="btn btn-light">${getTrans('action-read')}</button></td>
    <td><button title="Update Book" onclick="onUpdateBook('${book.id}')" data-trans="action-update" class="btn btn-light">${getTrans('action-update')}</button></td>
    <td><button title="Delete Book" onclick="onDeleteBook('${book.id}')" data-trans="action-delete" class="btn btn-light">${getTrans('action-delete')}</button></td>
    </tr>`)
    
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML.join('')
    
}


function onReadBook(bookId) {
  
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name  
    var lang = getLang()
    if(lang === 'he') elModal.querySelector('p').innerText = makeLorem(100,lang)
    else elModal.querySelector('p').innerText = book.shortDesc
    elModal.querySelector('.book-link').innerHTML = book.imgUrl
    elModal.style.display = 'block'
}


function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function onUpdateRate(bookId,diff){
    
    updateRate(bookId,diff)
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    if(gCurrLang === 'en') var newPrice = +prompt('New price?', book.price)
    else newPrice = +prompt('מחיר חדש?', book.price)
    if (newPrice) {
        updateBook(bookId, newPrice)
        renderBooks()
    }
}


function onDeleteBook(bookId) {
    if(gCurrLang === 'en') var areUSure = confirm('Are you sure?')
    else areUSure = confirm('אתה בטוח?')
    if(!areUSure) return
    deleteBook(bookId)
    renderBooks()
}


function onSort(filter){
    sortBooks(filter)
    renderBooks()    
}


function onNextPage() {
    
    nextPage()
    renderBooks()
}


function onLastPage() {
    
    lastPage()
    renderBooks()
}


function onSetLang(lang) {
    setLang(lang)
    // If lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
    renderBooks()
}