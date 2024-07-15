const playlist = [
    { name: "Let Me Down Slowly", artist: "Alec Benjamin", src: "./music/Alec Benjamin - Let Me Down Slowly (Lyrics).mp3", img: "/img/let me down.png" },
    { name: "lovely", artist: "Billie Eilish, Khalid", src: "/music/Billie Eilish, Khalid - lovely (Official Music Video).mp3", img: "/img/lovely.png" },
    { name: "Black car", artist: "Mohit", src: "/music/Black car Mohit (official video).mp3", img: "/img/black car.png" },
    { name: "In This Shirt", artist: "The Irrepressibles", src: "/music/In This Shirt.mp3", img: "/img/2024-07-14_215622.png" },
    { name: "INTRODUCTION", artist: "FARIS SHAFI", src: "/music/INTRODUCTION - FARIS SHAFI.mp3", img: "/img/introduction.png" },
    { name: "Glimpse Of Us", artist: "Joji", src: "/music/Joji - Glimpse Of Us.mp3", img: "/img/glimpsofus.png" },
    { name: "Tasweer", artist: "Jokhay, JJ47, Talha Anjum", src: "/music/Jokhay, JJ47, Talha Anjum - Tasweer (Official Audio).mp3", img: "/img/tasweer.png" },
    { name: "Nazar", artist: "FARIS SHAFI", src: "/music/Nazar -Faris Shafi.mp3", img: "/img/nazar.png" },
    { name: "SORROW", artist: "REAL BOSS x FARMAAN SMG x BIG KAY SMG", src: "/music/SORROW - REAL BOSS x FARMAAN SMG x BIG KAY SMG.mp3", img: "/img/sorrow.png" },

];

const audio = document.getElementById('audio');
const playlistElement = document.getElementById('playlist');
const searchInput = document.getElementById('search');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

let currentIndex = 0;
let isPlaying = false;

function loadPlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => loadSong(index));
        playlistElement.appendChild(li);
    });
}

function loadSong(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    audio.src = song.src;
    albumArt.src = song.img;
    songTitle.textContent = song.name;
    songArtist.textContent = song.artist;
    if (isPlaying) {
        audio.play();
    }
    updatePlayPauseButton();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
}

playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

progress.addEventListener('input', () => {
    const time = (progress.value * audio.duration) / 100;
    audio.currentTime = time;
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPlaylist = playlist.filter(song => 
        song.name.toLowerCase().includes(searchTerm) || 
        song.artist.toLowerCase().includes(searchTerm)
    );
    playlistElement.innerHTML = '';
    filteredPlaylist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => loadSong(playlist.indexOf(song)));
        playlistElement.appendChild(li);
    });
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

loadPlaylist();
loadSong(currentIndex);