var provider = new firebase.auth.GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function handleLogin() {
  firebase.auth()
    .signInWithRedirect(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'home.html'; //After successful login, user will be redirected to home.html
  }
});

