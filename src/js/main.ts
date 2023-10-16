import SceneManager from './objects/SceneManager.js'

//Objects imports
import Scene from './objects/Scene.js'
import AudioBars from './objects/AudioBars.js';
import AudioAnalyzer from './AudioAnalyzer.js';
import FrequencyBand from './FrequencyBand.js';
import RythmicCircle from './objects/RythmicCircle.js';
import FrequencyStack from './FrequencyStack.js';
import ParticleGenerator from './objects/ParticleGenerator.js';

//Audio 
let audio = new Audio();
audio.volume = 1;

let audioAnalyzer: AudioAnalyzer;

let isInitialized = false;

const audioBarsStack = new FrequencyStack(
  [
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
)

const generalStack = new FrequencyStack(
  [
    new FrequencyBand(0, 86),
    new FrequencyBand(87, 172),
    new FrequencyBand(173, 344),
    new FrequencyBand(345, 688),
    new FrequencyBand(689, 1376),
    new FrequencyBand(1377, 2752),
    new FrequencyBand(2753, 5504),
    new FrequencyBand(5505, 11008),
  ]
);

//Events
document.getElementsByClassName("controls-hide-button")[0].addEventListener("click", (e) => toggleControls(e));


const file: any = document.getElementById("file-upload");
file?.addEventListener("change", () => {
  audio.src = URL.createObjectURL(file.files[0]);
  audio.load();
  audio.play();

  audio.volume = 0.5;

  if (!audioAnalyzer) {
    audioAnalyzer = new AudioAnalyzer(audio, new window.AudioContext());

  }


  audioAnalyzer.addStack(generalStack);
  audioAnalyzer.addStack(audioBarsStack);

  initAudioBars(audioBarsStack);
  initMusicCircle(generalStack);
  initParticlesGenerator(generalStack);

  SceneManager.instance?.activeScene?.addObject(audioAnalyzer);
})

function initAudioBars(frequencyStack: FrequencyStack) {
  let canvas = SceneManager.instance?.activeScene?.canvas;

  let barsWidth = canvas?.width! / 2170.64 * 40;
  let audioBarsSize = (barsWidth * frequencyStack.getSize() * 2);

  let audioBars = new AudioBars(canvas?.width! - audioBarsSize - 10, canvas?.height! / 2, barsWidth, frequencyStack);

  audioBars.onResize = (obj: AudioBars) => {
    let barsWidth = canvas?.width! / 2170.64 * 40;
    let audioBarsSize = (barsWidth * frequencyStack.getSize() * 2);
    obj.x = canvas?.width! - audioBarsSize - 10;
    obj.y = canvas?.height! / 2;
    obj.barWidth = barsWidth;
  }

  SceneManager.instance?.activeScene?.addObject(audioBars);
}
function initMusicCircle(frequencyStack: FrequencyStack) {
  const image = new Image();
  image.src = "./cat.PNG";

  let canvas = SceneManager.instance?.activeScene?.canvas;

  let musicCircle = new RythmicCircle(canvas?.width! / 2170.64 * 500, canvas?.height! / 2, 50, image, frequencyStack);

  SceneManager.instance?.activeScene?.addObject(musicCircle);
}
function initParticlesGenerator(frequencyStack: FrequencyStack) {
  SceneManager.instance?.activeScene?.addObject(new ParticleGenerator(frequencyStack));
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
  scene.onResize = (s: Scene) => {
    s.canvas!.width = window.innerWidth - 10;
    s.canvas!.height = window.innerHeight - 10;
  }
}

function toggleControls(e: Event) {
  let controls = document.getElementsByClassName('controls-content')[0];
  let hideButton = document.getElementsByClassName('controls-hide-button')[0];
  if (controls.classList.contains("hidden")) {
    controls.classList.remove("hidden");
    hideButton.classList.remove("hidden");
  } else {
    controls.classList.add("hidden");
    hideButton.classList.add("hidden");
  }
}















