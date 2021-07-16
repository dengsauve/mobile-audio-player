const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song title array
const songs = ['dangerzone'];

// Tracking songs
let songIndex = 0;

// Update Song Details
function loadSong(song) {
	title.innerText = song;
	audio.src = `songs/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Initially load song
loadSong(songs[songIndex]);

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play()
}

function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause()
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;

	loadSong(songs[songIndex])

	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex >= songs.length) songIndex = 0;
	
	loadSong(songs[songIndex])

	playSong();
}

function updateProgress(e) {
	let { duration, currentTime } = e.srcElement
	
	// catch bad duration reads - M1 Bug Sur Safari...
	if (duration === Infinity) duration = 185; // ...so they cut it down to 3:05
	
	const progressPercent = (currentTime / duration) * 100.0
	const pp = progressPercent > 100 ? 100 : progressPercent
	progress.style.width = `${pp}%`
}

// Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);