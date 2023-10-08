import GameObject from "./GameObject";
import SceneManager from "./SceneManager";
import SimpleGameObject from "./SimpleGameObject";

export default class RythmicCircle extends GameObject {
    private image: HTMLImageElement;
    private size: number;

    constructor(x: number, y: number, size: number, image: string) {
        super(x, y, size, "transparent");
        this.size = size;
        this.disableCollider();
        this.image = new Image();
        this.image.src = image;
    }
    draw() {
        console.log("test")
        const c = SceneManager.instance?.activeScene?.c;
        c?.beginPath();
        c?.arc(this.x, this.y, this.hitboxRadius, 0, Math.PI * 2, false);
        c?.fill();
        c?.closePath();
        c!.clip();
        c!.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    update(){
        this.draw();
    }
}

