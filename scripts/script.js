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
const modalImg = document.querySelector(".publication__img");
const modalIsbn = document.querySelector(".publication__isbn");
const modalPubDate = document.querySelector(".publication__date");
const modalPublisher = document.querySelector("publication__publisher");
const modalTitle = document.querySelector(".detail__title");
const modalSubtitle = document.querySelector(".detail__subtitle");
const modalAuthorYear = document.querySelector(".detail__author-year");
const modalGenre = document.querySelector(".detail__author-year");
const modalLongDescription = document.querySelector(
    ".detail__long-description",
);

// Function for API fetch
const searchBooks = async (query) => {
    try {
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
    } catch (error) {
        new Error("Oops, something went wrong");
    }
};

// Function to render list of books found
const renderFoundBooks = (foundArr) => {
    foundArr.then((value) => {
        try {
            const searchResults = value.map((bookFound) => {
                return bookFound.volumeInfo;
            });

            for (let i = 0; i < searchResults.length; i++) {
                const { title, authors, description, imageLinks } =
                    searchResults[i];
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
                if (authors.length > 1) {
                    addToNode(
                        bookList,
                        "p",
                        "book-item__author",
                        `${authors.join(", ")}`,
                    );
                } else {
                    addToNode(bookList, "p", "book-item__author", `${authors}`);
                }
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
            }
        } catch (error) {
            new Error("Oops, results cannot be rendered");
        }
    });
};

// Function to render a modal
const renderModal = (foundArr) => {
    foundArr.then((value) => {});
};

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    inputSearch.value = "";
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearNode(bookList);
    const searchQuery = joinString(inputSearch.value);
    const findBooks = searchBooks(searchQuery);
    renderFoundBooks(findBooks);
});
