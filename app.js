let myLibrary = [{ title: "Test", author: "Someone", pages: 82, read: true }];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "already read" : "not read yet"
    }`;
  }
}

function addBookFromForm(e) {
  e.preventDefault();
  const form = document.getElementById("book-form");
  const title = document.getElementById("title-form");
  const author = document.getElementById("author-form");
  const pages = document.getElementById("pages-form");
  const read = document.getElementById("read-form");

  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  displayBooks();
  form.reset();
  hideForm();
}

function getBookObject() {
  const form = document.getElementById("book-form");
  const formData = new FormData(form);
  console.log(formData);
}

function displayBooks() {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "";
  [...myLibrary].reverse().forEach((book, idx) => {
    booksContainer.appendChild(createBook(book, myLibrary.length - idx - 1));
  });
}

function createBook(book, idx) {
  const bookElement = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read ? "already read" : "not read yet";

  const authorContainer = document.createElement("div");
  const authorLabel = document.createElement("p");
  authorLabel.textContent = "Author:";
  authorContainer.appendChild(authorLabel);
  authorContainer.appendChild(author);

  const pagesContainer = document.createElement("div");
  const pagesLabel = document.createElement("p");
  pagesLabel.textContent = "Pages:";
  pagesContainer.appendChild(pagesLabel);
  pagesContainer.appendChild(pages);

  const readContainer = document.createElement("div");
  const popover = document.createElement("span");
  popover.textContent = "Click to toogle state";
  readContainer.appendChild(read);
  readContainer.appendChild(popover);

  const removeButton = document.createElement("button");
  const icon = document.createElement("i");
  removeButton.appendChild(icon);

  const bookInfo = document.createElement("div");
  bookInfo.appendChild(authorContainer);
  bookInfo.appendChild(pagesContainer);

  bookElement.appendChild(title);
  bookElement.appendChild(removeButton);
  bookElement.appendChild(bookInfo);
  bookElement.appendChild(readContainer);

  bookElement.classList.add("book");
  title.classList.add("book-title");
  bookInfo.classList.add("book-info");
  authorContainer.classList.add("author-container");
  authorLabel.classList.add("author-label");
  author.classList.add("author");
  pagesContainer.classList.add("pages-container");
  pagesLabel.classList.add("pages-label");
  readContainer.classList.add("read-container");
  read.classList.add("read");
  popover.classList.add("tooltiptext");
  removeButton.classList.add("remove-book-button");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-trash-can");

  read.addEventListener("click", () => {
    myLibrary[idx].read = !myLibrary[idx].read;
    displayBooks();
  });

  removeButton.addEventListener("click", () => {
    let temArray = [];
    myLibrary.forEach((item, index) => {
      if (idx !== index) {
        temArray.push(item);
      }
    });
    myLibrary = temArray;
    displayBooks();
  });

  return bookElement;
}

function displayForm() {
  const form = document.getElementById("form-container");
  form.classList.remove("hidden");
}

function hideForm() {
  const form = document.getElementById("form-container");
  form.classList.add("hidden");
}

// Main program
displayBooks();
const form = document.getElementById("book-form");
form.addEventListener("submit", addBookFromForm);
