// Songs CLass 
class Songs{
  constructor({name= '', artist = '', src = '', thumbNail_SRC = ''}) {
    this.name = name;
    this.artist = artist;
    this.src = src;
    this.thumbNail_SRC = thumbNail_SRC
  }
}

// song list with song Obj
var songList = [
  new Songs({name: "We Don't Talk Anymore", src: "music/Charlie Puth - We Don t Talk Anymore feat. Selena Gomez.mp3", artist: "Charlie Puth,  feat. Selena Gomez",  thumbNail_SRC: "music/song-2.jpg"}),
  ]


// Variables
var SongIndex = 0
var is_playing = false;  
var song_cover = songList[SongIndex].thumbNail_SRC
const nextBTN = document.querySelector(".play-next-btn")
const statBTN = document.querySelector(".play-pause-btn")
const previousBTN = document.querySelector(".play-previous-btn")
const musicImg = document.querySelector(".music-img")
const musicNameDiv = document.querySelector(".music-details>.music-name")
const musicArtistDiv = document.querySelector(".music-details>.artist-name ")
const progressBar = document.querySelector(".progressBar")
const progress = document.querySelector(".progress")


// AUDIO Object
const music = new Audio(songList[SongIndex].src)


function init() {
  is_playing = false;
  SongIndex = 0;
  song_cover = songList[SongIndex].thumbNail_SRC;
  progress.style.width = 0;
  musicImg.style.backgroundImage = `url(${song_cover})`
  musicNameDiv.innerText = songList[SongIndex].name;
  musicArtistDiv.innerText = songList[SongIndex].artist;
}

// functions
function playMusic(){
  music.play()
  is_playing = true
  song_cover = songList[SongIndex].thumbNail_SRC
  progress.style.width = 0;
  statBTN.style.backgroundImage =  "url(icon/white/icons8-pause-50-3.png)"
  musicImg.style.animationPlayState = "running"


    musicImg.style.backgroundImage = `url(${song_cover})`
    musicNameDiv.innerText = songList[SongIndex].name;
    musicArtistDiv.innerText = songList[SongIndex].artist;

}

function pauseMusic(){
  music.pause()
  is_playing = false
  statBTN.style.backgroundImage =  "url(icon/white/icons8-play-50-3.png)"
  musicImg.classList.remove("rotating")
  musicImg.style.animationPlayState = "paused"
}


// Event Listners
nextBTN.addEventListener("click", ()=>{
  if (SongIndex >= songList.length  - 1) {
    SongIndex = 0
    music.src = songList[SongIndex].src
    playMusic()
  }
  else{
    SongIndex += 1
    music.src = songList[SongIndex].src
    playMusic()
  }
} )

previousBTN.addEventListener("click", ()=>{
  if (SongIndex <= 0) {
    SongIndex = songList.length - 1
    music.src = songList[SongIndex].src
    playMusic()
  }
  else{
    SongIndex -= 1
    music.src = songList[SongIndex].src
    playMusic()
  }
} )

statBTN.addEventListener("click", ()=>{
  if (is_playing){
    pauseMusic()
  }
  else{
    playMusic()
  }
})

music.addEventListener("timeupdate", (e)=>{
  if (music.currentTime) {
    progress.style.width = `${(music.currentTime / music.duration) * 100}%`
  }
  if (music.currentTime == music.duration) {
    if (SongIndex >= songList.length  - 1) {
      SongIndex = 0
      music.src = songList[SongIndex].src
      playMusic()
    }
    else{
      SongIndex += 1
      music.src = songList[SongIndex].src
      playMusic()
    }
  }
})

progressBar.addEventListener("click", (e)=>{
  music.currentTime = ( music.duration / progressBar.offsetWidth ) * e.offsetX
})

init()