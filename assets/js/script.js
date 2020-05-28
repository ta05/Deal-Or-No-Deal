//Music API for Index
var settings = {
  async: true,
  crossDomain: true,
  url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=calvin%20harris",
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "ef5bea5c6amsh497e430e661a57bp15627ejsn17abd9160d1e",
  },
};
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
  //Play/Pause/Resume Btns
  sound.play();
  $("#playBtn").on("click", function () {
    return sound;
  });

  $("#resumeBtn").on("click", function () {
    sound.mute(false);
  });
  $("#pauseBtn").on("click", function () {
    sound.mute(true);
  });
  $("#stopBtn").on("click", function () {
    sound.stop();
  });
  sound.on("end", function () {
    $("#playBtn").disabled = true;
    $("#playBtn").css("display", "none");
  });
  sound.on("play", function () {
    $("#playBtn").disabled = true;
    $("#playBtn").css("display", "none");
  });
  sound.on("stop", function () {
    $("#playBtn").css("display", "none");
    $("#resumeBtn").css("display", "none");
    $("#pauseBtn").css("display", "none");
    $("#stopBtn").css("display", "none");
  });

  playMusic(0, playlist);
}
