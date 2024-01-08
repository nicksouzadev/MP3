const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Senhor Tu És a Minha Porção',
        cover: 'assets/1.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Teu servo ouve, fala Senhor!',
        cover: 'assets/2.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Deus nos elegeu para Si',
        cover: 'assets/3.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Somos jóias preciosas!',
        cover: 'assets/4.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Cristo é a Esperança',
        cover: 'assets/5.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Sou crente em Jesus',
        cover: 'assets/6.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Senhor, conforta meu coração',
        cover: 'assets/7.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Eu desejo Senhor!',
        cover: 'assets/8.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'De Deus tu és eleita',
        cover: 'assets/9.jpg',
        artist: 'Ester Alcântara',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Eu sou um Cordeirinho!',
        cover: 'assets/10.jpg',
        artist: 'Ester Alcântara',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Altera o ícone do botão de reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Define o título do hover do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Altera o ícone do botão de pausa
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Define o título do hover do botão
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);