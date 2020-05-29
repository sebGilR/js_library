let myLibrary = [
];

const book1 = new Book("To sell is human", "tony", 200, true);
const book2 = new Book("The slammer", "john", 350, false);


firebase.database().ref("library").set(
  myLibrary
);

myLibrary.push(book1);
myLibrary.push(book2);

const cardClone = document.getElementById("card").cloneNode(true);
cardClone.classList.remove("hidden");
const btn = document.getElementById("btn");
const displayBtn = document.getElementById("display");
const form = document.querySelector('#form');

function showForm() {
  const form_wrap = document.querySelector('.form-wrap');
  form_wrap.classList.toggle("hidden");
}

function Book(name, author, pages, read) {
  this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.readStatus = function () {
  this.read = this.read ? false : true;
}

function toggleRead(button) {
  const list = button.classList
  let bookIndex = list[list.length - 1];
  myLibrary[bookIndex].readStatus();
  render();
}

function remove(book) {
  const list = book.classList
  let bookIndex = list[list.length - 1];
  myLibrary.splice(bookIndex, 1);
  render();
}

function createCard(i) {
  let card = cardClone.cloneNode(true);
  card.querySelector(".book-title").innerHTML = myLibrary[i].name;
  card.querySelector(".book-author").innerHTML = myLibrary[i].author;
  card.querySelector(".book-pages").innerHTML = myLibrary[i].pages;
  card.querySelector(".book-read").innerHTML = myLibrary[i].read;
  card.querySelector(".toggleread").classList.add(`${i}`);
  card.querySelector(".remove").classList.add(`${i}`)
  return card
}

function render() {
  clearDOM();
  for (let i = 0; i < myLibrary.length; i++) {
    const card = createCard(i)
    document.querySelector(".row").appendChild(card);
  }
}

function createBook() {
  const name = form.querySelector("#name").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const read = form.querySelector("#read").checked;
  const book = new Book(name, author, pages, read);
  return book
}

function addBookToLibrary() {
  const book = createBook();
  myLibrary.push(book);
  render();
}

function clearDOM() {
  document.querySelector(".row").innerHTML = "";
}

window.addEventListener(onload, render())