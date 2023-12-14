var url = ``;
var key = `AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;
var client_id = '';
var index = 0;
var lastSerachWord = '';
// import { createMainBookCard } from "customComponents";
/**
 * 
 * Saving promise results:
 * 
 * https://stackoverflow.com/questions/64164994/is-there-a-way-to-save-promise-result-as-a-variable
 */


/**
 * 
 * Searches for a book based on the given parameters
 * 
 * @param {*} title The title of the book
 * @param {*} author The author of the book
 * @returns Search results in JSON format
 */
async function searchForBook(title, author) {
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${key}`;
    var result = await send_unauthorized(url, "GET");
    return result;
}

async function searchTitle(title = lastSerachWord, index = 0) {
    lastSerachWord = title;
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${key}&startIndex=${index}`;
    var result = await send_unauthorized(url, "GET");
    var returnResult = JSON.parse(result);
    return returnResult;
}



const searchButton = document.getElementById('main-search-button');
const loadMoreButton = document.getElementById('load-more-button');

searchButton.addEventListener('click', async () => {
    document.getElementById("main-search-results-list").innerHTML = '';

    const searchInput = document.getElementById('main-search-field');
    const title = searchInput.value;
    // console.log("Keyword search: " + title);
    // Call the searchForBook function with the provided parameters
    const returnResult = await searchTitle(title);
    // console.log("Search Resultts gotten successfully");
    // console.log(searchResults);
    document.getElementById('main-search-field').value = '';
    // console.log("SearchResults:");
    if (returnResult && returnResult.items) {
        for (const book of returnResult.items) {
            // console.log(book);

            try{
                createMainBookCard(
                    book.volumeInfo.imageLinks.thumbnail || 'default-thumbnail-url',
                    book.volumeInfo.title || 'Unknown Title',
                    book.volumeInfo.authors || 'Unknown Author', //&& book.volumeInfo.authors.join(', ')) || 'Unknown Author',
                    book.volumeInfo.publishedDate || 'Unknown Date',
                    false,
                    book.id || 'unknown-id'
                );
            }catch(err){
                createMainBookCard(
                    // book.volumeInfo.imageLinks.thumbnail || 'default-thumbnail-url',
                    book.volumeInfo.title || 'Unknown Title',
                    book.volumeInfo.authors || 'Unknown Author', //&& book.volumeInfo.authors.join(', ')) || 'Unknown Author',
                    book.volumeInfo.publishedDate || 'Unknown Date',
                    false,
                    book.id || 'unknown-id'
                );
            }
        }
    } else {
        console.error("Invalid searchResults format. Unable to iterate.");
    }
});

async function loadMore() {
    index += document.getElementById("main-search-results-list").childElementCount;

    const returnResult = await searchTitle(title = lastSerachWord, index = index);
    // console.log("Search Resultts gotten successfully");
    // console.log(searchResults);
    // document.getElementById('main-search-field').value = '';
    // console.log("SearchResults:");
    if (returnResult && returnResult.items) {
        for (const book of returnResult.items) {
            // console.log(book);

            createMainBookCard(
                book.volumeInfo.imageLinks.thumbnail || 'default-thumbnail-url',
                book.volumeInfo.title || 'Unknown Title',
                book.volumeInfo.authors || 'Unknown Author', //&& book.volumeInfo.authors.join(', ')) || 'Unknown Author',
                book.volumeInfo.publishedDate || 'Unknown Date',
                false,
                book.id || 'unknown-id'
            );
        }
    } else {
        console.error("Invalid searchResults format. Unable to iterate.");
    }
}
loadMoreButton.addEventListener('click', async () => {
    loadMore();
});


/**
 * Returns a bookshelf based on the index parameter.
 * 
 * @param {*} shelf_index The index of the shelf we're looking for 
 * @returns Bookshelf in JSON format
 */
async function getBookshelf(shelf_index) {

    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}`;
    var result = await send_authorized(url, "GET");
    return result;
}

/**
 * @returns Returns a list of all of a user's bookshelves
 */
async function getAllBookshelves() {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves`;
    var result = await send_authorized(url, "GET");
    return result;
}

/**
 * Returns a list of all the books within a specified bookshelf
 * @param {*} shelf_idx The index of the shelf we're looking for
 * @returns A list of books in a given bookshelf, in JSON format
 */
async function getBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_idx}/volumes`;
    var result = await send_authorized(url, "GET");
    return result;
}

/**
 * Clears all books from a given bookshelf.
 * 
 * @param {*} shelf_idx The index of the shelf we're looking for
 * @returns Should return an empty array.
 */
