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

getBookshelves(daniel_uid);




