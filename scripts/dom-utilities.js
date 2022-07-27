import { renderModal } from "./modal.js";
import { truncateString } from "./string-utilities.js";

const modal = document.getElementById("bookModal");

export const addToNode = (grandParent, nodeType, name, nodeContent) => {
    const node = document.createElement(nodeType);
    const textNode = document.createTextNode(nodeContent);
    node.className = name;
    node.appendChild(textNode);
    grandParent.lastChild.appendChild(node);
    return node;
};

const addImage = (grandParent, link, title) => {
    const img = document.createElement("img");
    img.className = "book-item__img";
    img.src = link;
    img.alt = title;
    grandParent.lastChild.appendChild(img);
};

const createWrapper = (parent, name, id) => {
    const div = document.createElement("div");
    parent.appendChild(div);
    div.className = name;
    div.id = id;
};

export const clearNode = (parentNode) => {
    const div = parentNode;
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
};

export const bookCard = async (bookData) => {
    const {
        id,
        selfLink,
        volumeInfo: { title, authors, description, imageLinks },
    } = bookData;
    const shortDesc = truncateString(`${description}`, 20);

    // Create book-item wrapper
    createWrapper(bookList, "book-item", `${id}`);

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
        addToNode(bookList, "p", "book-item__author", `${authors.join(", ")}`);
    } else {
        addToNode(bookList, "p", "book-item__author", `${authors}`);
    }

    // Add description
    description
        ? addToNode(bookList, "p", "book-item__description", `${shortDesc}`)
        : addToNode(
              bookList,
              "p",
              "book-item__description",
              `No description available`,
          );

    // Open modal
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
};
