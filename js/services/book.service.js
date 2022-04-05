'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5

var gBooks
var gPageIdx = 0

_createBooks()


function getBooks() {
    
    var books = gBooks
    const idxStart = gPageIdx * PAGE_SIZE
    books = books.slice(idxStart, idxStart + PAGE_SIZE)
    return books
}


function nextPage() {
    
    gPageIdx++
    var nPage = ((gPageIdx + 1) * PAGE_SIZE)
    if (nPage >= gBooks.length) {
        setButton('.next-page',true)        
    }
    setButton('.last-page',false)
}

function lastPage() {
    
    gPageIdx--
    var nPage = ((gPageIdx - 1) * PAGE_SIZE)
    if (nPage < 0) {
        setButton('.last-page',true)
    }
    setButton('.next-page',false)
    
}

function setButton(selector, state){
    document.querySelector(selector).disabled = state  
    if(state) document.querySelector(selector).style.background = 'gray'
    else document.querySelector(selector).style.background = '#78938A'
}


function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateRate(bookId, diff){
    const book = getBookById(bookId)
   
    if(book.rate + diff < 0 || book.rate + diff > 10) return
    book.rate += diff
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()

}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}


function addBook(name,price,url) {

    var bookName = name.split(" ")    
    var searchStr=''
    bookName.forEach(word =>{    
        searchStr += word + '+'
    })
    searchStr = searchStr.substring(0,searchStr.length-1)
    url = '<a href="https://www.steimatzky.co.il/catalogsearch/result/?q='+searchStr + '" target="_blank">Book</a>'
    const book = _createBook(name,price,url)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function sortBooks(filter){
    var books = gBooks
    filter === 'name' ?   sortByName(books) : books.sort(numsComper)
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [_createBook('A tale of 5 balloons',61.2,'<a href="https://www.booknet.co.il/Images/Site/Products/3100043717.jpg" target="_blank">A tale of 5 balloons</a>'),
        _createBook('Where is Pluto',57.60,'<a href="https://www.booknet.co.il/Images/Site/Products/31-4266.jpg" target="_blank">Where is Pluto</a>'),
        _createBook('Raspberry juice',61.80,'<a href="https://www.booknet.co.il/Images/Site/Products/32-11531.jpg" target="_blank">Raspberry juice</a>'),
        _createBook('My mom and me',66.6,'<a href="https://www.booknet.co.il/Images/Site/Products/71702002890.jpg" target="_blank">My mom and me</a>'),
        _createBook('The little Prince',70.2,'<a href="https://www.booknet.co.il/Images/Site/Products/39000033077.jpg" target="_blank">The little Prince</a>'),
        _createBook('Huge house',70.2,'<a href="https://www.booknet.co.il/Images/Site/Products/4210026232.jpg" target="_blank">Huge house</a>'),
        _createBook('Do not want to get up today',66.6,'<a href="https://www.booknet.co.il/Images/Site/Products/3100070119.jpg" target="_blank">Do not want to get up today</a>')
       ] 
    }
    gBooks = books
    _saveBooksToStorage()
}



function _createBook(name,price,url) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl: url,
        rate: 0,
        shortDesc: makeLorem(100,gCurrLang)
    }
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}