'use strict'
//todo: set the weudtg of the coulmn
//handel hover on title and price
//handel hover and color on next/last button


function onInit() {

    renderBooks()
}

function onAddBook() {
    
    var name = prompt('Book name?')
    var price = +prompt('Book price?')
    const car = addBook(name,price)
    renderBooks()
    
}

function renderBooks() {
    var books = getBooks()
    const strHTML = books.map(book => `
    <tr>
    <td>${book.id}</td> 
    <td>${book.name}</td>
    <td>${book.price}</td>
    <td>${book.imgUrl}</td>
    <td><section class="rate">
        <button  onclick="onUpdateRate('${book.id}',1)" >+</button>
        <span>${book.rate}</span>
        <button  onclick="onUpdateRate('${book.id}',-1)" >-</button>
    </section></td>
    <td><button title="Read Book" onclick="onReadBook('${book.id}')">Read Book</button></td>
    <td><button title="Update Book" onclick="onUpdateBook('${book.id}')">Update Book</button></td>
    <td><button title="Delete Book" onclick="onDeleteBook('${book.id}')">Delete Book</button></td>
    </tr>`)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML.join('')
}


function onReadBook(bookId) {

    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = 'Children'
    elModal.querySelector('p').innerText = book.shortDesc
    elModal.classList.add('open')
}


function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onUpdateRate(bookId,diff){
    
    updateRate(bookId,diff)
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('New price?', book.price)
    
    if (newPrice) {
        updateBook(bookId, newPrice)
        renderBooks()
    }
}


function onDeleteBook(bookId) {
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