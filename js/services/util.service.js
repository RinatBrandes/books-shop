'use strict'

function makeId(length = 4) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}



function makeLorem(wordCount = 100) {
    const words = ['The book', 'story', 'the children', 'love', 'the color of the balloon', 'red', 'dad', 'mam', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}



//function that check that the max value in the quantity field is not bigger then max
function enforceMinMax(el) {
    if (el.value != '') {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }

  
function numsComper(num1,num2){    
    return num1.price - num2.price
}

function sortByName(books){
    var sortBooks = books.sort((book1, book2) => {
        if(book1.name < book2.name) return -1
        if(book1.name > book2.name) return 1
        return 0
    })
    return sortBooks
}
