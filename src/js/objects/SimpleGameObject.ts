import GameObject from "./GameObject";

export default abstract class SimpleGameObject extends GameObject{
    constructor(x: number, y: number, color: string){
        super(x, y, 0, color);
        this.disableCollider();
    }
}