var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY";
function testBookApi(title) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${client_id}`;

    console.log("IN TEST:")
    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

function addLuibrary(title) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${client_id}`;


    let test = fetch(url);
    test.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}

//Search for a book with a title that includes "programming", and don't include a author
testBookApi("Faith Healers and the Bible");