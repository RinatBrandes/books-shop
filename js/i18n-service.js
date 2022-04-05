'use strict'

var gCurrLang = 'en'

const gTrans = {
    title: {
        en: 'Books Shop',
        he: 'חנות ספרים'
    },
    add: {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'header-id': {
        en: 'Id',
        he: 'קוד'
    },
    'header-title': {
        en: 'Title',
        he: 'כותרת'
    },
    'header-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'header-url':{
        en: 'Img URL',
        he: 'קישור לתמונה'
    },
    'header-rate': {
        en: 'Rate',
        he: 'ציון'
    },
    'header-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'last-page': {
        en: 'Last Page',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'modal-book-cat': {
        en: 'Book category: children',
        he: 'קטגוריה: ספרי ילדים'
    },
    'modal-shoort-desc': {
        en: 'Shoort description:',
        he: 'תאור קצר:'
    },
    close: {
        en: 'close',
        he: 'סגירה'
    },
    'action-read': {
        en: 'Read',
        he: 'קרא'
    },
    'action-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'action-delete': {
        en: 'Delete',
        he: 'מחק'
    },    
   
    'book-link': {
        en: 'The following link leads you to a picture of the book',
        he: 'הקישור הבא מציג תמונה של הספר'
    },    
    'book-name': {
        en: 'Book name',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'Book price',
        he: 'מחיר הספר'
    }

}




function getTrans(transKey) {
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    
    const translate = key[gCurrLang]
    if (!translate) return key['en']

    return translate
}


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}

function getLang(){
    return gCurrLang
}

function setLang(lang) {
    gCurrLang = lang
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


function formatCurrency(num) {
    if(gCurrLang === 'en') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
    else return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}


function formatDate(time) {
    const option = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}

