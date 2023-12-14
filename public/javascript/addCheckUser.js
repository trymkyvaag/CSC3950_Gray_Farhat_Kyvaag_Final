const firebase = require('firebase/app');
const db = require('firebase/database');

var config = {
    apiKey: "AIzaSyDC9zpVAnoBNi0T__-qUv6PbdA_sgrnbGY",
    authDomain: "webdevfinal-1b6d7.firebaseapp.com",
    projectId: "webdevfinal-1b6d7",
    storageBucket: "webdevfinal-1b6d7.appspot.com",
    messagingSenderId: "831425261552",
    appId: "1:831425261552:web:69f0d0e1e7a5193ef57735",
    measurementId: "G-CJPK72JB1N"
};
const app = firebase.initializeApp(config);
const database = db.getDatabase();

const rootRef = db.ref(database);

async function checkAndAddUser() {
    try {
        // Check if user with the same UID exists
        // var userId = document.getElementById("books-uid-field").value;
        var userId = "1234" //TODO: get from line above
        var userEmail = "test@mail.no"; //Same thing
        console.log(userId);
        // const userQuery = db.query(rootRef, db.equalTo('uid', user.uid));
        const tmpUser = {
            email: userEmail,
            uid: userId,
        }
        // const userSnapshot = await db.get(userQuery);
        const snapshot = await db.get(rootRef);
        const users = snapshot.val();

        // Check if user with the same UID already exists
        const userExists = Object.values(users).some(existingUser => existingUser.uid === tmpUser.uid);


        if (userExists) {
            console.log('User already exists in the database');
        } else {
            await db.push(rootRef, tmpUser);
            console.log('New user added to the database');
        }
    } catch (error) {
        console.error('Error checking and adding user:', error.message);
    }
}

async function getAllEmails() {
    try {
        const snapshot = await db.get(rootRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            const emails = [];

            // Iterate through the users and collect emails
            Object.values(users).forEach(user => {
                if (user.email) {
                    emails.push(user.email);
                }
            });

            console.log('All emails in the database:', emails);
            return emails;
        } else {
            console.log('No data in the database');
            return [];
        }
    } catch (error) {
        console.error('Error getting emails from the database:', error.message);
        return [];
    }
}


// getAllEmails();
checkAndAddUser();
// export { checkAndAddUser, getAllEmails }