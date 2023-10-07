import AudioAnalyzer from "../AudioAnalyzer";
import utils from "../utils";
import SceneManager from "./SceneManager";
import SimpleGameObject from "./SimpleGameObject";

export default class AudioBars extends SimpleGameObject {
    private barsHeight: number[] = [];
    private barWidth: number;
    private audioAnalyzer: AudioAnalyzer;

    constructor(x: number, y: number, barWidth: number, audioAnalyzer: AudioAnalyzer) {
        super(x, y, "transparent");

        this.barWidth = barWidth;

        this.audioAnalyzer = audioAnalyzer;
    }

    draw() {
        const context = SceneManager.instance?.activeScene?.c;


        for (let i = 0; i <= this.audioAnalyzer.getBandsNumber(); i++) {
            context!.fillStyle = utils.interpolateColor("#f5e0df", "#ed6a66", this.audioAnalyzer.getRangedFrequencyBand(i) * 100);
            context?.fillRect(this.x + (this.barWidth * i) + (i * this.barWidth), this.y - this.barsHeight[i] / 2, this.barWidth, this.barsHeight[i]);
        }
    }
    update() {
        for (let i = 0; i < this.audioAnalyzer.getBandsNumber(); i++) {
            this.barsHeight[i] = this.barWidth + this.audioAnalyzer.getFrequencyBands()[i] / (this.audioAnalyzer.valuesMultiplier / 2);
        }

        this.draw();
    }



}