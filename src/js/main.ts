import SceneManager from './objects/SceneManager.js'

//Objects imports
import Scene from './objects/Scene.js'

//Scene manager initialization
const sceneManager = new SceneManager();
sceneManager.assignScene(
  new Scene(
    innerWidth,
    innerHeight,
    (sceneInfo: Scene) => start(sceneInfo) //The function that initializes the scene
  )
);
/* Options */
sceneManager.debugMode = false; //Shows stuff like hitboxes
let refreshOnResize = true;

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
  if(refreshOnResize) sceneManager.refreshScene();
})

//Initialize the scene 
function start(scene: Scene) {
  
}













