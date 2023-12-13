var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY";
var daniel_uid = "113703336771319867948";
function testBookApi(title, author) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${client_id}`;
    send_unauthorized(url);
}

function getBookshelf(shelf_index) {

    var url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf_index}`;
    sendAuthorized(url);

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
    console.log(token);

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
    console.log(token);

    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
}
function testBookshelfFunc() {
    console.log("DBG> Public bookshelf (0): ");
    getBookshelf(0);
}

testBookApi();