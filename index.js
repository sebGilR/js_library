let myLibrary = [
  { name: "To sell is human", author: "tony", pages: 200, read: true },
  { name: "The slammer", author: "john", pages: 350, read: false }
];

const cardClone = document.getElementById("card").cloneNode(true);
const btn = document.getElementById("btn")



function Book(name, author, pages, read) {
  this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.read = function () {
  this.read = this.read ? console.log(false) : console.log(true);
}

function toggleRead(button) {
  let bookIndex = button.classList;
  console.log(bookIndex)
}

// Book.prototype.read = function () {

// }

function createCard(i) {
  let card = cardClone.cloneNode(true);
  card.querySelector(".book-title").innerHTML = myLibrary[i].name;
  card.querySelector(".book-author").innerHTML = myLibrary[i].author;
  card.querySelector(".book-pages").innerHTML = myLibrary[i].pages;
  card.querySelector(".book-read").innerHTML = myLibrary[i].read;
  card.querySelector(".toggleread").classList.add(`${i}`)
  return card
}

function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    const card = createCard(i)
    document.querySelector(".row").appendChild(card);
  }
}

function createBook() {
  const form = document.querySelector('#form');
  const name = form.querySelector("#name").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const read = form.querySelector("#read").value;
  const book = new Book(name, author, pages, read);
  return book
}

function addBookToLibrary() {
  const book = createBook()
  myLibrary.push(book)
  render();
}

document.addEventListener('onload', render());

