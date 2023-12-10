var client_id = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY"; 

function getUserIDFromBookshelf() {
    // Make an authenticated request to get a Bookshelf resource
    return fetchBookshelfResource()
        .then(res => res.json())
        .then(data => {
            
            // Check if the selfLink property exists in the Bookshelf resource
            if (data && data.selfLink) {
                var userId = extractUserIDFromSelfLink(data.selfLink);
                return userId;
            } else {
                console.log(data.data)
                throw new Error("Unable to retrieve user ID from Bookshelf resource.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function extractUserIDFromSelfLink(selfLink) {
    var pathSegments = new URL(selfLink).pathname.split('/');
    var userId = pathSegments[pathSegments.length - 1];
    return userId;
}

function fetchBookshelfResource() {

    var url = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/0';
    url += `&key=${client_id}`;
    console.log('URL:' + url)
    return fetch(url);
}


getUserIDFromBookshelf().then(userId => {
    console.log("User ID:", userId);
});
