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

function getAllBookshelves(){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves`;
    send_authorized(url, "GET");
}

function getBooksFromShelf(shelf_idx){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_idx}/volumes`;
    send_authorized(url, "GET");
}

function clearBooksFromShelf(shelf_idx){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/9/clearVolumes?key=AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY`;
    send_authorized(url, "POST");
}

function addBookToShelf(book_id){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/addVolume?volumeId=${book_id}&country=US`
    send_authorized(url, "POST");
}

function removeBookFromShelf(book_id, shelf_index){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}/removeVolume?volumeId=${book_id}&country=US`
    send_authorized(url, "POST");
}

// removeBookFromShelf("NRWlitmahXkC");
addBookToShelf("NRWlitmahXkC");


function send_authorized(url, method){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open(method, url, true);

    var token = "Bearer " + sessionStorage.getItem("oauth_token");

    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
}

function send_unauthorized(url){
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
