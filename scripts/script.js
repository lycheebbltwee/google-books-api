import {
    addImage,
    addToNode,
    clearNode,
    createWrapper,
} from "./dom-utilities.js";

// DOM Variables
const inputSearch = document.getElementById("inputSearch");
const searchCount = document.getElementById("searchCount");
const searchBtn = document.getElementById("searchBtn");
const bookList = document.querySelector(".book-list");

const createQuery = (string) => {
    const strArr = string.split(" ");
    return strArr.join("+");
};

const searchBooks = async (query) => {
    try {
        const response = query
            ? await fetch(
                  `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`,
                  {
                      headers: {
                          Accept: "application/json",
                      },
                  },
              )
            : await fetch(
                  `https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=20`,
                  {
                      headers: {
                          Accept: "application/json",
                      },
                  },
              );
        const { items } = await response.json();
        const searchResults = items.map((bookFound) => {
            return bookFound.volumeInfo;
        });

        console.log(searchResults);

        if (query) {
            addToNode(
                searchCount,
                "p",
                `Showing top ${searchResults.length} books based on "${inputSearch.value}"`,
            );
        }

        for (let i = 0; i < searchResults.length; i++) {
            createWrapper(bookList, "book-item");

            addToNode(bookList, "p", `${searchResults[i].title}`);
        }
    } catch (error) {
        new Error("Oops, something went wrong");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    searchBooks();
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearNode(bookList);
    const searchQuery = createQuery(inputSearch.value);
    console.log(searchQuery);
    searchBooks(searchQuery);
});
