function testBookApi() {
    var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY";

    var bookTitle = "cars";
    var author = "";

    var url = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}+inauthor:${author}&key=${client_id}`;


    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

testBookApi();