// Creates a book card for the main modal search results list
async function createModalBookCard(imgUrl, title, author, year, inCollection, volume_id) {
    // Create card
    const modal_card = document.createElement("div");
    modal_card.className = "card modal-card";
    if (inCollection)
        modal_card.className += " corner-fold";

    // Create row
    const row = document.createElement("div");
    row.className = "row";
    modal_card.appendChild(row);

    // Create first column
    const col1 = document.createElement("div");
    col1.className = "col-2";
    row.appendChild(col1);

    // Create cover image
    const img = document.createElement("img");
    img.className = "modal-card-cover";
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", "Book cover image");
    col1.appendChild(img);

    // Create second column
    const col2 = document.createElement("div");
    col2.className = "col-10";
    row.appendChild(col2);

    // Create info wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "modal-info-wrapper";
    col2.appendChild(wrapper);

    // Create title
    const titleHTML = document.createElement("h4");
    titleHTML.className = "modal-card-title";
    titleHTML.innerHTML = title;
    wrapper.appendChild(titleHTML);

    // Create author
    const authorHTML = document.createElement("h5");
    authorHTML.className = "modal-card-author";
    authorHTML.innerHTML = author;
    wrapper.appendChild(authorHTML);

    // Create year
    const yearHTML = document.createElement("p");
    yearHTML.className = "modal-card-year";
    yearHTML.innerHTML = year;
    wrapper.appendChild(yearHTML);

    // Create button
    const addRmButton = document.createElement("button");
    addRmButton.className = "round-button list-card-add-remove-button";
    addRmButton.setAttribute("id", book_id.toString());
    if (inCollection) {
        addRmButton.className += " add-to-remove";
        addRmButton.addEventListener("click", removeFromCollection, false);
    }
    else {
        addRmButton.addEventListener("click", addToCollection, false);
    }
    row.appendChild(addRmButton);

    // Create button img
    const buttonImg = document.createElement("img");
    buttonImg.setAttribute("src", "styles/icons/addRemoveSmall.png");
    buttonImg.setAttribute("alt", "Add or remove button image");
    addRmButton.appendChild(buttonImg);

    document.getElementById("modal-search-results-list").appendChild(modal_card);
}

// Creates a book card for the main search page results list
async function createMainBookCard(
    imgUrl,
    title,
    author,
    year,
    inCollection,
    book_id
) {
    // Create card
    const modal_card = document.createElement("div");
    modal_card.className = "card modal-card";
    if (inCollection) modal_card.className += " corner-fold";

    // Create row
    const row = document.createElement("div");
    row.className = "row";
    modal_card.appendChild(row);

    // Create first column
    const col1 = document.createElement("div");
    col1.className = "col-2";
    row.appendChild(col1);

    // Create cover image
    const img = document.createElement("img");
    img.className = "modal-card-cover";
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", "Book cover image");
    col1.appendChild(img);

    // Create second column
    const col2 = document.createElement("div");
    col2.className = "col-10";
    row.appendChild(col2);

    // Create info wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "modal-info-wrapper";
    col2.appendChild(wrapper);

    // Create title
    const titleHTML = document.createElement("h4");
    titleHTML.className = "modal-card-title";
    titleHTML.innerHTML = title;
    wrapper.appendChild(titleHTML);

    // Create author
    const authorHTML = document.createElement("h5");
    authorHTML.className = "modal-card-author";
    authorHTML.innerHTML = author;
    wrapper.appendChild(authorHTML);

    // Create year
    const yearHTML = document.createElement("p");
    yearHTML.className = "modal-card-year";
    yearHTML.innerHTML = year;
    wrapper.appendChild(yearHTML);

    // Create button
    const addRmButton = document.createElement("button");
    addRmButton.className = "round-button list-card-add-remove-button";
    addRmButton.setAttribute("id", book_id.toString());
    if (inCollection) {
        addRmButton.className += " add-to-remove";
        addRmButton.addEventListener("click", removeFromCollection, false);
    } else {
        addRmButton.addEventListener("click", addToCollection, false);
    }
    row.appendChild(addRmButton);

    // Create button img
    const buttonImg = document.createElement("img");
    buttonImg.setAttribute("src", "styles/icons/addRemoveSmall.png");
    buttonImg.setAttribute("alt", "Add or remove button image");
    addRmButton.appendChild(buttonImg);

    document.getElementById("main-search-results-list").appendChild(modal_card);
}