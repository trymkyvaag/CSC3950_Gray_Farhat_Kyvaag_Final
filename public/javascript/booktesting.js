var url = ``;
var key = `AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;
var client_id = '';

async function testBookApi(title, author) {
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${key}`;
    var result = await send_unauthorized(url, "GET");
    return result;
}

async function getBookshelf(shelf_index) {

    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}`;
    var result = await send_authorized(url, "GET");
    return result;
}

async function getAllBookshelves() {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves`;
    var result = await send_authorized(url, "GET");
    return result;
}

async function getBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_idx}/volumes`;
    var result = await send_authorized(url, "GET");
    return result;
}

function clearBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/9/clearVolumes?key=${key}`;
    send_authorized(url, "POST");
}

function addBookToShelf(book_id, shelf_index) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/addVolume?volumeId=${book_id}&country=US`
    send_authorized(url, "POST");
}

function removeBookFromShelf(book_id, shelf_index) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/removeVolume?volumeId=${book_id}&country=US`
    send_authorized(url, "POST");
}

function send_authorized(url, method) {
    var res;
    var token = "Bearer " + sessionStorage.getItem("oauth_token");
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var userid = JSON.stringify(data);
        return userid;
    });
}

function send_unauthorized(url, method) {
    var res;
    return fetch(url, {
        method: 'GET',
        headers: {},
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var userid = JSON.stringify(data);
        return userid;
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
 * An example of searching for a book
 */
// var x = testBookApi("Harry Potter", "").then(result => {
//     console.log(result); //prints out the json response
// }).catch(error => {

// })