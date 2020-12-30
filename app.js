const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const outlineLength = outline.getTotalLength();
  //Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;


  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;


  //pick differnet sound
  sounds.forEach(sound => {
    sound.addEventListener('click', () => {
      song.src = sound.getAttribute('data-sound');
      video.src = sound.getAttribute('data-video')
    })
  })


  //Play sound
  play.addEventListener('click',() => {
    checkPlaying(song)
  }) 

  //select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', () => {
      fakeDuration = option.getAttribute("data-time");      
      timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
    })
  })

  // Create a function to dynamically play and pause
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // animate the circle and check time
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress
    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;


    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './sv/play.svg';
      video.pause();
    }
  }
}

app();