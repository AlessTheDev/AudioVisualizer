import GameObject from "./GameObject";
import SceneManager from "./SceneManager";
import Time from "./Time";

export default class Particle extends GameObject {
    private speed: number;
    private startX: number;
    constructor(x: number, y: number, size: number, color: string, speed: number){
        super(x, y, size, color);
        this.speed = speed;
        this.startX = x;
        this.disableCollider();
    }

    update(): void {
        if(this.y < 0){
            SceneManager.instance?.activeScene?.removeObject(this);
        }
        this.y -= this.speed;
        this.x = this.startX + Math.cos(Time.instance?.getTotalTime()!) * 20;
        super.draw();
    }
}
