let tm = document.getElementById("t_min");
let ts = document.getElementById("t_sec");
let bm = document.getElementById("b_min");
let bs = document.getElementById("b_sec");

let startpause = document.getElementById("startpause");
let reset = document.getElementById("reset");

var sBtn = document.getElementById("settings");
var save = document.getElementById("save");
let pTime = document.getElementById("ptime");
let bTime = document.getElementById("btime");
let pt, bt;

let volumeIcon = document.getElementById("volume-icon");
let audioIcon = document.getElementById("audio-icon");
let timerAudio = document.getElementById("timer-audio");

let video = document.querySelector("video");

//Pomodoro timer section

let startTimer;
startpause.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
    startpause.innerText = "Pause";
  } else {
    clearInterval(startTimer);
    startpause.innerText = "Start";
    startTimer = undefined;
  }
});

function resettimer() {
  if (pt === undefined && bt === undefined) {
    tm.innerText = 25;
    ts.innerText = "00";

    bm.innerText = "0"+5;
    bs.innerText = "00";
  } else {
    change_time();
    ts.innerText = "00";
    bs.innerText = "00";
  }

  clearInterval(startTimer);
  startpause.innerText = "Start";
  startTimer = undefined;
}

reset.addEventListener("click", function () {
  resettimer();
});

let timerbell = true;
function timer() {
  //pomodoro timing
  if (ts.innerText != 0) {
    ts.innerText--;
  } else if (tm.innerText != 0 && ts.innerText == 0) {
    ts.innerText = 59;
    tm.innerText--;
  }

  //break timing
  if (tm.innerText == 0 && ts.innerText == 0) {
    if (timerbell) {
      playAudio();
      timerbell = false;
    }
    if (bs.innerText != 0) {
      bs.innerText--;
    } else if (bm.innerText != 0 && bs.innerText == 0) {
      bs.innerText = 59;
      bm.innerText--;
    }
  }

  if (
    tm.innerText == 0 &&
    ts.innerText == 0 &&
    bm.innerText == 0 &&
    bs.innerText == 0
  ) {
    playAudio();
    resettimer();
  }
}

//menu open close button code
sBtn.addEventListener("click", function () {
  const toggleMenu = document.querySelector(".menu");
  toggleMenu.classList.toggle("active");
});

//change time from settings
save.addEventListener("click", function () {
  change_time();
});

function change_time() {
  pt = pTime.value;
  bt = bTime.value;

  if (pt.length == 1 && bt.length == 1) {
    tm.innerHTML = "0" + pTime.value;
    bm.innerHTML = "0" + bTime.value;
    ts.innerHTML = "00";
    bs.innerHTML = "00";
  } else if (pt.length == 1) {
    tm.innerHTML = "0" + pTime.value;
    bm.innerHTML = bTime.value;
    ts.innerHTML = "00";
    bs.innerHTML = "00";
  } else if (bt.length == 1) {
    tm.innerHTML = pTime.value;
    bm.innerHTML = "0" + bTime.value;
    ts.innerHTML = "00";
    bs.innerHTML = "00";
  } else if (pt.length == 2 && bt.length == 2) {
    tm.innerHTML = pTime.value;
    bm.innerHTML = bTime.value;
    ts.innerHTML = "00";
    bs.innerHTML = "00";
  } else {
    tm.innerHTML = "25";
    ts.innerHTML = "00";
    bm.innerHTML = "05";
    bs.innerHTML = "00";
  }
}

//Timer audio play/mute functionality
timerAudio.muted = true;

function playAudio() {
  if (volumeIcon.className != "fas fa-volume-mute fa-2x col-2 p-0") {
    timerAudio.play();
    timerAudio.muted = false;
  } else {
    timerAudio.muted = true;
  }
}

//mute unmute button code
volumeIcon.addEventListener("click", function () {
  if (timerAudio.muted) {
    volumeIcon.className = "fas fa-volume-mute fa-2x col-2 p-0";
    timerAudio.muted = false;
  } else {
    volumeIcon.className = "fas fa-volume-up fa-2x col-2 p-0";
    timerAudio.muted = true;
  }
});

//Video Changing Fuctionality

let videoShuffleBtn = document.getElementById("video-shuffle-btn");
videoShuffleBtn.addEventListener("click", function () {
  chooseVid();
});
let vidCounter = 0;
function chooseVid() {
  var videoStorage = [
      "assets/video/vid1.mp4",
      "assets/video/vid2.mp4",
      "assets/video/vid3.mp4",
      "assets/video/vid4.mp4",
    ],
    // choose one random url from our storage as the active video
    activeVideo = videoStorage[vidCounter];
  vidCounter < videoStorage.length - 1 ? vidCounter++ : (vidCounter = 0);

  // check which file extension your browser can play and set the video source accordingly
  video.setAttribute("src", activeVideo);
}

//video audio button
let videoAudioBtn = document.getElementById("video-audio-btn");
videoAudioBtn.addEventListener("click", vidAudio, false);

function vidAudio() {
  if (video.muted) {
    video.muted = false;
    audioIcon.className = "fas fa-volume-up fa-2x";
  } else {
    video.muted = true;
    audioIcon.className = "fas fa-volume-mute fa-2x";
  }
}

// Todo list functionalities

window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  let el_count = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    input.value = '';

    if (el_count > 3) {
      document.getElementById("task-bg-box").style.overflowY = "scroll";
      document.getElementById("task-bg-box").style.height = "320px";
    }

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text-light");
    task_input_el.type = "text";
    task_input_el.value = task;

    task_content_el.appendChild(task_input_el);

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = '<i class="fa fa-solid fa-trash"></i>';

    task_el.appendChild(task_delete_el);

    list_el.appendChild(task_el);
    el_count++;

    task_delete_el.addEventListener("click", (e) => {
      list_el.removeChild(task_el);
      el_count--;
    });
  });
});

// Music Player Functionality

const musicContainer = document.getElementById("music-bg-box");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ["Study", "Relax", "Ukulele"];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/music/${song}.mp3`;
  cover.src = `assets/images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
  

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

