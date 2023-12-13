var url = ``;
var key = `AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;


function testBookApi(title, author) {
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${client_id}`;
    send_unauthorized(url);
}

function getBookshelf(shelf_index) {

    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}`;
    send_authorized(url, "GET");

}

async function getAllBookshelves() {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves`;
    var result = await send_authorized(url, "GET");
    return result;
}

function getBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_idx}/volumes`;
    send_authorized(url, "GET");
}

function clearBooksFromShelf(shelf_idx) {
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/9/clearVolumes?key=AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;
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

// removeBookFromShelf("NRWlitmahXkC");
// addBookToShelf("NRWlitmahXkC");


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

var x = getAllBookshelves().then(result => {
    console.log(result);
}).catch(error => {

})

function send_unauthorized(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", url, true);

    var token = "Bearer " + sessionStorage.getItem("oauth_token");

    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
}
