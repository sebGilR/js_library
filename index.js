let myLibrary = [
  { name: "To sell is human", author: "tony", pages: 200, read: true },
  { name: "The slammer", author: "john", pages: 350, read: false }
];

let cardClone = document.getElementById("card").cloneNode(true);
const btn = document.getElementById("btn")



function Book(name, author, pages, read) {
  this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}

// Book.prototype.read = function () {

// }

function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    let card = cardClone.cloneNode(true);
    card.querySelector(".book-title").innerHTML = myLibrary[i].name;
    card.querySelector(".book-author").innerHTML = myLibrary[i].author;
    card.querySelector(".book-pages").innerHTML = myLibrary[i].pages;
    card.querySelector(".book-read").innerHTML = myLibrary[i].read;
    document.querySelector(".row").appendChild(card);
  }
}

function addBookToLibrary() {
  const form = document.querySelector('#form');
  const name = form.querySelector("#name").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const read = form.querySelector("#read").value;

  const book = new Book(name, author, pages, read);

  myLibrary.push(book)
  console.log(myLibrary)
  render();
}

document.addEventListener('onload', render());

