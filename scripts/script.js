import {
    addImage,
    addToNode,
    clearNode,
    createWrapper,
} from "./dom-utilities.js";
import { joinString, truncateString } from "./string-utilities.js";

// DOM Variables
const inputSearch = document.getElementById("inputSearch");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.querySelector(".book-list");

// DOM Variables for modal
const modal = document.getElementById("bookModal");
const modalImg = document.querySelector(".publication__img");
const modalIsbn = document.querySelector(".publication__isbn");
const modalPubDate = document.querySelector(".publication__date");
const modalPublisher = document.querySelector(".publication__publisher");
const modalPageCount = document.querySelector(".publication__page-count");
const modalTitle = document.querySelector(".detail__title");
const modalSubtitle = document.querySelector(".detail__subtitle");
const modalAuthorYear = document.querySelector(".detail__author-year");
const modalGenre = document.querySelector(".detail__author-year");
const modalLongDescription = document.querySelector(
    ".detail__long-description",
);
const close = document.querySelector(".modal__close");

// Function for API fetch
const searchBooks = async (query) => {
    try {
        if (query) {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                },
            );

            const { items } = await response.json();
            return await items;
        } else {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=20`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                },
            );

            const { items } = await response.json();
            return await items;
        }
    } catch (error) {
        new Error("Oops, something went wrong.");
    }
};

// Function to render list of books found
const renderFoundBooks = (foundArr) => {
    foundArr.then((value) => {
        try {
            const searchResults = value.map((bookFound) => {
                return bookFound;
            });

            for (let i = 0; i < searchResults.length; i++) {
                const {
                    selfLink,
                    volumeInfo: { title, authors, description, imageLinks },
                } = searchResults[i];
                const shortDesc = truncateString(`${description}`, 20);

                // Create book-item wrapper
                createWrapper(bookList, "book-item", `${value[i].id}`);

                // Add image
                imageLinks
                    ? addImage(bookList, `${imageLinks.thumbnail}`, `${title}`)
                    : addImage(
                          bookList,
                          "https://via.placeholder.com/128x200",
                          "No image available",
                      );

                // Add title
                addToNode(bookList, "h2", "book-item__title", `${title}`);

                // Add author
                if (!authors) {
                    addToNode(bookList, "p", "book-item__author", "");
                } else if (authors.length > 1) {
                    addToNode(
                        bookList,
                        "p",
                        "book-item__author",
                        `${authors.join(", ")}`,
                    );
                } else {
                    addToNode(bookList, "p", "book-item__author", `${authors}`);
                }

                // Add description
                description
                    ? addToNode(
                          bookList,
                          "p",
                          "book-item__description",
                          `${shortDesc}`,
                      )
                    : addToNode(
                          bookList,
                          "p",
                          "book-item__description",
                          `No description available`,
                      );

                // Open module
                addToNode(
                    bookList,
                    "button",
                    "book-item__btn",
                    "Find out more",
                ).addEventListener("click", (e) => {
                    e.preventDefault();
                    renderModal(selfLink);
                    modal.style.display = "block";
                });
            }
        } catch (error) {
            new Error("Oops, results cannot be rendered.");
        }
    });
};

// Function to render MODAL
const renderModal = async (bookLink) => {
    try {
        // Fetch specific book info
        const response = await fetch(bookLink, {
            headers: {
                Accept: "application/json",
            },
        });
        const data = await response.json();
        const { volumeInfo } = data;
        console.log(data);

        // Image
        if (volumeInfo.imageLinks.thumbnail) {
            modalImg.src = volumeInfo.imageLinks.thumbnail;
            modalImg.alt = volumeInfo.title;
        } else {
            modalImg.src = "https://via.placeholder.com/128x200";
            modalImg.alt = "No image available";
        }

        // ISBN
        volumeInfo.industryIdentifiers.length > 1
            ? (modalIsbn.innerText = `ISBN: \n${volumeInfo.industryIdentifiers[0].identifier}, ${volumeInfo.industryIdentifiers[1].identifier}`)
            : `ISBN: \n${volumeInfo.industryIdentifiers[0].identifier}`;

        // Publication date
        modalPubDate.innerText = `Publication date: \n${volumeInfo.publishedDate}`;

        // Publisher
        modalPublisher.innerText = `Publisher: \n${volumeInfo.publisher}`;

        // Page Count
        modalPageCount.innerText = `Pages: \n${volumeInfo.pageCount}`;

        // Title
        modalTitle.innerText = volumeInfo.title;

        // Subtitle
        if (!volumeInfo.subtitle) {
            modalSubtitle.innerText = "";
        } else {
            modalSubtitle.innerText = volumeInfo.subtitle;
        }

        console.log(volumeInfo.authors.join(", "));
        // Author and year
        if (!volumeInfo.authors) {
            const pubYear = new Date(`${volumeInfo.publishedDate}`);
            modalAuthorYear.innerText = `${pubYear.getFullYear()}`;
        } else if (volumeInfo.authors.length > 1) {
            const pubYear = new Date(`${volumeInfo.publishedDate}`);
            modalAuthorYear.innerText = `${volumeInfo.authors.join(", ")}
             • ${pubYear.getFullYear()}`;
        } else {
            const pubYear = new Date(`${volumeInfo.publishedDate}`);
            modalAuthorYear.innerText = `${
                volumeInfo.authors
            } • ${pubYear.getFullYear()}`;
        }

        // Genre
        modalGenre.innerText = volumeInfo.categories[0];

        // Description
        modalLongDescription.innerHTML = volumeInfo.description;
    } catch (error) {
        new Error("Oops, modal cannot be rendered.");
    }
};

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    inputSearch.value = "";
    const findBooks = searchBooks();
    renderFoundBooks(findBooks);
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearNode(bookList);
    const searchQuery = joinString(inputSearch.value);
    const findBooks = searchBooks(searchQuery);
    renderFoundBooks(findBooks);
});

close.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
