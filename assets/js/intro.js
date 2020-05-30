//Music API(RapidAPI-Deezer) for Intro
//Global Variables
var playlist = [];
var searchMusic;
var sound = {};
let isPlaying = false;
//Ajax call function
function ajaxCall(searchMusic) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchMusic,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "b1b91f9733mshf756f13729cdbcep17742fjsn1c8927118912",
    },
  };

  $.ajax(settings).done(function (response) {
    playlist = [];
    for (i = 0; i < response.data.length; i++) {
      playlist.push(response.data[i].preview);
    }
    playMusic(0, playlist);
  });
}

//Function to play music (Howler Js)
function playMusic(i, playlist) {
  if (isPlaying) {
    sound.stop();
  }
  sound = new Howl({
    src: [playlist[i]],
    onend: function () {
      if (i + 1 == playlist.length) {
        playMusic(0, playlist);
      } else {
        playMusic(i + 1, playlist);
      }
    },
  });
  isPlaying = true;
  sound.play();
  //Resume, Pause, & Stop button functions
  $("#resumeBtn").on("click", function () {
    sound.mute(false);
  });
  $("#pauseBtn").on("click", function () {
    sound.mute(true);
  });
  $("#stopBtn").on("click", function () {
    sound.stop();
  });
}
//On Click for our search Btn
var soundIsPlaying = false;
$("#add-music").on("click", function () {
  event.preventDefault();
  playlist = [];
  searchMusic = $("#music-input").val().trim();
  ajaxCall(searchMusic);
});
