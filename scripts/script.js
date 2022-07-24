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

        for (let i = 0; i < searchResults.length; i++) {
            const { title, authors, description, imageLinks } =
                searchResults[i];
            const shortDesc = truncateString(`${description}`, 20);

            createWrapper(bookList, "book-item");
            imageLinks
                ? addImage(bookList, `${imageLinks.thumbnail}`, `${title}`)
                : addImage(
                      bookList,
                      "https://via.placeholder.com/128x200",
                      "No image available",
                  );
            addToNode(bookList, "h2", "book-item__title", `${title}`);
            addToNode(bookList, "p", "book-item__author", `${authors}`);
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
        new Error("Oops, something went wrong");
    }
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearNode(bookList);
    const searchQuery = joinString(inputSearch.value);
    searchBooks(searchQuery);
});
