// var user_key = "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY"; //TODO: Need to change this and set dynamically

// function getUserIDFromBookshelf() {
//     // Make an authenticated request to get a Bookshelf resource
//     return fetchBookshelfResource()
//         .then(res => res.json())
//         .then(data => {

//             // Check if the selfLink property exists in the Bookshelf resource
//             if (data && data.selfLink) {
//                 var userId = extractUserIDFromSelfLink(data.selfLink);
//                 return userId;
//             } else {
//                 console.log(data.data)
//                 throw new Error("Unable to retrieve user ID from Bookshelf resource.");
//             }
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// }

// async function fetchBookshelfResourceFromURL(url) {
//     try {
//         // Extract UID from the provided URL
//         const userId = extractUserIDFromSelfLink(url);

//         // Append UID to the base URL
//         const apiUrl = `https://books.google.com/books?uid=${userId}`;
//         console.log('API URL:', apiUrl);

//         // Fetch the resource
//         const response = await fetch(apiUrl);

//         if (response.ok) {
//             console.log(response);
//             const data = await response.json();
//             return { success: true, data };
//         } else {
//             console.error('Failed to fetch resource');
//             return { success: false, error: 'Failed to fetch resource' };
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return { success: false, error: 'Server error' };
//     }
// }

function extractUserIDFromSelfLink(selfLink) {
    try {
        const url = new URL(selfLink);
        const searchParams = new URLSearchParams(url.search);
        const userId = searchParams.get('uid');
        return userId;
    } catch (error) {
        console.error('Error extracting userID:', error);
        return null;
    }
}

async function fetchBookshelfResourceFromURL(url) {
    try {
        // Extract UID from the provided URL
        const userId = extractUserIDFromSelfLink(url);

        if (!userId) {
            console.error('UID not found in the URL');
            return { success: false, error: 'UID not found in the URL' };
        }

        // Append UID to the base URL
        const apiUrl = `https://books.google.com/books?uid=${userId}`;
        console.log('API URL:', apiUrl);
        console.log("userID: " + userId);

        // Fetch the resource
        const response = await fetch(apiUrl);

        console.log('Response URL:', response.url);

        if (response.ok) {
            // Handle HTML content separately
            const htmlContent = await response.text();

            // console.log('HTML Content:', htmlContent);
            return { success: true, htmlContent };
        } else {
            console.error('Failed to fetch resource');
            return { success: false, error: 'Failed to fetch resource' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: 'Server error' };
    }
}




const url = 'https://books.google.com?uid=102648910697821551523';
fetchBookshelfResourceFromURL(url)
    .then(result => {
        if (result.success) {
            console.log('Success')//'HTML Content:', result.htmlContent);
        } else {
            console.error('Error:', result.error);
        }
    });



// // Example usage:
// const googleBooksAPIURL = 'https://www.googleapis.com/books/&key=AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY';
// const key = '831425261552-etagdiu9au5k6qpra3cm6f3mth6379tn.apps.googleusercontent.com';

// const extractedUID = extractUIDFromGoogleBooksAPI(googleBooksAPIURL, key, title);

// console.log('Extracted UID:', extractedUID);


// // Example usage
// const clientId = '831425261552-etagdiu9au5k6qpra3cm6f3mth6379tn.apps.googleusercontent.com';
// const clientSecret = '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';

// const googleBooksLink = createGoogleBooksLink(clientId, clientSecret);
// console.log(googleBooksLink);