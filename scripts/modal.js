// DOM Variables
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
const modal = document.getElementById("bookModal");
const close = document.querySelector(".modal__close");

// Function to render MODAL
export const renderModal = async (bookLink) => {
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

// MODAL EVENT LISTENERS
close.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
