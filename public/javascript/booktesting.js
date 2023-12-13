var url = ``;



function testBookApi(title, author) {
    url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${client_id}`;
    send_unauthorized(url);
}

function getBookshelf(shelf_index) {

    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}`;
    sendAuthorized(url);

}

function getAllBookshelves(){
    url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves`;
    send_authorized(url);
}

function send_authorized(url){
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

getAllBookshelves();