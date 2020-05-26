//Google SignIn API
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
//Music API(RapidAPI-Deezer)
var settings = {
  async: true,
  crossDomain: true,
  url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=daft%20punk",
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "ef5bea5c6amsh497e430e661a57bp15627ejsn17abd9160d1e",
  },
};
//Music Playlist w/ title
var playlist = [];
var playlistTitles = [];
$.ajax(settings).done(function (response) {
  console.log(response);
  for (i = 0; i < response.data.length; i++)
    playlist.push(response.data[i].preview);
  //Playlist titles
  for (i = 0; i < response.data.length; i++)
    playlistTitles.push(response.data[i].title);

  playMusic(0, playlist);
});

console.log(playlist);
console.log(playlistTitles);
//Function to play music (Howler Js)
function playMusic(i, playlist) {
  var sound = new Howl({
    src: [playlist[i]],
    onend: function () {
      if (i + 1 == playlist.length) {
        playMusic(0, playlist);
      } else {
        playMusic(i + 1, playlist);
      }
    },
  });
  sound.play();
  // $("#playBtn").click(function () {
  //   playMusic();
  // });

  // completely stops music
  $("#pauseBtn").click(function playMusic(i, playlist) {
    sound.pause();
  });
}
playMusic(0, playlist);