async function clearBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_idx}/clearVolumes?key=${key}`;
    var result = await send_authorized(url, "POST");
    return result;
}

/**
 * 
 * Adds a given book to a given bookshelf.
 * 
 * @param {*} book_id The ID of the book we want to add
 * @param {*} shelf_index The index of the shelf we're looking for
 * @returns 
 */
async function addBookToShelf(book_id, shelf_index) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/addVolume?volumeId=${book_id}&country=US`
    var result = await send_authorized(url, "POST");
    return result;
}

/**
 * Removes a given book from a given bookshelf.
 * 
 * @param {*} book_id The ID of the book we want to add
 * @param {*} shelf_index The index of the shelf we're looking for
 * @returns 
 */
async function removeBookFromShelf(book_id, shelf_index) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/removeVolume?volumeId=${book_id}&country=US`
    var result = await send_authorized(url, "POST");
    return result;
}

/**
 * 
 * Sends an authorized HTTP request to the Google Books API for private Google Books data
 * 
 * @param {*} url The query URL
 * @param {*} method The HTTP method
 * @returns Returns the result of the HTTP request
 */
function send_authorized(url, method) {
    var token = "Bearer " + sessionStorage.getItem("oauth_token");
    var httpmethod = method;
    return fetch(url, {
        method: httpmethod,
        headers: {
            'Authorization': token,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var result = JSON.stringify(data);
        return result;
    });
}

/**
 * 
 * Sends a generic, unauthorized HTTP request to the Google Books API for public Google Books data.
 * 
 * @param {*} url The query URL
 * @param {*} method The HTTP method
 * @returns Returns the result of the HTTP request
 */
function send_unauthorized(url, method) {
    var httpmethod = method;
    return fetch(url, {
        method: httpmethod,
        headers: {},
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var result = JSON.stringify(data);
        return result;
    });
}


/**
 * An example of getting all of a user's bookshelves and then printing it to console
 */
// var x = getAllBookshelves.then(result => {
//     console.log(result); //prints out the json response
// }).catch(error => {

// })

/**
 * An example of adding a book to the favorites shelf
 */
// var x = addBookToShelf("Sm5AKLXKxHgC", 0).then(result => {
//     console.log(result); //prints out the json response
// }).catch(error => {

// })


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

    // // Create button
    // const addRmButton = document.createElement("button");
    // addRmButton.className = "round-button list-card-add-remove-button";
    // addRmButton.setAttribute("id", book_id.toString());
    // if (inCollection) {
    //     addRmButton.className += " add-to-remove";
    //     // addRmButton.addEventListener("click", removeFromCollection, false);
    // }
    // else {
    //     // addRmButton.addEventListener("click", addToCollection, false);
    // }
    // row.appendChild(addRmButton);
    //
    // // Create button img
    // const buttonImg = document.createElement("img");
    // buttonImg.setAttribute("src", "styles/icons/addRemoveSmall.png");
    // buttonImg.setAttribute("alt", "Add or remove button image");
    // addRmButton.appendChild(buttonImg);

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

    // // Create button
    // const addRmButton = document.createElement("button");
    // addRmButton.className = "round-button list-card-add-remove-button";
    // addRmButton.setAttribute("id", book_id.toString());
    // if (inCollection) {
    //     addRmButton.className += " add-to-remove";
    //     addRmButton.addEventListener("click", removeFromCollection, false);
    // } else {
    //     addRmButton.addEventListener("click", addToCollection, false);
    // }
    // row.appendChild(addRmButton);
    //
    // // Create button img
    // const buttonImg = document.createElement("img");
    // buttonImg.setAttribute("src", "styles/icons/addRemoveSmall.png");
    // buttonImg.setAttribute("alt", "Add or remove button image");
    // addRmButton.appendChild(buttonImg);

    modal_card.addEventListener("click", handleClick)

    document.getElementById("main-search-results-list").appendChild(modal_card);
}





// Card Transition Helpers
// Function to handle the click event
function handleClick(event) {
    // Access the clicked div
    const clickedDiv = event.target;

    var parentModal = event.target.parentNode;
    if(parentModal.className == "modal-info-wrapper"){
        console.log(parentModal);

        var title = parentModal.children[0];
        var author = parentModal.children[1];
        var year = parentModal.children[2];

        var book_info = {
            bookTitle: parentModal.children[0].innerHTML,
            bookAuthor: parentModal.children[1].innerHTML,
            bookYear: parentModal.children[2].innerHTML
        }

        var json =JSON.stringify(book_info);
        sessionStorage.setItem('book_info',json);



        // console.log(title);

    }

    // Transition
    const bookCover = clickedDiv.getElementsByClassName("modal-card-cover");
    bookCover.item(0).style.viewTransitionName = 'book-cover';
    window.location.href = '/details';
    // console.log("page redirected")
}