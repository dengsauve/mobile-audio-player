const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('#audio');

const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

let playing = false;

// Song title array
const songs = [
	'DanceMonkey-DanieleVitaleSax',
	'GoonSquad-Ripe',
	'DangerZone-KennyLoggins',
	'Lola-Ripe'
];

// Tracking songs
let songIndex = 0;

// Update Song Details
function loadSong(song) {
	title.innerText = song.split('-')
		.join(': ')
		.replace(/([A-Z])/g, ' $1')
		// uppercase the first character
		.replace(/^./, function(str) { return str.toUpperCase(); })

	audio.src = `songs/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Initially load song
loadSong(songs[songIndex]);

function playSong() {
	playing = true;
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play()
}

function pauseSong() {
	playing = false;
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause()
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;

	loadSong(songs[songIndex])

	if (playing) playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex >= songs.length) songIndex = 0;

	loadSong(songs[songIndex])

	if (playing) playSong();
}

function updateProgress(e) {
	let { duration, currentTime } = e.srcElement

	// catch bad duration reads - M1 Bug Sur Safari...
	if (duration === Infinity) duration = 185; // ...so they cut it down to 3:05

	const progressPercent = (currentTime / duration) * 100.0
	const pp = progressPercent > 100 ? 100 : progressPercent
	progress.style.width = `${pp}%`
}

// Set progress bar
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = (audio.duration === Infinity) ? 185 : audio.duration
	
	console.log(width, clickX, duration, Math.round((clickX / width) * duration))

	audio.currentTime = Math.round((clickX / width) * duration);
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
			 sec = Math.floor(x);
			 sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
			 sec_d = (isNaN(duration) === true)? '0':
			 Math.floor(x);
			 sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};


// Event Listeners
playBtn.addEventListener('click', () => {
	if (playing) {
		pauseSong();
	} else {
		playSong();
	}
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Song ends
audio.addEventListener('ended', nextSong);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('timeupdate', updateProgress);

// Time of song
audio.addEventListener('timeupdate',DurTime);