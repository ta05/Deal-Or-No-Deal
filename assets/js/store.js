//Google Sign In API
var firebaseConfig = {
  apiKey: "AIzaSyDI_E1xYO1zcCP4NiTGSEyAdHpgFG3i-bM",
  authDomain: "project-1-1589847417885.firebaseapp.com",
  databaseURL: "https://project-1-1589847417885.firebaseio.com",
  projectId: "project-1-1589847417885",
  storageBucket: "project-1-1589847417885.appspot.com",
  messagingSenderId: "214174832716",
  appId: "1:214174832716:web:2f57cd660785bdc1ccfce9",
  measurementId: "G-L7N4E48R2Z",
};
var user1;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function onSignIn() {
  // console.log("signin");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // console.log("success");
      var token = result.credential.accessToken;
      var user = result.user;
      user1 = 2;
      if (user) {
        window.location = "index.html";
      }
      // console.log(user1);
    })
    .catch(function (error) {
      // console.log("fail");
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}
function onSignOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // console.log("success");
      window.location = "intro.html";
    })
    .catch(function (error) {
      // An error happened.
      // console.log("error");
    });
}

//Function that stores winnings into our firebase database
function writeData() {
  if (!savedWinnings && $("#name").val().trim() !== "") {
    savedWinnings = true;
    firebase
      .database()
      .ref("User")
      .push({
        name: $("#name").val(),
        score: localStorage.getItem("winnings"),
      });
  }
}
var savedWinnings = false;
