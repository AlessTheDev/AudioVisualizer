import utils from '../utils.js'
import SceneManager from './SceneManager.js'

// GameObjects
export default abstract class GameObject {
    static count = 0; //This variable is used to assign a unique id to every GameObject

    x: number;
    y: number;

    hitboxRadius: number;

    color: string;

    id: number;

    type: string;

    collisionsEnabled: boolean;

    spawnDate: number = Date.now();

    constructor(x: number, y: number, hitboxRadius: number, color: string) {
        this.x = x;
        this.y = y;

        this.hitboxRadius = hitboxRadius;

        this.color = color;

        this.spawnDate = Date.now();

        this.id = GameObject.count;
        GameObject.count++;

        this.collisionsEnabled = true; //The collsion is enable by default

        this.type = "generic";
    }

    draw() {
        if(SceneManager.instance?.debugMode){
            if(this.color == "transparent"){ this.color = "black" }
        }

        const c = SceneManager.instance?.activeScene?.c;
        c?.beginPath();
        c?.arc(this.x, this.y, this.hitboxRadius, 0, Math.PI * 2, false);
        c!.fillStyle = this.color;
        c?.fill();
        c?.closePath();

    }

    update() {
        this.draw();
    }

    enableCollider(){
      this.collisionsEnabled = true;
    }
    disableCollider(){
      this.collisionsEnabled = false;
    }

    getCollisions(): GameObject[] {
        const sm = SceneManager.instance;
        const objects = sm?.activeScene?.objects;
    
        if (objects == undefined || !this.collisionsEnabled) return [];
    
        let colliders: GameObject[] = [];
        for (let i = 0; i < objects.length; i++) {
          if (objects[i].collisionsEnabled && objects[i].id != this.id && utils.distance(this.x, this.y, objects[i].x, objects[i].y) - (this.hitboxRadius + objects[i].hitboxRadius) <= 0) {
            colliders.push(objects[i]);
          }
        }
        return colliders;
      }
}
