export default class Time {
    static instance: null | Time = null;

    private lastUpdateTime: number = Date.now();
    private totalTime: number = 0;
    private deltaTime: number = 0;

    constructor() {
        if (Time.instance) {
            return Time.instance;
        }

        Time.instance = this;

        this.lastUpdateTime = Date.now();
        this.totalTime = 0;
        this.deltaTime = 0;
    }

    update() {
        const currentTime = Date.now();
        this.deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds
        this.totalTime += this.deltaTime;
        this.lastUpdateTime = currentTime;
    }

    getTotalTime(): number {
        return this.totalTime;
    }

    getDeltaTime(): number {
        return this.deltaTime;
    }

    reset(): void{
        this.lastUpdateTime = Date.now();
        this.totalTime = 0;
        this.deltaTime = 0;
    }
}