var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY";
var daniel_uid = "113703336771319867948";
function testBookApi(title, author) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${client_id}`;


    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

function getBookshelves(user_id) {
    var url = `https://www.googleapis.com/books/v1/users/${user_id}/bookshelves`;


    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

// getBookshelves(daniel_uid);

function test() {

    var url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0`;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
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

test();