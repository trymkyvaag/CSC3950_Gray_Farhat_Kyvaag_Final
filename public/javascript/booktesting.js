var url = ``;
var key = `AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;
var client_id = '';
console.log("IN BOOKTESTING");
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

async function searchTitle(title) {
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${key}`;
    var result = await send_unauthorized(url, "GET");
    return result;
}

console.log("TEST SEARCH");
const searchButton = document.getElementById('main-search-button');
searchButton.addEventListener('click', async () => {
    console.log("In event listner");
    // Get the title and author from user input 
    const searchInput = document.getElementById('main-search-field');
    const title = searchInput.value;
    console.log("Keyword search: " + title);


    // Call the searchForBook function with the provided parameters
    const searchResults = await searchTitle(title);
    console.log("Search Resultts: " + searchResults);

    console.log(searchResults);
    document.getElementById('main-search-field').value = '';



});

// Process the search results (replace with your logic)
console.log(searchResults);

searchForBook("Hello", "");
console.log("FINISH");

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