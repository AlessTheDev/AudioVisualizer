import FrequencyStack from "../FrequencyStack";
import utils from "../utils";
import Particle from "./Particle";
import SceneManager from "./SceneManager";
import SimpleGameObject from "./SimpleGameObject";

export default class ParticleGenerator extends SimpleGameObject {
    private frequencyStack: FrequencyStack;

    private particlesSizeMin: number = 5;
    private particlesSizeMax: number = 8;

    private particlesColorA: string = "#B9B4C7";
    private particlesColorB: string = "#5C5470";

    private spawnInterval: number = 1000;
    private lastSpawnTimestamp: number = 2;

    constructor(frequencyStack: FrequencyStack) {
        super(0, 0, "transparent");
        this.disableCollider();

        this.frequencyStack = frequencyStack;

        this.lastSpawnTimestamp = Date.now();
    }

    update(){
        const scene = SceneManager.instance?.activeScene;
        const bandValue = this.frequencyStack.getRangedFrequencyBand(0) * 100;
        //console.log(bandValue);
        if(bandValue > 5 && bandValue < 50 && Date.now() - this.lastSpawnTimestamp > this.spawnInterval){
            scene?.addObject(new Particle(
                Math.random() * scene.canvas?.width!, 
                scene.canvas?.height! + 5, 
                this.particlesSizeMin + (Math.random() * (this.particlesSizeMax - this.particlesSizeMin)),
                utils.interpolateColor("#B9B4C7", "#FAF0E6", bandValue * 2),
                Math.random() + 1
            ));
            this.lastSpawnTimestamp = Date.now();
        }
        
    }
}

