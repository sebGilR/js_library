
const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function readStatus() {
  this.read = !this.read;
};

const book1 = new Book('To sell is human', 'tony', 200, true);
const book2 = new Book('The Park', 'john', 350, false);

myLibrary.push(book1);
myLibrary.push(book2);

const cardClone = document.getElementById('card').cloneNode(true);
cardClone.classList.remove('hidden');
const form = document.querySelector('#form');

function showForm() {
  const formWrap = document.querySelector('.form-wrap');
  formWrap.classList.toggle('hidden');
}

function createCard(i) {
  const card = cardClone.cloneNode(true);
  card.querySelector('.book-title').innerHTML = myLibrary[i].name;
  card.querySelector('.book-author').innerHTML = myLibrary[i].author;
  card.querySelector('.book-pages').innerHTML = myLibrary[i].pages;
  card.querySelector('.book-read').innerHTML = myLibrary[i].read;
  card.querySelector('.toggleread').classList.add(`${i}`);
  card.querySelector('.remove').classList.add(`${i}`);
  return card;
}

function clearDOM() {
  document.querySelector('.row').innerHTML = '';
}

function render() {
  clearDOM();
  for (let i = 0; i < myLibrary.length; i += 1) {
    const card = createCard(i);
    const readStatus = card.querySelector('.book-read').textContent;
    const readToggle = card.querySelector('.toggleread');
    if (readStatus === 'false') {
      readToggle.textContent = 'Read';
    } else {
      readToggle.textContent = 'Unread';
    }
    document.querySelector('.row').appendChild(card);
  }
}

function toggleRead(button) {
  const list = button.classList;
  const bookIndex = list[list.length - 1];
  myLibrary[bookIndex].readStatus();
  render();
}

document.querySelectorAll('.toggleread').forEach(item => {
  item.addEventListener('click', toggleRead);
});

function remove(book) {
  const list = book.classList;
  const bookIndex = list[list.length - 1];
  myLibrary.splice(bookIndex, 1);
  render();
}

document.querySelectorAll('.remove').forEach(item => {
  item.addEventListener('click', remove);
});

function createBook() {
  const errorMsg = form.querySelector('.error');
  const name = form.querySelector('#name');
  const author = form.querySelector('#author');
  const pages = form.querySelector('#pages');
  const read = form.querySelector('#read').checked;
  const fields = [name, author, pages];
  let valid = true;
  // let result = /^[a-zA-Z ]+$/.test('John Doe');
  // console.log(result);

  for (let i = 0; i < fields.length; i += 1) {
    if (fields[i].value === '') {
      valid = false;
      fields[i].style.borderColor = 'red';
    } else {
      fields[i].style.borderColor = 'black';
    }
  }

  if (!valid) {
    errorMsg.classList.toggle('hidden');
    return false;
  }
  const book = new Book(name.value, author.value, pages.value, read);
  showForm();
  return book;
}

function addBookToLibrary() {
  const book = createBook();
  if (book) {
    myLibrary.push(book);
  }
  render();
}

document.getElementById('save').addEventListener('click', addBookToLibrary);

window.addEventListener('onload', render());