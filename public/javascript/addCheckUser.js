var admin = require("firebase-admin");

var serviceAccount = require("../../key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://webdevfinal-1b6d7-default-rtdb.firebaseio.com"
});

const db = admin.database();
const rootRef = db.ref('/');

async function checkAndAddUser(userId) {
    try {
        var userEmail = "test@mai2l.no";
        console.log(userId);

        const tmpUser = {
            email: userEmail,
            uid: userId,
        }

        const snapshot = await rootRef.once('value'); // Use once('value') to get the data

        const users = snapshot.val();

        // Check if user with the same UID already exists
        const userExists = Object.values(users).some(existingUser => existingUser.uid === tmpUser.uid);

        if (userExists) {
            console.log('User already exists in the database');
        } else {
            await rootRef.push(tmpUser);
            console.log('New user added to the database');
        }
    } catch (error) {
        console.error('Error checking and adding user:', error.message);
    }
}

async function getAllEmails() {
    try {
        const snapshot = await rootRef.once('value');

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

// checkAndAddUser();
module.exports = {
    checkAndAddUser,
    getAllEmails
};