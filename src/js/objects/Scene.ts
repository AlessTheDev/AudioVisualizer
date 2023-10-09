import utils from '../utils';
import GameObject from './GameObject';
import Time from './Time';

// A scene is what you see on the screen, it contains general canvas info
export default class Scene {
    canvas: HTMLCanvasElement | null;
    c: CanvasRenderingContext2D | null | undefined;

    objects: GameObject[];

    initFunction: Function;

    private animationFrameId: number = 0;

    private objectsToRemoveQueue: Object[] = []; 

    onResize: Function = (s: Scene) => {};
    
    constructor(width: number, height: number, initFunction: Function) {
        //Canvas Info
        this.canvas = document.querySelector('canvas');
        this.c = this.canvas?.getContext('2d');

        this.canvas!.width = width;
        this.canvas!.height = height;

        //Objects in the scene
        this.objects = [];
        new Time();

        this.initFunction = initFunction;
        addEventListener("resize", () => {this.onResize(this)});
    }

    // Animation Loop
    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        this.c!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

        //Remove objects
        for(let i = 0; i < this.objectsToRemoveQueue.length; i++){
            utils.removeFromArray(this.objects, this.objectsToRemoveQueue[i]);
        }
        this.objectsToRemoveQueue = [];
        //Objects update
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }

        Time.instance?.update();
    }

    init() {
        this.initFunction(this);

        this.animate();

        Time.instance?.reset();
    }

    clone(): Scene {
        return new Scene(this.canvas!.width, this.canvas!.height, this.initFunction)
    }

    drop() {
        cancelAnimationFrame(this.animationFrameId);
    }

    addObject(o: GameObject){
        this.objects.push(o);
    }
    removeObject(o: GameObject){
        this.objectsToRemoveQueue.push(o);
    }
}


