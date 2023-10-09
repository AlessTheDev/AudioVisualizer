import FrequencyStack from "../FrequencyStack";
import GameObject from "./GameObject";
import SceneManager from "./SceneManager";

export default class RythmicCircle extends GameObject {
    private image: HTMLImageElement;
    private size: number;
    private frequencyStack: FrequencyStack;
    private baseSize: number;

    constructor(x: number, y: number, size: number, image: HTMLImageElement, frequencyStack: FrequencyStack) {
        super(x, y, size, "transparent");
        this.baseSize = size;
        this.size = size;
        this.disableCollider();

        this.image = image;

        this.frequencyStack = frequencyStack;
    }
    draw() {
        const c = SceneManager.instance?.activeScene?.c;
        c?.save();
        c?.beginPath();
        c?.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c!.clip();
        c!.drawImage(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        c?.restore();
    }

    update(){
        this.size = this.baseSize + this.frequencyStack.getAverageFrequency() / 1000;
        this.draw();
    }
}

