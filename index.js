let myLibrary = [
    { name: "To sell is human", author: "tony", pages: 200, read: true },
    { name: "The slammer", author: "john", pages: 350, read: false }
];

let cardClone = document.getElementById("card").cloneNode(true);

function Book() {
    // the constructor...
}

function render() {
    for (let i = 0; i < myLibrary.length; i++) {
        let card = cardClone.cloneNode(true);
        card.querySelector(".book-title").innerHTML = myLibrary[i].name;
        card.querySelector(".book-author").innerHTML = myLibrary[i].author;
        card.querySelector(".book-pages").innerHTML = myLibrary[i].pages;
        card.querySelector(".book-read").innerHTML = myLibrary[i].read;
        console.log(card)
        document.querySelector(".row").appendChild(card);
    }
}



function addBookToLibrary() {
    // do stuff here
}

render();

