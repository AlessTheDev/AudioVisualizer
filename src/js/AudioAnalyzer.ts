import FrequencyStack from "./FrequencyStack";
import SimpleGameObject from "./objects/SimpleGameObject";

export default class AudioAnalyzer extends SimpleGameObject {
    private audioSource: MediaElementAudioSourceNode;
    private analyzer: AnalyserNode;

    private SAMPLE_RATE;

    private data: Uint8Array = new Uint8Array();

    private valuesMultiplier: number = 10;

    private stacks: FrequencyStack[] = [];

    constructor(audio: HTMLAudioElement, audioContext: AudioContext) {
        super(0, 0, "transparent");
        this.audioSource = audioContext.createMediaElementSource(audio);
        this.analyzer = audioContext.createAnalyser();
        this.audioSource.connect(this.analyzer);
        this.analyzer.connect(audioContext.destination);

        this.analyzer.fftSize = 2048;
        this.SAMPLE_RATE = 44100;
    }

    update() {
        const bufferLength = this.analyzer.frequencyBinCount;

        this.data = new Uint8Array(bufferLength);

        this.analyzer.getByteFrequencyData(this.data);

        for (let i = 0; i < this.stacks.length; i++) {
            this.assignFrequencyBands(this.stacks[i]);
        }
    }

    addStack(stack: FrequencyStack){
        this.stacks.push(stack);
        console.log(stack);
    }

    assignFrequencyBands(stack: FrequencyStack) {
        let allFrequencySum = 0;

        //i = band
        for (let i = 0; i < stack.frequencyBandsRange.length; i++) {
            let sum = 0;

            let startSampleIndex = this.calculateSampleIndex(stack.frequencyBandsRange[i].startSample);
            let endSampleIndex = this.calculateSampleIndex(stack.frequencyBandsRange[i].endSample);

            let diff = endSampleIndex - startSampleIndex;

            for (let k = 0; k < diff; k++) {
                sum += this.data[Math.floor(startSampleIndex) + k] * this.valuesMultiplier;
            }

            if (diff != 0) {
                stack.frequencyBands[i] = sum / diff;
            }

            stack.highestFrequencyInBands[i] = Math.max(stack.highestFrequencyInBands[i], stack.frequencyBands[i]);

            allFrequencySum += sum;
        }

        stack.averageFrequency = allFrequencySum / stack.frequencyBandsRange.length;
    }

    calculateSampleIndex(sample: number) {
        let hzPerSample = this.SAMPLE_RATE / this.analyzer.fftSize;
        return Math.max(0, (sample / hzPerSample) - 1)
    }
}