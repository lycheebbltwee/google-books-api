import { addToNode, clearNode, bookCard } from "./dom-utilities.js";
import { joinString } from "./string-utilities.js";

// DOM Variables
const inputSearch = document.getElementById("inputSearch");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.querySelector(".book-list");

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
        addToNode(bookList, "p", "error-msg", "Sorry, no results found");
        throw new Error("Oops, something went wrong.");
    }
};

// Function to render list of books found
const renderFoundBooks = (booksArr) => {
    try {
        booksArr.then((value) => {
            const searchResults = value.map((books) => {
                return books;
            });
            searchResults.forEach((book) => {
                bookCard(book);
            });
        });
    } catch (error) {
        addToNode(bookList, "p", "error-msg", "Sorry, no results found");
        throw new Error("Oops, something went wrong.");
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
