let myLibrary = [
];

const book1 = new Book("To sell is human", "tony", 200, true);
const book2 = new Book("The Park", "john", 350, false);

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
    const card = createCard(i);
    const readStatus = card.querySelector(".book-read").textContent;
    let readToggle = card.querySelector(".toggleread");
    if (readStatus === "false") {
      readToggle.textContent = "Read"
    } else {
      readToggle.textContent = "Unread"
    }
    document.querySelector(".row").appendChild(card);
  }
}

function createBook() {
  const errorMsg = form.querySelector(".error");
  const name = form.querySelector("#name");
  const author = form.querySelector("#author");
  const pages = form.querySelector("#pages");
  const read = form.querySelector("#read").checked;
  const fields = [name, author, pages];
  let valid = true;
  // let result = /^[a-zA-Z ]+$/.test('John Doe');
  // console.log(result);

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value === "") {
      valid = false;
      console.log(fields[i])
      fields[i].style.borderColor = "red";
    } else {
      fields[i].style.borderColor = "black";
    }
  }

  if (!valid) {
    errorMsg.classList.toggle("hidden");
    return false
  } else {
    const book = new Book(name.value, author.value, pages.value, read);
    showForm()
    return book
  }
}

function addBookToLibrary() {
  const book = createBook();
  if (book) {
    myLibrary.push(book);
  }
  render();
}

function clearDOM() {
  document.querySelector(".row").innerHTML = "";
}

window.addEventListener(onload, render())