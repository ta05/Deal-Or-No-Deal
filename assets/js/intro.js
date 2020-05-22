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

// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=daft%20punk",
//   method: "GET",
//   headers: {
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "ef5bea5c6amsh497e430e661a57bp15627ejsn17abd9160d1e",
//   },
// };
// var playlist = [];
// $.ajax(settings).done(function (response) {
//   console.log(response);
//   for (i = 0; i < response.data.length; i++)
//     playlist.push(response.data[i].preview);
//   console.log(playlist);
//   playPlaylist(createPlaylist());
// });

// function createPlaylist() {
//   var sound = [];
//   for (var i = 0; i < playlist.length; i++) {
//     sound.push(
//       new Howl({
//         autoplay: true,
//         src: playlist[i],
//         pCount: i,
//         onend: function () {
//           if (pCount === sound.length - 1) sound[0].play();
//           else sound[pCount + 1].play();
//         },
//       })
//     );
//   }
//   return sound;
// }
// function playPlaylist(sound) {
//   sound[0].play();
// }

//CREATE PLAYLIST FUNCTION
// function createPlaylist() {
//   var sound = [];
//   for (var i = 0; i < playlist.length; i++) {
//     sound.push(
//       new Howl({
//         autoplay: true,
//         src: playlist[i],
//       })
//     );
//   }
// }

//WORKING CODE
var sound1 = new Howl({
  src:
    "https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-7.mp3",
  onend: function () {
    var sound2 = new Howl({
      autoplay: true,
      src:
        "https://cdns-preview-b.dzcdn.net/stream/c-ba4c8bea8d5111bd444dc55ac9b21ef1-6.mp3",
      onend: function () {
        var sound3 = new Howl({
          autoplay: true,
          src:
            "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-5.mp3",
          onend: function () {
            sound1.play();
          },
        });
      },
    });
  },
});
$("#playBtn").on("click", function () {
  sound1.play();
});
$("#pauseBtn").on("click", function () {
  sound1.pause();
});
