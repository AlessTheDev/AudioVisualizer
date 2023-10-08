import SceneManager from './objects/SceneManager.js'

//Objects imports
import Scene from './objects/Scene.js'
import AudioBars from './objects/AudioBars.js';
import AudioAnalyzer from './AudioAnalyzer.js';
import FrequencyBand from './FrequencyBand.js';
import RythmicCircle from './objects/RythmicCircle.js';

//Audio 
let audio = new Audio();
audio.volume = 1;

const file: any = document.getElementById("file-upload");
file?.addEventListener("change", () => {
  audio.src = URL.createObjectURL(file.files[0]);
  audio.load();
  audio.play();

  audio.volume = 0.5;


  let frequencyBands = [
    new FrequencyBand(0, 86),
    new FrequencyBand(87, 172),
    new FrequencyBand(173, 344),
    new FrequencyBand(345, 688),
    new FrequencyBand(689, 1376),
    new FrequencyBand(1377, 2752),
    new FrequencyBand(2753, 5504),
    new FrequencyBand(5505, 11008),
  ]

  initAudioBars();
  initMusicCircle(frequencyBands);
})

function initAudioBars() {
  const audioContext = new window.AudioContext();

  let audioBars: AudioBars;

  let audioAnalyzer: AudioAnalyzer

  // AudioBars frequency bands
  const frequencyBands: FrequencyBand[] = [
    new FrequencyBand(2753, 5504),
    new FrequencyBand(10, 86),
    new FrequencyBand(60, 250),     // Bass
    new FrequencyBand(345, 400),
    new FrequencyBand(2000, 4000),  // Upper Midrange
    new FrequencyBand(689, 1376),
    new FrequencyBand(250, 500),    // Low Midrange
    new FrequencyBand(1277, 2752),
    new FrequencyBand(87, 172),
    new FrequencyBand(127, 344),
    new FrequencyBand(4000, 8000),  // Presence
    new FrequencyBand(5505, 11008),
    new FrequencyBand(500, 2000),   // Midrange
  ]
  audioAnalyzer = new AudioAnalyzer(audio, audioContext, frequencyBands, true);
  let barsWidth = innerWidth / 2170.64 * 40;
  let audioBarsSize = (barsWidth * frequencyBands.length * 2);
  audioBars = new AudioBars(innerWidth - audioBarsSize - 10, innerHeight / 2, barsWidth, audioAnalyzer);

  SceneManager.instance?.activeScene?.addObject(audioAnalyzer);

  SceneManager.instance?.activeScene?.addObject(audioBars);
}
function initMusicCircle(frequencyBands: FrequencyBand[]) {
  const audioContext = new window.AudioContext();

  let audioAnalyzer = new AudioAnalyzer(audio, audioContext, frequencyBands, false);

  let musicCircle = new RythmicCircle(100, innerHeight / 2, 50, "../img/cat.png");

  SceneManager.instance?.activeScene?.addObject(audioAnalyzer);

  SceneManager.instance?.activeScene?.addObject(musicCircle);
}

//Scene manager initialization
const sceneManager = new SceneManager();
sceneManager.assignScene(
  new Scene(
    window.innerWidth - 20,
    window.innerHeight - 10,
    (sceneInfo: Scene) => start(sceneInfo) //The function that initializes the scene
  )
);
/* Options */
sceneManager.debugMode = false; //Shows stuff like hitboxes
let refreshOnResize = false;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  if (refreshOnResize) sceneManager.refreshScene();
})
document.getElementById("pause")?.addEventListener('click', () => {
  audio.pause();
})
document.getElementById("play")?.addEventListener('click', () => {
  audio.play();
})

//Initialize the scene 
function start(scene: Scene) {
}















