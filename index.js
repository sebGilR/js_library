let myLibrary = [];

// const book1 = new Book("To tell is human", "tony", 200, true);
// const book2 = new Book("The Park", "john", 350, false);

// myLibrary.push(book1);
// myLibrary.push(book2);

const readDB = function () {
  myLibrary = [];
  firebase.database().ref('/library/').once('value').then(function (snapshot) {
    let arr = Object.entries(snapshot.val())

    for (let i = 0; i < arr.length; i++) {
      myLibrary.push(arr[i][1])
    }
  });
}

const sendToDb = function () {
  console.log(myLibrary)
  for (let i = 0; i < myLibrary.length; i++) {
    firebase.database().ref("library/" + myLibrary[i].name).set(
      myLibrary[i]
    );
  }
}

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
  console.log(myLibrary);
  for (let i = 0; i < myLibrary.length; i++) {
    const card = createCard(i)
    document.querySelector(".row").appendChild(card);
  }

  readDB()
  sendToDb();
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