import AudioAnalyzer from "../AudioAnalyzer";
import FrequencyStack from "../FrequencyStack";
import utils from "../utils";
import SceneManager from "./SceneManager";
import SimpleGameObject from "./SimpleGameObject";

export default class AudioBars extends SimpleGameObject {
    barsHeight: number[] = [];
    barWidth: number;

    private frequencyStack: FrequencyStack;

    onResize: Function = (obj: AudioBars) => {};

    constructor(x: number, y: number, barWidth: number, frequencyStack: FrequencyStack) {
        super(x, y, "transparent");

        this.barWidth = barWidth;

        this.frequencyStack = frequencyStack;

        addEventListener("resize", () => {this.onResize(this);});
    }

    draw() {
        const context = SceneManager.instance?.activeScene?.c;


        for (let i = 0; i <= this.frequencyStack.getSize(); i++) {
            context!.fillStyle = utils.interpolateColor("#B9B4C7", "#FAF0E6", this.frequencyStack.getRangedFrequencyBand(i) * 100);
            context?.fillRect(this.x + (this.barWidth * i) + (i * this.barWidth), this.y - this.barsHeight[i] / 2, this.barWidth, this.barsHeight[i]);
        }
    }
    update() {
        for (let i = 0; i < this.frequencyStack.getSize(); i++) {
            this.barsHeight[i] = this.barWidth + this.frequencyStack.getFrequencyBands()[i] / 5;
        }

        this.draw();
    }
}