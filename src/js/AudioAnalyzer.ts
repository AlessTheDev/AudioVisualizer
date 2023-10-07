import FrequencyBand from "./FrequencyBand";
import SimpleGameObject from "./objects/SimpleGameObject";

export default class AudioAnalyzer extends SimpleGameObject{
    private audioSource: MediaElementAudioSourceNode;
    private analyzer: AnalyserNode;

    private SAMPLE_RATE; // or 2205 if fftSize = 512

    private data: Uint8Array = new Uint8Array();

    private frequencyBands: number[];
    private highestFrequencyInBands: number[];
    private frequencyBandsRange: FrequencyBand[];
    private averageFrequency: number = 0;

    valuesMultiplier: number = 10;

    
    constructor(audio: HTMLAudioElement, audioContext: AudioContext, frequencyBandsRange: FrequencyBand[], extendedFftSize: boolean){
        super(0, 0, "transparent");
        this.audioSource = audioContext.createMediaElementSource(audio);
        this.analyzer = audioContext.createAnalyser();
        this.audioSource.connect(this.analyzer);
        this.analyzer.connect(audioContext.destination);

        this.analyzer.fftSize = !extendedFftSize ? 512 : 2048;
        this.SAMPLE_RATE = !extendedFftSize ? 2205 : 44100; 

        this.frequencyBandsRange = frequencyBandsRange;
        this.frequencyBands = Array(frequencyBandsRange.length);
        this.highestFrequencyInBands = Array.from({ length: frequencyBandsRange.length }, () => 0);
    }

    update(){
        const bufferLength = this.analyzer.frequencyBinCount;

        this.data = new Uint8Array(bufferLength);

        this.analyzer.getByteFrequencyData(this.data);

        this.assignFrequencyBands();
    }

    assignFrequencyBands() {
        let allFrequencySum = 0;

        //i = band
        for(let i = 0; i < this.frequencyBandsRange.length; i++){
            let sum = 0;

            let startSampleIndex = this.calculateSampleIndex(this.frequencyBandsRange[i].startSample);
            let endSampleIndex = this.calculateSampleIndex(this.frequencyBandsRange[i].endSample);

            let diff = endSampleIndex - startSampleIndex;

            for(let k = 0; k < diff; k++){
                sum += this.data[Math.floor(startSampleIndex) + k] * this.valuesMultiplier;
            }

            if(diff != 0){
                this.frequencyBands[i] = sum / diff;
            }

            this.highestFrequencyInBands[i] = Math.max(this.highestFrequencyInBands[i], this.frequencyBands[i]);

            allFrequencySum += sum;
        }

        this.averageFrequency = allFrequencySum / this.frequencyBandsRange.length;
        
    }

    calculateSampleIndex(sample: number){
        let hzPerSample = this.SAMPLE_RATE / this.analyzer.fftSize;
        return Math.max(0, (sample / hzPerSample) - 1)
    }

    getFrequencyBands(){
        return this.frequencyBands;
    }

    getBandsNumber(){
        return this.frequencyBands.length;
    }

    getAverageFrequency(){
        return this.averageFrequency;
    }

    getRangedFrequencyBand(bandIndex: number){
        if (this.highestFrequencyInBands[bandIndex] == 0)
        {
            return 0.001;
        }
        return this.frequencyBands[bandIndex] / this.highestFrequencyInBands[bandIndex];
    }
}