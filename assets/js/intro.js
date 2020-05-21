//Google Sign in API
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function onSignIn() {
  console.log("signin");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log("success");
      var token = result.credential.accessToken;
      var user = result.user;
      if (user) {
        window.location = "index.html";
      }
    })
    .catch(function (error) {
      console.log("fail");
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
      console.log("success");
      window.location = "intro.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("error");
    });
}
//Music API
var settings = {
  async: true,
  crossDomain: true,
  url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=Daft%20Punk",
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "ef5bea5c6amsh497e430e661a57bp15627ejsn17abd9160d1e",
  },
};
//must create an array of preview sounds
$.ajax(settings).then(function (response) {
  var music = response.data[3].preview;
  console.log(music);
  // for (var i = 0; i < music.length; i++) {
  //   if ((music.data[i] = true))
  var sound = new Howl({
    autoplay: true,
    loop: true,
    src: music,
  });

  sound.play(window.onload);
  // }
});
