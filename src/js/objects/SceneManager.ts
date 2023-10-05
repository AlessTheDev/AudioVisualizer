import Scene from "./Scene";

//Manages and load scenes (only one scene can be active)
class SceneManager {
    static instance: null | SceneManager = null;

    activeScene: Scene | null = null;

    debugMode: boolean = false;

    constructor() {
        if (SceneManager.instance) {
            return SceneManager.instance; 
        }

        SceneManager.instance = this;
        this.activeScene = null;
    }

    assignScene(scene: Scene) {
        this.activeScene = null;
        this.activeScene = scene;
        scene.init();
    }
    refreshScene() {
        this.activeScene?.drop();
        let newScene = this.activeScene?.clone();
        if (newScene) {
            this.assignScene(newScene);
        } else {
            console.log("Failed to assign scene");
        }
    }
}

export default SceneManager;