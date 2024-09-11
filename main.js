const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() { 
    this.read = this.read === "yes" ? "no" : "yes";  
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookshelf = document.querySelector(".bookshelf");

    const currentBooks = bookshelf.querySelectorAll(".book");
    currentBooks.forEach(book => bookshelf.removeChild(book));

    if (myLibrary.length === 0) {
        if (!bookshelf.querySelector(".empty-message")) {
            const emptyMessage = document.createElement("p");
            emptyMessage.classList.add("empty-message");
            emptyMessage.textContent = "Your library is empty. Add some books!";
            bookshelf.appendChild(emptyMessage);
        }
    } else {
        const existingEmptyMessage = bookshelf.querySelector(".empty-message");
        if (existingEmptyMessage) {
            bookshelf.removeChild(existingEmptyMessage);
        }

        myLibrary.forEach((book, index) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            const bookTitle = document.createElement('h3');
            bookTitle.textContent = book.title;
            bookDiv.appendChild(bookTitle);

            const bookAuthor = document.createElement('p');
            bookAuthor.textContent = `Author: ${book.author}`;
            bookDiv.appendChild(bookAuthor);

            const bookPages = document.createElement('p');
            bookPages.textContent = `Pages: ${book.pages}`;
            bookDiv.appendChild(bookPages);

            const bookButtons = document.createElement('div');
            bookButtons.classList.add("bookBtns");
            bookDiv.appendChild(bookButtons);

            const readStatus = document.createElement('button');
            readStatus.classList.add('read-status', book.read === "yes" ? 'read' : 'not-read');
            readStatus.textContent = book.read === "yes" ? 'Read' : 'Not Read';
            readStatus.addEventListener('click', () => {
                book.toggleReadStatus();
                displayBooks(); 
            });
            bookButtons.appendChild(readStatus);

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                myLibrary.splice(index, 1); 
                displayBooks(); 
            });
            bookButtons.appendChild(removeBtn);

            bookshelf.appendChild(bookDiv); 
        });
    }
}


document.querySelector("#newBookBtn").addEventListener("click", () => {
    document.querySelector(".bookshelf").style.display = "none";
    document.querySelector("form").style.display = "flex";
});

document.querySelector("#closeBtn").addEventListener('click', () => {
    document.querySelector(".bookshelf").style.display = "grid";
    document.querySelector("form").style.display = "none";
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); 

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = document.querySelector("#pages").value.trim();
    const read = document.querySelector("#read").value;

    if (title && author && pages && read) {
        addBookToLibrary(title, author, pages, read);
        document.querySelector("form").reset();
        document.querySelector(".bookshelf").style.display = "grid";
        document.querySelector("form").style.display = "none";
    } else {
        alert("Please fill out all fields.");
    }
});

window.onclick = function (event) {
    if (event.target === document.querySelector('form')) {
        document.querySelector(".bookshelf").style.display = "grid";
        document.querySelector("form").style.display = "none";
    }
};

displayBooks();
