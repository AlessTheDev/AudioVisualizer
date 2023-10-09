import FrequencyBand from "./FrequencyBand";

export default class FrequencyStack{
    frequencyBands: number[];
    highestFrequencyInBands: number[];
    frequencyBandsRange: FrequencyBand[];
    averageFrequency: number = 0;

    constructor(frequencyBandsRange: FrequencyBand[]){
        this.frequencyBandsRange = frequencyBandsRange;
        this.frequencyBands = Array(frequencyBandsRange.length);
        this.highestFrequencyInBands = Array.from({ length: frequencyBandsRange.length }, () => 0);
    }

    getFrequencyBands() {
        return this.frequencyBands;
    }

    getSize() {
        return this.frequencyBands.length;
    }

    getAverageFrequency() {
        return this.averageFrequency;
    }

    getRangedFrequencyBand(bandIndex: number) {
        if (this.highestFrequencyInBands[bandIndex] == 0) {
            return 0.001;
        }
        return this.frequencyBands[bandIndex] / this.highestFrequencyInBands[bandIndex];
    }
}