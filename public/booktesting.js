var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY";
function testBookApi(title, author) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${client_id}`;


    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

//Search for a book with a title that includes "programming", and don't include a author
testBookApi("Programming", "");